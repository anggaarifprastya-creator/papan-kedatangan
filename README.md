# Papan Kedatangan Kereta Api Surabaya Raya — PWA (GitHub Pages) — VERSI FLAT (tanpa folder icons)

Semua file di ROOT repo, tidak ada folder. Ini biar upload-nya tidak ribet.

## Isi file (upload semua ke root repo)
- `index.html` — file utama yang sudah diperbaiki
- `manifest.webmanifest` — `"display": "fullscreen"`, ikon di root
- `sw.js` — Service Worker, hanya cache app shell
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` — ikon di ROOT, bukan di folder
- `.nojekyll`, `README.md`

## Yang sudah diperbaiki (sama seperti versi sebelumnya)
### 1) Bisa diinstal sebagai aplikasi web layar penuh
- Manifest + SW + meta PWA sudah disesuaikan ke path flat (`./icon-192.png`, dst).

### 2) Layout PWA = layout fullscreen browser
- `<style id="sby-pwa-parity">` + class `sby-pwa-fullscreen` menyamakan display-mode fullscreen/standalone dengan `:fullscreen`.
- `viewport-fit=cover`, `--safe-area-inset-top: 0` di PWA.

### 3) Tema TIDAK lagi dipaksa gelap — default TERANG, gelap hanya lewat toggle
- Blok lama pemaksa gelap dari mode malam perangkat SUDAH DIHAPUS.
- Default selalu terang, gelap hanya kalau pencet toggle. Pilihan toggle tersimpan di localStorage.
- `theme-color` default `#F8FAFC` (terang), hanya berubah ke `#020617` kalau toggle gelap.

## Cara publish ke GitHub Pages
1. Buat repo baru di GitHub.
2. Upload SEMUA file di sini ke root repo (tidak ada folder).
   Di halaman repo: Add file > Upload files, pilih semua file sekaligus, Commit.
3. Settings → Pages → Source: Deploy from a branch → Branch: main → Folder: / (root) → Save.
4. Tunggu 1-2 menit, buka `https://USERNAME.github.io/nama-repo/`.
5. Android Chrome: menu ⋮ → Add to Home screen / Install app. iPhone Safari: Share → Add to Home Screen.

## Cara tes
- Mode malam HP aktif → tema HARUS tetap terang. Pencet toggle → baru gelap. Reload → pilihan toggle tetap.
- Bandingkan posisi atas papan di fullscreen browser vs aplikasi terinstal → harus SAMA, tidak turun.
- DevTools → Application → Manifest: ikon terbaca, Service Worker `sw.js` aktif.
