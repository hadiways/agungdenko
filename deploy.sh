#!/bin/bash

# =========================================================================
# PRODUCTION DEPLOYMENT SCRIPT - PT Agung Denko
# Server  : 147.139.193.24 (Alibaba Cloud Linux)
# Domain  : agungdenko.asia
# Dir     : /opt/dws-portal
# Web     : Caddy
# PHP     : 8.3 (Remi)
# User    : nginx
# =========================================================================

set -e

# Pastikan /usr/local/bin ada di PATH (lokasi composer & php hasil install Remi)
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

PROJECT_DIR="/opt/dws-portal"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/dws-nextjs"
PHP_USER="nginx"

echo "🚀 Memulai Production Deployment - agungdenko.asia"

# ==========================================
# BACKEND DEPLOYMENT (Laravel 12 / PHP 8.3)
# ==========================================
echo ""
echo "⚙️ Deploy Backend (Laravel 12)..."
cd $BACKEND_DIR

# Pastikan struktur folder storage lengkap
mkdir -p storage/app/public
mkdir -p storage/framework/cache/data
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/framework/testing
mkdir -p storage/logs
mkdir -p bootstrap/cache

# Copy production environment jika belum ada
if [ ! -f .env ]; then
    echo "⚠️ .env belum ada, menyalin .env.production..."
    cp .env.production .env
    php artisan key:generate --force
fi

# Install composer dependencies (tanpa dev)
echo "📦 Install composer dependencies..."
/usr/local/bin/composer install --no-dev --optimize-autoloader --no-interaction

# Pastikan MariaDB/MySQL terinstall dan berjalan
echo "⚙️ Memeriksa status MariaDB/MySQL..."
if ! command -v mysql &>/dev/null; then
    echo "📦 MariaDB belum terinstall, menginstall MariaDB..."
    yum install -y mariadb-server
    systemctl enable mariadb
    systemctl start mariadb
else
    if ! systemctl is-active --quiet mariadb && ! systemctl is-active --quiet mysqld; then
        echo "🔄 Memulai service MariaDB..."
        systemctl start mariadb || systemctl start mysqld || service mariadb start || service mysqld start
    fi
fi

# Buat database jika belum ada
echo "🗄️ Memastikan database exists..."
DB_NAME=$(grep -E "^DB_DATABASE=" .env | cut -d'=' -f2- | tr -d '"' | tr -d "'" | xargs)
DB_USER=$(grep -E "^DB_USERNAME=" .env | cut -d'=' -f2- | tr -d '"' | tr -d "'" | xargs)
DB_PASS=$(grep -E "^DB_PASSWORD=" .env | cut -d'=' -f2- | tr -d '"' | tr -d "'" | xargs)

echo "📋 Database name: $DB_NAME"
mysql -e "CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;"

# Konfigurasi hak akses database
if [ "$DB_USER" = "root" ]; then
    echo "🔑 Mengatur hak akses untuk user root..."
    # Izinkan root dengan password OR unix_socket di localhost
    mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '${DB_PASS}' OR unix_socket;" 2>/dev/null || \
    mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '${DB_PASS}';"
    
    # Izinkan root dengan password OR unix_socket di 127.0.0.1
    mysql -e "CREATE USER IF NOT EXISTS 'root'@'127.0.0.1' IDENTIFIED BY '${DB_PASS}';" 2>/dev/null || true
    mysql -e "ALTER USER 'root'@'127.0.0.1' IDENTIFIED BY '${DB_PASS}' OR unix_socket;" 2>/dev/null || \
    mysql -e "ALTER USER 'root'@'127.0.0.1' IDENTIFIED BY '${DB_PASS}';"
    
    mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;"
    mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'127.0.0.1' WITH GRANT OPTION;"
else
    echo "🔑 Mengatur hak akses untuk user ${DB_USER}..."
    mysql -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';"
    mysql -e "ALTER USER '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';"
    mysql -e "GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'localhost';"
    mysql -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'127.0.0.1' IDENTIFIED BY '${DB_PASS}';"
    mysql -e "ALTER USER '${DB_USER}'@'127.0.0.1' IDENTIFIED BY '${DB_PASS}';"
    mysql -e "GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'127.0.0.1';"
fi
mysql -e "FLUSH PRIVILEGES;"

# Generate missing framework migrations if not present
echo "📋 Memeriksa migrasi framework yang diperlukan..."

# Spatie permissions - only publish if permissions table doesn't exist in DB yet
PERM_TABLE_EXISTS=$(mysql -u"$DB_USER" -p"$DB_PASS" -h"127.0.0.1" "$DB_NAME" \
    -se "SHOW TABLES LIKE 'permissions';" 2>/dev/null | wc -l)
