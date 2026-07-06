# Alibaba Cloud Ubuntu 24 Server Setup Guide

This guide details setting up a production-ready environment for the Laravel Backend on an Alibaba Cloud ECS instance running Ubuntu 24.04 LTS.

---

## 1. System Update & Base Packages

Update the OS and install basic administration packages:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git unzip build-essential software-properties-common ufw
```

---

## 2. Firewall Configuration (UFW)

Enable firewall rules to secure the instance:
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw --force enable
```

---

## 3. Install PHP 8.3 & Extensions

Install Ondrej Sury's PHP repository (provides stable PHP builds) and install PHP:
```bash
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install -y php8.3-fpm php8.3-mysql php8.3-mbstring php8.3-xml php8.3-bcmath php8.3-gd php8.3-zip php8.3-curl php8.3-redis php8.3-opcache
```

---

## 4. Install MariaDB (Database)

Install and secure the MariaDB Server:
```bash
sudo apt install -y mariadb-server
sudo mysql_secure_installation
```

Log in and create the database and production user:
```sql
CREATE DATABASE dws_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'dws_prod_user'@'localhost' IDENTIFIED BY 'YOUR_SECURE_PASSWORD';
GRANT ALL PRIVILEGES ON dws_production.* TO 'dws_prod_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 5. Install Redis Cache & Queue

Install and configure Redis:
```bash
sudo apt install -y redis-server
```

Edit the config file (`/etc/redis/redis.conf`) to secure Redis:
```ini
requirepass YOUR_SECURE_REDIS_PASSWORD
```
Restart Redis:
```bash
sudo systemctl restart redis-server
```

---

## 6. Install & Configure Nginx

Install Nginx:
```bash
sudo apt install -y nginx
```

Copy the repository's `nginx.conf` file to `/etc/nginx/sites-available/api.dws.co.id`:
```bash
sudo cp /var/www/html/backend/nginx.conf /etc/nginx/sites-available/api.dws.co.id
```
*(Make sure to update `fastcgi_pass app:9000;` inside the file to `fastcgi_pass unix:/run/php/php8.3-fpm.sock;` for a native process setup).*

Enable the site configuration:
```bash
sudo ln -s /etc/nginx/sites-available/api.dws.co.id /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

---

## 7. Install Let's Encrypt SSL

Install Certbot and obtain an SSL Certificate:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.dws.co.id
```

---

## 8. Configure Supervisor Queue Worker

Install Supervisor:
```bash
sudo apt install -y supervisor
```

Copy the supervisor configuration to the configuration folder:
```bash
sudo cp /var/www/html/backend/supervisor.conf /etc/supervisor/conf.d/laravel-worker.conf
```
Update the directories in the configuration to match your path (`/var/www/html/backend`), then start it:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start all
```

---

## 9. Enable Cron Scheduler

Configure the Laravel task scheduler. Run:
```bash
crontab -e
```
Add the following line to the crontab:
```text
* * * * * cd /var/www/html/backend && php artisan schedule:run >> /dev/null 2>&1
```
