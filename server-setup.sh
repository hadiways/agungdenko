#!/bin/bash

# ============================================================
# SERVER SETUP SCRIPT - PT Agung Denko
# Server  : 147.139.193.24 (Alibaba Cloud Linux / CentOS)
# Domain  : agungdenko.asia
# Dir     : /opt/dws-portal
# Stack   : Caddy + PHP 8.3 + Laravel + Supervisor
# ============================================================

set -e

echo ""
echo "========================================"
echo "  SETUP SERVER AGUNGDENKO.ASIA"
echo "========================================"
echo ""

# Deteksi package manager
if command -v dnf &>/dev/null; then
    PKG="dnf"
elif command -v yum &>/dev/null; then
    PKG="yum"
else
    echo "❌ Package manager tidak dikenali (bukan apt/yum/dnf)"
    exit 1
fi
echo "📦 Package manager: $PKG"

# ==========================================
# 1. UPDATE SISTEM
# ==========================================
echo ""
echo "📦 [1/6] Update sistem..."
$PKG update -y

# ==========================================
# 2. INSTALL DEPENDENSI DASAR
# ==========================================
echo ""
echo "🔧 [2/6] Install tools dasar..."
$PKG install -y \
    git curl wget unzip tar \
    supervisor \
    epel-release 2>/dev/null || true

$PKG install -y epel-release || true

# ==========================================
# 3. INSTALL PHP 8.3 via Remi Repo
# ==========================================
echo ""
echo "🐘 [3/6] Install PHP 8.3..."

# Install Remi repo
$PKG install -y https://rpms.remirepo.net/enterprise/remi-release-8.rpm 2>/dev/null || \
$PKG install -y https://rpms.remirepo.net/enterprise/remi-release-9.rpm 2>/dev/null || true

# Enable PHP 8.3 module
if command -v dnf &>/dev/null; then
    dnf module reset php -y || true
    dnf module enable php:remi-8.3 -y || true
fi

$PKG install -y \
    php php-fpm php-cli php-common \
    php-mysqlnd php-mbstring php-xml php-curl \
    php-zip php-bcmath php-gd php-intl \
    php-opcache php-process

# Aktifkan PHP-FPM
systemctl enable php-fpm
systemctl start php-fpm
echo "✅ PHP $(php -v | head -1 | cut -d' ' -f2) siap"

# ==========================================
# 4. INSTALL COMPOSER
# ==========================================
echo ""
echo "🎼 [4/6] Install Composer..."
curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
echo "✅ $(composer --version)"

# ==========================================
# 5. INSTALL CADDY
# ==========================================
echo ""
echo "🌐 [5/6] Install Caddy..."

# Caddy via COPR untuk RHEL/CentOS/AlmaLinux
$PKG install -y 'dnf-command(copr)' 2>/dev/null || true
$PKG copr enable @caddy/caddy -y 2>/dev/null || true
$PKG install -y caddy 2>/dev/null || true

# Fallback: install manual via binary jika COPR gagal
if ! command -v caddy &>/dev/null; then
    echo "⚠️ COPR gagal, install Caddy via binary..."
    CADDY_VER="2.9.1"
    curl -fsSL "https://github.com/appleboy/caddy/releases/download/v${CADDY_VER}/caddy_${CADDY_VER}_linux_amd64.tar.gz" -o /tmp/caddy.tar.gz || \
    curl -fsSL "https://github.com/caddyserver/caddy/releases/download/v${CADDY_VER}/caddy_${CADDY_VER}_linux_amd64.tar.gz" -o /tmp/caddy.tar.gz
    tar -xzf /tmp/caddy.tar.gz -C /usr/local/bin caddy
    chmod +x /usr/local/bin/caddy

    # Buat user & service caddy
    groupadd --system caddy 2>/dev/null || true
    useradd --system --gid caddy --create-home --home-dir /var/lib/caddy \
        --shell /usr/sbin/nologin --comment "Caddy web server" caddy 2>/dev/null || true

    mkdir -p /etc/caddy /var/log/caddy
    chown caddy:caddy /var/log/caddy

    cat > /etc/systemd/system/caddy.service << 'EOF'
[Unit]
Description=Caddy
Documentation=https://caddyserver.com/docs/
After=network.target network-online.target
Requires=network-online.target

