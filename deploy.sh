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

# Copy production environment jika belum ada
if [ ! -f .env ]; then
    echo "⚠️ .env belum ada, menyalin .env.production..."
    cp .env.production .env
    php artisan key:generate --force
fi

# Install composer dependencies (tanpa dev)
echo "📦 Install composer dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

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
# FRONTEND DEPLOYMENT (Static HTML)
# ==========================================
echo ""
echo "🌐 Deploy Frontend (Static HTML + Caddy)..."

# Pastikan direktori log Caddy ada
mkdir -p /var/log/caddy /etc/caddy
chown caddy:caddy /var/log/caddy 2>/dev/null || true

# Copy Caddyfile dari repo ke sistem
echo "📋 Update Caddyfile..."
cp $PROJECT_DIR/Caddyfile /etc/caddy/Caddyfile

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

# Reload Caddy tanpa downtime
echo "🔄 Reload Caddy..."
systemctl reload caddy || systemctl restart caddy

echo ""
echo "✅ Deployment selesai!"
echo "   🌐 https://agungdenko.asia"
echo "   🔗 https://api.agungdenko.asia"
