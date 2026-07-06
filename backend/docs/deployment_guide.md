# Production Deployment & Maintenance Guide

This document describes how to deploy updates, perform backups, execute rollbacks, and configure a CI/CD pipeline for the Laravel Backend.

---

## 1. Deploying Updates

To deploy new code changes manually:

1. Clone or pull code inside `/var/www/html/backend`.
2. Run the deployment script:
   ```bash
   sudo ./deploy.sh
   ```

The script automatically:
* Installs dependencies without development tooling.
* Runs database migrations.
* Caches configurations, routes, and views.
* Restarts Supervisor queue workers.

---

## 2. Backup Strategy

Automate daily backups of the database and uploaded media assets to prevent data loss.

### MariaDB Backup Script (`/var/www/backups/backup.sh`)
```bash
#!/bin/bash
BACKUP_DIR="/var/www/backups"
DATE=$(date +%Y-%m-%d_%H%M%S)
DB_NAME="dws_production"
DB_USER="dws_prod_user"
DB_PASS="YOUR_SECURE_PASSWORD"

# Create dump
mysqldump -u$DB_USER -p$DB_PASS $DB_NAME > $BACKUP_DIR/db_$DATE.sql

# Compress dump
gzip $BACKUP_DIR/db_$DATE.sql

# Delete backups older than 14 days
find $BACKUP_DIR -type f -name "*.sql.gz" -mtime +14 -delete
```

### Automation (Cron)
Add a cron job to run the backup daily at 2:00 AM:
```text
0 2 * * * /bin/bash /var/www/backups/backup.sh
```

---

## 3. Rollback Strategy

If a deployment introduces critical bugs, roll back immediately:

1. Revert to the last stable git commit:
   ```bash
   git checkout <commit-hash>
   ```
2. Re-run the deploy script to rebuild caches and restart queue workers:
   ```bash
   sudo ./deploy.sh
   ```
3. If database migrations need reverting:
   ```bash
   php artisan migrate:rollback --step=1
   ```

---

## 4. CI/CD Pipeline (GitHub Actions)

Create a workflow file `.github/workflows/deploy.yml` to automate deployments on git push:

```yaml
name: Deploy Backend

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Code
      uses: actions/checkout@v4

    - name: Deploy via SSH
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.SERVER_HOST }}
        username: root
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /var/www/html/backend
          git pull origin main
          sudo ./deploy.sh
```
Make sure to add `SERVER_HOST` and `SSH_PRIVATE_KEY` secrets inside your GitHub repository settings.
