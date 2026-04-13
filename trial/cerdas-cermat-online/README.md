# 🏆 Cerdas Cermat Online
## Sistem Pertandingan Jarak Jauh dengan Bel Real-Time

Aplikasi cerdas cermat yang bisa diakses dari jarak jauh.
Peserta menekan bel dari HP masing-masing, giliran otomatis terkunci!

---

## 📋 Fitur

- **Bel Real-Time** — Peserta tekan bel dari HP, server tentukan siapa yang duluan
- **Giliran Terkunci** — Setelah bel ditekan, giliran terkunci sampai juri menilai
- **3 Babak** — Wajib, Lemparan, Adu Cepat (sesuai format asli)
- **3 Tampilan** — Panel Juri, Layar Peserta, Tampilan Proyektor
- **Upload Excel** — Format soal sama seperti versi offline
- **Skor Real-Time** — Semua peserta bisa lihat skor live

---

## 🚀 Cara Install & Jalankan

### Prasyarat
- **Node.js** versi 16 atau lebih baru
  - Download di: https://nodejs.org
  - Pilih versi LTS (Long Term Support)

### Langkah 1: Install Dependencies
Buka Terminal / Command Prompt, masuk ke folder project:

```bash
cd cerdas-cermat-online
npm install
```

### Langkah 2: Jalankan Server

```bash
npm start
```

Akan muncul tampilan seperti ini:
```
╔══════════════════════════════════════════════════╗
║     🏆  CERDAS CERMAT ONLINE  🏆               ║
║     Sistem Pertandingan Jarak Jauh              ║
╠══════════════════════════════════════════════════╣
║  Alamat akses:                                  ║
║  Lokal   : http://localhost:3000                ║
║  Jaringan: http://192.168.1.10:3000             ║
╠══════════════════════════════════════════════════╣
║  🎓 Juri     : http://localhost:3000/juri       ║
║  📱 Peserta  : http://[IP]:3000/peserta         ║
║  📺 Tampilan : http://[IP]:3000/tampilan        ║
╚══════════════════════════════════════════════════╝
```

### Langkah 3: Buka Halaman

| Halaman    | URL                               | Untuk Siapa          |
|------------|-----------------------------------|----------------------|
| **Juri**   | `http://localhost:3000/juri`      | Operator/Juri di PC  |
| **Peserta**| `http://[IP]:3000/peserta`        | Siswa di HP          |
| **Tampilan**| `http://[IP]:3000/tampilan`      | Layar proyektor      |

> Ganti `[IP]` dengan IP yang muncul di terminal (misal `192.168.1.10`)

---

## 📱 Cara Peserta Bergabung

1. Pastikan HP **terhubung WiFi yang sama** dengan PC juri
2. Buka browser di HP
3. Ketik alamat: `http://192.168.x.x:3000/peserta`
4. Pilih tim → Selesai!

---

## 🎮 Alur Penggunaan

### Persiapan (Juri)
1. Buka `/juri` di browser
2. **Setup Tim** — Isi nama tim, klik "💾 Simpan"
3. **Upload Excel** — Format sama: Sheet "Wajib", "Lemparan", "Cepat"
4. Pilih babak dari dropdown

### Saat Pertandingan
1. Klik **"Lanjut ke Amplop"** untuk mulai
2. Pilih amplop soal
3. Klik **▶ MULAI** untuk start timer
4. **Babak Adu Cepat:** Klik **🔔 BUKA BEL** → peserta bisa tekan bel
5. Bel pertama yang masuk = giliran otomatis terkunci
6. Klik tombol skor (Benar/Salah) → giliran terbuka lagi
7. Klik **👁 JAWABAN** untuk tampilkan jawaban

### Mekanisme Bel (Adu Cepat)
- Juri klik **"🔔 BUKA BEL"** → semua peserta bisa tekan
- Peserta pertama yang tekan → **giliran terkunci**
- Peserta lain tidak bisa tekan lagi
- Juri menilai → giliran terbuka → lanjut soal berikutnya

---

## 🌐 Akses dari Luar Jaringan (Opsional)

Jika peserta tidak dalam WiFi yang sama, gunakan **ngrok**:

```bash
# Install ngrok: https://ngrok.com/download
ngrok http 3000
```

Ngrok akan memberi URL publik seperti `https://abc123.ngrok.io`
Bagikan URL tersebut ke peserta.

---

## 📁 Format File Excel

Sama seperti versi offline:

| Sheet      | Kolom A  | Kolom B   |
|------------|----------|-----------|
| Wajib      | Soal     | Jawaban   |
| Lemparan   | Soal     | Jawaban   |
| Cepat      | Soal     | Jawaban   |

Baris pertama = header (diabaikan).

---

## 🛠 Troubleshooting

**Peserta tidak bisa akses?**
- Pastikan di WiFi yang sama
- Cek firewall Windows → izinkan Node.js
- Coba matikan Windows Firewall sementara

**Bel tidak responsif?**
- Pastikan koneksi WebSocket aktif (lihat indikator hijau)
- Refresh halaman peserta

**Port 3000 sudah dipakai?**
```bash
PORT=3001 npm start
```
