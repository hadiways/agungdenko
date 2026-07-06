module.exports = {
  apps: [
    {
      name: 'dws-nextjs-frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      cwd: '/var/www/dws-portal/dws-nextjs',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_API_URL: 'https://api.dws.co.id/api'
      },
      error_file: '/var/log/pm2/dws-frontend-error.log',
      out_file: '/var/log/pm2/dws-frontend-out.log',
      combine_logs: true,
      time: true
    }
  ]
};
