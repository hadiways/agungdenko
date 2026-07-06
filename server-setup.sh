#!/bin/bash

# ============================================================
# SERVER SETUP SCRIPT - PT Agung Denko
# Server  : 147.139.193.24 (Alibaba Cloud)
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

# ==========================================
# 1. UPDATE SISTEM
# ==========================================
echo "📦 [1/7] Update sistem..."
apt update -y && apt upgrade -y

# ==========================================
# 2. INSTALL DEPENDENSI DASAR
# ==========================================
echo "🔧 [2/7] Install tools dasar..."
apt install -y \
    git curl wget unzip software-properties-common \
    debian-keyring debian-archive-keyring apt-transport-https \
    supervisor acl

# ==========================================
# 3. INSTALL PHP 8.3
# ==========================================
echo "🐘 [3/7] Install PHP 8.3..."
add-apt-repository ppa:ondrej/php -y
apt update -y
apt install -y \
    php8.3 php8.3-fpm php8.3-cli php8.3-common \
    php8.3-mysql php8.3-mbstring php8.3-xml php8.3-curl \
    php8.3-zip php8.3-bcmath php8.3-gd php8.3-intl \
    php8.3-tokenizer php8.3-pdo php8.3-redis

# Aktifkan PHP-FPM
systemctl enable php8.3-fpm
systemctl start php8.3-fpm
echo "✅ PHP 8.3 siap"

# ==========================================
# 4. INSTALL COMPOSER
# ==========================================
echo "🎼 [4/7] Install Composer..."
curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
echo "✅ Composer siap: $(composer --version)"

# ==========================================
# 5. INSTALL CADDY
# ==========================================
echo "🌐 [5/7] Install Caddy..."
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
    | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg

curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
    | tee /etc/apt/sources.list.d/caddy-stable.list

apt update -y && apt install -y caddy

# Aktifkan Caddy
systemctl enable caddy
echo "✅ Caddy siap: $(caddy version)"

# ==========================================
# 6. CLONE REPO KE /opt/dws-portal
# ==========================================
echo "📥 [6/7] Clone repository..."
mkdir -p /opt

if [ ! -d "/opt/dws-portal/.git" ]; then
    git clone https://github.com/hadiways/agungdenko.git /opt/dws-portal
    echo "✅ Repository berhasil di-clone"
else
    echo "⚠️  Repo sudah ada, melakukan git pull..."
    cd /opt/dws-portal && git pull origin main
fi

# ==========================================
# 7. KONFIGURASI CADDY
# ==========================================
echo "⚙️  [7/7] Konfigurasi Caddy..."

# Buat direktori log Caddy
mkdir -p /var/log/caddy
chown caddy:caddy /var/log/caddy

# Copy Caddyfile dari repo
cp /opt/dws-portal/Caddyfile /etc/caddy/Caddyfile

# Validasi dan reload
caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy
echo "✅ Caddy sudah dikonfigurasi"

# ==========================================
# 8. KONFIGURASI SUPERVISOR
# ==========================================
echo "👷 Konfigurasi Supervisor..."
cp /opt/dws-portal/supervisor/laravel-worker.conf /etc/supervisor/conf.d/laravel-worker.conf 2>/dev/null || true
cp /opt/dws-portal/supervisor/laravel-scheduler.conf /etc/supervisor/conf.d/laravel-scheduler.conf 2>/dev/null || true
supervisorctl reread && supervisorctl update

# ==========================================
# 9. SETUP BACKEND LARAVEL
# ==========================================
echo "🚀 Setup Backend Laravel..."
cd /opt/dws-portal/backend

if [ ! -f .env ]; then
    cp .env.production .env
    php artisan key:generate --force
fi

composer install --no-dev --optimize-autoloader --no-interaction
php artisan migrate --force
php artisan storage:link --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

chown -R www-data:www-data /opt/dws-portal/backend/storage
chown -R www-data:www-data /opt/dws-portal/backend/bootstrap/cache
chmod -R 775 /opt/dws-portal/backend/storage
chmod -R 775 /opt/dws-portal/backend/bootstrap/cache

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
echo "  ⚙️  Web     : Caddy $(caddy version)"
echo "  🐘 PHP      : $(php -v | head -1)"
echo ""
echo "  Cek status Caddy : systemctl status caddy"
echo "  Cek log Caddy    : journalctl -u caddy -f"
echo "========================================"
