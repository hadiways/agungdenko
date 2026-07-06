module.exports = {
  apps: [
    {
      name: 'dws-nextjs-frontend',
      script: 'python3',
      args: '-m http.server 3001 -d /opt/dws-portal/dws-nextjs',
      cwd: '/opt/dws-portal',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/var/log/pm2/dws-frontend-error.log',
      out_file: '/var/log/pm2/dws-frontend-out.log',
      combine_logs: true,
      time: true
    }
  ]
};

