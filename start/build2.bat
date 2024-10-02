@echo off
:: Build aplikasi menggunakan AdonisJS
node ace build

:: Copy file .env ke dalam folder build
copy .env build\

:: Ganti NODE_ENV dari development ke production di file .env menggunakan PowerShell
powershell -Command "(Get-Content build\.env) -replace 'NODE_ENV=development', 'NODE_ENV=production' | Set-Content build\.env"

:: Masuk ke folder build dan install dependencies tanpa devDependencies
cd build
npm ci --omit=dev

:: Jalan npm run start
npm run start

