#!/bin/bash

# =========================================================================
# PRODUCTION DEPLOYMENT SCRIPT FOR PT DENKO WAHANA SAKTI
# =========================================================================

# Exit immediately if a command exits with a non-zero status
set -e

# Config variables
PROJECT_DIR="/var/www/dws-portal"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/dws-nextjs"

echo "🚀 Starting Production Deployment..."

# 1. Navigate to Project root and Git pull latest changes
cd $PROJECT_DIR
echo "📥 Fetching latest changes from Git..."
git pull origin main

# ==========================================
# BACKEND DEPLOYMENT (Laravel 12)
# ==========================================
echo "⚙️ Deploying Backend (Laravel 12)..."
cd $BACKEND_DIR

# Install composer dependencies (excluding dev packages)
echo "📦 Installing composer dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

# Copy production environment if not already there
if [ ! -f .env ]; then
    echo "⚠️ .env file not found, copying .env.production..."
    cp .env.production .env
    php artisan key:generate --force
fi

# Run Database migrations
echo "🗄️ Running migrations..."
php artisan migrate --force

# Seed essential lookups/configurations (non-destructive seeders)
echo "🌱 Seeding lookups..."
php artisan db:seed --class=RoleAndPermissionSeeder --force
php artisan db:seed --class=SettingSeeder --force
php artisan db:seed --class=CategorySeeder --force

# Create symbolic storage link
echo "🔗 Linking storage..."
php artisan storage:link --force

# Clear and rebuild cache (Config, Routes, Views)
echo "⚡ Optimizing Laravel cache..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Restart Supervisor Laravel workers & scheduler
echo "🔄 Restarting Supervisor Laravel workers & scheduler..."
sudo supervisorctl restart laravel-worker:*
sudo supervisorctl restart laravel-scheduler

# ==========================================
# FRONTEND DEPLOYMENT (Next.js 15)
# ==========================================
echo "🌐 Deploying Frontend (Next.js 15)..."
cd $FRONTEND_DIR

# Install npm packages
echo "📦 Installing npm dependencies..."
npm ci --only=production

# Build Next.js
echo "🏗️ Building Next.js production bundle..."
npm run build

# Reload PM2 application to apply changes with zero-downtime
echo "🔄 Reloading PM2 frontend app..."
pm2 reload $PROJECT_DIR/pm2.config.js --env production

# Ensure PM2 saves current processes
pm2 save

echo "✅ Deployment completed successfully!"