if [ "$PERM_TABLE_EXISTS" -eq 0 ] && ! ls database/migrations/*_create_permission_tables.php &>/dev/null; then
    echo "   -> Publishing Spatie Permission migrations..."
    php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
fi

if ! ls database/migrations/*_create_cache_table.php &>/dev/null; then
    echo "   -> Creating cache table migration..."
    php artisan cache:table
fi

if ! ls database/migrations/*_create_sessions_table.php &>/dev/null; then
    echo "   -> Creating sessions table migration..."
    php artisan session:table
fi

if ! ls database/migrations/*_create_jobs_table.php &>/dev/null; then
    echo "   -> Creating jobs table migration..."
    php artisan queue:table
fi

# Sanctum - only publish if personal_access_tokens table doesn't exist in DB yet
PAT_TABLE_EXISTS=$(mysql -u"$DB_USER" -p"$DB_PASS" -h"127.0.0.1" "$DB_NAME" \
    -se "SHOW TABLES LIKE 'personal_access_tokens';" 2>/dev/null | wc -l)
if [ "$PAT_TABLE_EXISTS" -eq 0 ] && ! ls database/migrations/*_create_personal_access_tokens_table.php &>/dev/null; then
    echo "   -> Publishing Sanctum migrations..."
    php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
fi

# Jalankan migrasi database
echo "🗄️ Menjalankan migrasi database..."
php artisan migrate --force

# Seed data konfigurasi
echo "🌱 Seeding data konfigurasi..."
php artisan db:seed --class=RoleAndPermissionSeeder --force 2>/dev/null || true
php artisan db:seed --class=SettingSeeder --force 2>/dev/null || true
php artisan db:seed --class=CategorySeeder --force 2>/dev/null || true

# Buat symlink storage
echo "🔗 Membuat symlink storage..."
php artisan storage:link --force

# Clear cache lama
echo "🧹 Clear cache lama..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Rebuild cache untuk production
echo "⚡ Rebuild cache production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Restart queue workers via Supervisor
echo "🔄 Restart queue workers..."
supervisorctl restart laravel-worker:* 2>/dev/null || true
supervisorctl restart laravel-scheduler 2>/dev/null || true

# Set permission folder (nginx user di Alibaba Cloud Linux)
echo "🔒 Mengatur permission folder..."
chown -R $PHP_USER:$PHP_USER $BACKEND_DIR/storage
chown -R $PHP_USER:$PHP_USER $BACKEND_DIR/bootstrap/cache
chmod -R 775 $BACKEND_DIR/storage
chmod -R 775 $BACKEND_DIR/bootstrap/cache

# ==========================================
# FRONTEND DEPLOYMENT (Next.js Static Export)
# ==========================================
echo ""
echo "🌐 Deploy Frontend (Next.js Static Export + Caddy)..."
cd $FRONTEND_DIR

if [ -d "out" ] && [ -f "out/index.html" ]; then
    echo "✅ Frontend sudah di-build di runner, melewati npm build."
else
    echo "📦 Install frontend dependencies..."
    npm install --legacy-peer-deps
    echo "🏗️ Building Next.js application..."
    npm run build
fi

# ==========================================
# SANITY STUDIO DEPLOYMENT
# ==========================================
echo ""
echo "🎨 Deploy Sanity Studio CMS..."
cd $PROJECT_DIR/studio
if [ -d "dist" ] && [ -f "dist/index.html" ]; then
    echo "✅ Sanity Studio sudah di-build di runner, melewati npm build."
else
    echo "📦 Install studio dependencies..."
    npm install --legacy-peer-deps
    echo "🏗️ Building Sanity Studio..."
    npm run build
fi

# Pastikan direktori log Caddy ada dan diatur hak aksesnya secara rekursif
mkdir -p /var/log/caddy /etc/caddy /var/lib/caddy
chown -R caddy:caddy /var/log/caddy /etc/caddy /var/lib/caddy 2>/dev/null || true

# Hentikan service nginx atau httpd jika aktif agar port 80 & 443 bebas
echo "🛑 Memeriksa bentrokan port web server lain..."
systemctl stop nginx 2>/dev/null || true
systemctl disable nginx 2>/dev/null || true
systemctl stop httpd 2>/dev/null || true
systemctl disable httpd 2>/dev/null || true

# Berikan capability bind port < 1024 untuk binary caddy jika dipasang manual
if command -v setcap &>/dev/null; then
    echo "🔒 Mengatur capability port untuk binary Caddy..."
    setcap 'cap_net_bind_service=+ep' /usr/local/bin/caddy 2>/dev/null || true
fi

# Copy Caddyfile dari repo ke sistem
echo "📋 Update Caddyfile..."
cp $PROJECT_DIR/Caddyfile /etc/caddy/Caddyfile
chown caddy:caddy /etc/caddy/Caddyfile 2>/dev/null || true

# Copy supervisor configs
echo "👷 Update Supervisor configs..."
cp $PROJECT_DIR/supervisor/laravel-worker.conf /etc/supervisord.d/laravel-worker.conf 2>/dev/null || \
cp $PROJECT_DIR/supervisor/laravel-worker.conf /etc/supervisor/conf.d/laravel-worker.conf 2>/dev/null || true

cp $PROJECT_DIR/supervisor/laravel-scheduler.conf /etc/supervisord.d/laravel-scheduler.conf 2>/dev/null || \
cp $PROJECT_DIR/supervisor/laravel-scheduler.conf /etc/supervisor/conf.d/laravel-scheduler.conf 2>/dev/null || true

supervisorctl reread 2>/dev/null && supervisorctl update 2>/dev/null || true

# Validasi syntax Caddyfile
echo "✅ Validasi Caddyfile..."
caddy validate --config /etc/caddy/Caddyfile

# Restart Caddy
echo "🔄 Restarting Caddy..."
systemctl restart caddy || systemctl start caddy

echo ""
echo "✅ Deployment selesai!"
echo "   🌐 https://agungdenko.asia"
echo "   🔗 https://api.agungdenko.asia"
