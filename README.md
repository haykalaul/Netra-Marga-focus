# NetraMarga - Eye Health Reminder 👁️

**NetraMarga** (dari bahasa Sansekerta: *Netra* = Mata, *Marga* = Jalan) adalah aplikasi pengingat kesehatan mata berbasis web yang dirancang untuk mengurangi kelelahan mata digital (*Digital Eye Strain*) dengan menerapkan aturan **20-20-20**.

Setiap 20 menit, aplikasi ini akan mengingatkan Anda untuk beristirahat selama 20 detik dan melihat sesuatu yang berjarak 20 kaki (sekitar 6 meter).

---

## 🚀 Tech Stack

Aplikasi ini dibangun menggunakan teknologi web standar tanpa dependensi berat untuk memastikan performa yang cepat dan ringan:

- **HTML5**: Struktur semantik untuk aksesibilitas dan SEO.
- **Vanilla CSS**: Desain modern dengan sistem gradien vibrant, desain responsif, dan animasi halus.
- **JavaScript (ES6+)**: Logika timer yang akurat menggunakan referensi waktu sistem (*real-world clock*).

---

## ✨ Fitur Utama

### Fitur Fungsional
- **Focus Timer (20 Menit)**: Sesi kerja terfokus selama 20 menit.
- **Break Timer (20 Detik)**: Jeda otomatis selama 20 detik untuk mengistirahatkan mata.
- **Auto-Play Transition**: Transisi otomatis dari sesi fokus ke sesi istirahat.
- **Audio Alarm**: Notifikasi suara saat sesi berakhir.
- **Browser Notifications**: Notifikasi pop-up sistem agar Anda tetap ingat meskipun sedang berada di tab lain.
- **Productivity Report**: Laporan sederhana untuk melacak jumlah sesi fokus yang telah diselesaikan.

### Fitur Non-Fungsional
- **Timer Accuracy Fix**: Menggunakan `Date.now()` untuk memastikan timer tidak melambat saat tab browser berada di latar belakang (*background throttling*).
- **Responsive Design**: Tampilan yang optimal baik di perangkat mobile maupun desktop.
- **Premium UI/UX**: Antarmuka bersih, modern, dan intuitif dengan palet warna yang nyaman di mata.

---

## 🛠️ Cara Berkontribusi

Kami sangat menghargai kontribusi dari komunitas! Jika Anda ingin berkontribusi:

1. **Fork** repositori ini.
2. Buat branch baru untuk fitur Anda (`git checkout -b fitur/fiturBaru`).
3. **Commit** perubahan Anda (`git commit -m 'Menambahkan fitur baru'`).
4. **Push** ke branch tersebut (`git push origin fitur/fiturBaru`).
5. Buat **Pull Request**.

### Area yang Bisa Ditingkatkan:
- Kustomisasi waktu durasi fokus/istirahat.
- Penambahan mode gelap (*Dark Mode*).
- Riwayat laporan yang tersimpan secara persisten (LocalStorage).

---

## 📄 Lisensi

Proyek ini berada di bawah lisensi MIT.

---
*Dibuat dengan ❤️ untuk kesehatan mata Anda.*
