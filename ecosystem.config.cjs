module.exports = {
    apps: [
      {
        name: 'web-app',
        script: './bin/server.js',
        instances: 'max',
        exec_mode: 'cluster',
        autorestart: true,
        interpreter: 'node',
      },
    ],
  }
  