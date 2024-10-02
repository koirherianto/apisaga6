# catatan untuk mengizinkan file ini dijalankan, jalankan perintah berikut:
# chmod +x start/build.sh

#!/bin/bash

# Build aplikasi menggunakan AdonisJS
node ace build

# Copy file .env ke dalam folder build
cp .env build/

# Ganti NODE_ENV dari development ke production di file .env
sed -i 's/NODE_ENV=development/NODE_ENV=production/g' build/.env

# Copy file ecosystem.config.cjs ke folder build
cp ecosystem.config.cjs build/

# Pindah ke folder build dan install dependencies tanpa devDependencies
cd build && npm ci --omit=dev

# Restart aplikasi menggunakan PM2 dengan konfigurasi dari ecosystem.config.cjs
pm2 restart ecosystem.config.cjs
