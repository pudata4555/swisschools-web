// PM2 process config for the SwisSchools frontend (Next.js).
// Served on 127.0.0.1:3000 and reverse-proxied by Apache for staging.swisschools.com.
module.exports = {
  apps: [
    {
      name: "swisschools-web",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        NEXT_PUBLIC_API_BASE: "https://api.swisschools.com",
      },
    },
  ],
};