[Service]
Type=notify
User=caddy
Group=caddy
ExecStart=/usr/local/bin/caddy run --environ --config /etc/caddy/Caddyfile
ExecReload=/usr/local/bin/caddy reload --config /etc/caddy/Caddyfile --force
TimeoutStopSec=5s
LimitNOFILE=1048576
PrivateTmp=true
ProtectSystem=full
AmbientCapabilities=CAP_NET_BIND_SERVICE

[Install]
WantedBy=multi-user.target
EOF
    systemctl daemon-reload
fi

systemctl enable caddy
echo "✅ Caddy $(caddy version) siap"

# ==========================================
# 6. CLONE REPO & KONFIGURASI
# ==========================================
echo ""
echo "📥 [6/6] Clone repository..."
mkdir -p /opt

if [ ! -d "/opt/dws-portal/.git" ]; then
    git clone https://github.com/hadiways/agungdenko.git /opt/dws-portal
    echo "✅ Repository berhasil di-clone"
else
    echo "⚠️  Repo sudah ada, melakukan git pull..."
    cd /opt/dws-portal && git pull origin main
fi

# Konfigurasi Caddy
echo ""
echo "⚙️  Konfigurasi Caddy..."
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

cp /opt/dws-portal/Caddyfile /etc/caddy/Caddyfile
chown caddy:caddy /etc/caddy/Caddyfile 2>/dev/null || true

# Validasi Caddyfile
caddy validate --config /etc/caddy/Caddyfile

# Mulai Caddy
echo "🔄 Memulai Caddy..."
systemctl restart caddy || systemctl start caddy

# Konfigurasi Supervisor
echo "👷 Konfigurasi Supervisor..."
systemctl enable supervisord 2>/dev/null || systemctl enable supervisor 2>/dev/null || true
systemctl start supervisord 2>/dev/null || systemctl start supervisor 2>/dev/null || true

# Setup Laravel Backend
echo ""
echo "🚀 Setup Backend Laravel..."
cd /opt/dws-portal/backend

# Pastikan struktur folder storage lengkap
mkdir -p storage/app/public
mkdir -p storage/framework/cache/data
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/framework/testing
mkdir -p storage/logs
mkdir -p bootstrap/cache

if [ ! -f .env ]; then
    cp .env.production .env
    php artisan key:generate --force
fi

composer install --no-dev --optimize-autoloader --no-interaction

# Pastikan MariaDB/MySQL terinstall dan berjalan
echo "⚙️ Memeriksa status MariaDB/MySQL..."
if ! command -v mysql &>/dev/null; then
    echo "📦 MariaDB belum terinstall, menginstall MariaDB..."
    $PKG install -y mariadb-server
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
if ! ls database/migrations/*_create_permission_tables.php &>/dev/null; then
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

php artisan migrate --force
php artisan storage:link --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Permission
PHP_FPM_USER=$(ps aux | grep php-fpm | grep -v root | grep -v grep | awk '{print $1}' | head -1)
PHP_FPM_USER="${PHP_FPM_USER:-nginx}"
chown -R ${PHP_FPM_USER}:${PHP_FPM_USER} /opt/dws-portal/backend/storage
chown -R ${PHP_FPM_USER}:${PHP_FPM_USER} /opt/dws-portal/backend/bootstrap/cache
chmod -R 775 /opt/dws-portal/backend/storage
chmod -R 775 /opt/dws-portal/backend/bootstrap/cache

# Firewall - buka port 80 & 443
echo "🔥 Buka port 80 & 443..."
firewall-cmd --permanent --add-service=http 2>/dev/null || true
firewall-cmd --permanent --add-service=https 2>/dev/null || true
firewall-cmd --reload 2>/dev/null || true

# ==========================================
# SELESAI
# ==========================================
echo ""
echo "========================================"
echo "  ✅ SETUP SELESAI!"
echo "========================================"
echo ""
echo "  🌐 Frontend : https://agungdenko.asia"
echo "  🔗 API      : https://api.agungdenko.asia"
echo "  📁 Direktori: /opt/dws-portal"
echo "  ⚙️  Caddy   : $(caddy version)"
echo "  🐘 PHP      : $(php -v | head -1)"
echo ""
echo "  Cek status Caddy : systemctl status caddy"
echo "  Cek log Caddy    : journalctl -u caddy -f"
echo "========================================"
