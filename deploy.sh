#!/bin/bash

# =========================================================================
# PRODUCTION DEPLOYMENT SCRIPT - PT Agung Denko
# Server: 147.139.193.24
# Directory: /opt/dws-portal
# Web Server: Caddy
# =========================================================================

set -e

# Config variables
PROJECT_DIR="/opt/dws-portal"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/dws-nextjs"

echo "🚀 Memulai Production Deployment..."

# ==========================================
# BACKEND DEPLOYMENT (Laravel)
# ==========================================
echo "⚙️ Deploy Backend (Laravel)..."
cd $BACKEND_DIR

# Install composer dependencies
echo "📦 Install composer dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

# Copy production environment jika belum ada
if [ ! -f .env ]; then
    echo "⚠️ File .env belum ada, menyalin .env.production..."
    cp .env.production .env
    php artisan key:generate --force
fi

# Jalankan migrasi database
echo "🗄️ Menjalankan migrasi database..."
php artisan migrate --force

# Seed data penting
echo "🌱 Seeding data konfigurasi..."
php artisan db:seed --class=RoleAndPermissionSeeder --force
php artisan db:seed --class=SettingSeeder --force
php artisan db:seed --class=CategorySeeder --force

# Buat symlink storage
echo "🔗 Membuat symlink storage..."
php artisan storage:link --force

# Clear dan rebuild cache
echo "⚡ Optimasi Laravel cache..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Restart queue workers via Supervisor
echo "🔄 Restart queue workers..."
sudo supervisorctl restart laravel-worker:*
sudo supervisorctl restart laravel-scheduler

# Set permission folder
echo "🔒 Mengatur permission folder..."
chown -R www-data:www-data $BACKEND_DIR/storage $BACKEND_DIR/bootstrap/cache
chmod -R 775 $BACKEND_DIR/storage $BACKEND_DIR/bootstrap/cache

# ==========================================
# FRONTEND DEPLOYMENT (Static HTML)
# ==========================================
echo "🌐 Deploy Frontend (Static HTML)..."

# Pastikan direktori log Caddy ada
mkdir -p /var/log/caddy

# Copy Caddyfile ke lokasi sistem
echo "📋 Update Caddyfile..."
cp $PROJECT_DIR/Caddyfile /etc/caddy/Caddyfile

# Validasi syntax Caddyfile
echo "✅ Validasi Caddyfile..."
caddy validate --config /etc/caddy/Caddyfile

# Reload Caddy (tanpa downtime)
echo "🔄 Reload Caddy..."
systemctl reload caddy

echo "✅ Deployment selesai!"
