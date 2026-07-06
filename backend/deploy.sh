#!/bin/bash
set -e

echo "🚀 Starting Deployment process..."

# 1. Pull the latest code from git
# git pull origin main

# 2. Install/Update composer dependencies
composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# 3. Run database migrations
echo "⚙️ Running database migrations..."
php artisan migrate --force

# 4. Clear old caches
echo "🧹 Clearing old caches..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# 5. Cache configuration, routes, and views
echo "⚡ Generating optimization caches..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 6. Restart queue workers (Supervisor will auto-restart them)
echo "🔄 Restarting queue workers..."
php artisan queue:restart

# 7. Optimize file permissions
echo "🔒 Setting folder permissions..."
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "✨ Deployment complete!"
