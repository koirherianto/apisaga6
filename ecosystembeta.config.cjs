module.exports = {
    apps: [
      {
        name: 'beta-web-app',
        script: './bin/server.ts',
        instances: 'max',
        exec_mode: 'cluster',
        autorestart: true,
        interpreter: 'node',
      },
    ],
  }
  