# Undangan Pernikahan Scrolling

Website undangan satu halaman dengan warna navy blue dan ivory, ornamen daun biru, responsif untuk ponsel, animasi scroll, hitung mundur, galeri, hadiah digital, dan RSVP melalui WhatsApp.

## Menjalankan di VS Code
1. Ekstrak folder ZIP.
2. Buka folder `Undangan-Pernikahan-Scrolling` di VS Code.
3. Buka `index.html` di browser (disarankan memakai ekstensi Live Server).

## Mengganti data
Edit objek `CONFIG` di bagian paling atas `script.js`:
- `groom`: nama mempelai pria
- `bride`: nama mempelai wanita
- `date`: tanggal format `YYYY-MM-DD`, contoh `2027-06-20`
- `akad` dan `reception`: waktu acara
- `location`: alamat acara
- `mapsUrl`: tautan Google Maps
- `whatsapp`: nomor WhatsApp format kode negara tanpa `+`, contoh `6281234567890`
- `accountNumber`: nomor rekening yang akan ditampilkan

Nama tamu bisa dipersonalisasi dengan menambahkan query di link, misalnya `?to=Bapak%20Budi`.

## Foto, musik, dan rekening
- Ganti kotak placeholder foto di `index.html` dengan elemen `<img>` dan letakkan file foto di folder `assets`.
- Untuk musik, simpan file musik yang Anda punya izin gunakan dengan nama `musik.mp3` di `assets/`.
- Edit informasi bank di `index.html` serta `CONFIG.accountNumber` di `script.js`.
- RSVP membuka WhatsApp dengan pesan terisi otomatis; tidak menyimpan data ke database.

## Hosting GitHub Pages
1. Buat repository GitHub baru dan unggah seluruh isi folder ini.
2. Buka Settings → Pages.
3. Pada Build and deployment pilih Deploy from a branch, pilih `main` dan folder `/ (root)`, lalu Save.
4. Tunggu sampai link Pages muncul.
