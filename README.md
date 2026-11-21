# Papan Kedatangan Kereta Api Surabaya Raya - PWA

Aplikasi web yang bisa diinstal (PWA) dengan mode fullscreen.

## File
- index.html - halaman utama (sudah PWA)
- manifest.webmanifest - manifest PWA, display: fullscreen
- sw.js - service worker
- icon-192.png / icon-512.png - ikon
- .nojekyll - wajib ada agar GitHub Pages tidak memproses Jekyll

## Cara Hosting di GitHub Pages
1. Upload semua file ke root repo (branch main)
2. Settings > Pages > Source: Deploy from a branch > Branch: main / root
3. Buka https://USERNAME.github.io/NAMA-REPO/
4. Install via Chrome: Menu > Install aplikasi / Tambahkan ke Layar Utama

## Update
Setiap update index.html, naikkan versi CACHE di sw.js (misal kereta-sby-v3) agar HP user tidak pakai cache lama.
