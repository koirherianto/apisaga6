module.exports = {
    apps: [
      {
        name: 'web-app',
        script: './bin/server.ts',
        instances: 'max',
        exec_mode: 'cluster',
        autorestart: true,
        interpreter: 'node',
      },
    ],
  }
  