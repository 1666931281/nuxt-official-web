export default {
  apps: [
    {
      name: 'esports-official-web',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      instances: 'max',
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
