# Pedoman gaya bahasa

Tujuan: setiap teks di situs, dari tombol sampai studi kasus, bisa dipahami backend engineer yang baru belajar system design, tanpa harus membaca dua kali. Istilah teknis tetap bahasa Inggris; kalimat yang membungkusnya bahasa Indonesia yang wajar.

Pedoman ini dipaksakan sebagian oleh `src/test/content.test.ts` (lihat bagian "Pemeriksaan otomatis"). Sejak 21 Oktober 2026 seluruh konten (42 pelajaran lewat `STYLE_CHECKED` dan 16 soal mock lewat describe "soal mock interview") sudah mengikuti pedoman, jadi setiap konten baru langsung diperiksa.

## 1. Kalimat

- Satu gagasan per kalimat. Target 12–20 kata, maksimal 30.
- Mulai dengan subjek dan kata kerja. "Cache menyimpan salinan data" lebih baik daripada "Penyimpanan salinan data dilakukan oleh cache".
- Hindari sisipan dalam tanda kurung. Kalau isinya penting, jadikan kalimat sendiri; kalau tidak penting, buang. Batas: 1 tanda kurung per 100 kata.
- Jangan memakai panah (→) di dalam prosa. Panah hanya untuk diagram dan tabel ringkas.
- Jangan memakai titik koma untuk menyambung dua gagasan. Pecah menjadi dua kalimat.
- Angka di prosa secukupnya; perhitungan panjang masuk daftar atau tabel.

## 2. Istilah

- Istilah teknis ditulis dalam bahasa Inggris dan tidak diterjemahkan paksa: cache, queue, shard, idempotent, lease.
- Saat pertama muncul dalam satu pelajaran, beri pengantar satu kalimat atau frasa pendek: "lease, yaitu izin berbatas waktu yang harus diperpanjang".
- Singkatan dijabarkan saat pertama muncul: "QPS (query per detik)", "NFR (non-functional requirement)".
- Jangan mencampur dua istilah untuk satu hal. Pakai satu dan konsisten: "pengguna" (bukan "user") untuk orang yang memakai produk, "client" untuk aplikasi yang memanggil server.

## 3. Struktur

- Alur kerja ditulis sebagai daftar bernomor, satu langkah per baris, dimulai dengan kata kerja.
- Sel tabel berisi frasa lengkap yang bisa dibaca sendiri, bukan catatan telegram. Kalau sel butuh penjelasan, taruh di catatan di bawah tabel.
- Setiap bagian dimulai dengan kalimat yang memberi tahu kenapa bagian ini penting, baru detailnya.
- Bagian "Tujuan belajar" berisi 3 poin yang masing-masing dimulai dengan kata kerja.
- Bagian "Ringkasan" berisi 3 kalimat utuh yang bisa dibaca tanpa membuka bagian lain.

## 4. Kuis

- Soal: satu pertanyaan, maksimal 30 kata, tanpa sisipan.
- Opsi: maksimal 20 kata, semua opsi panjangnya setara agar jawaban benar tidak tertebak dari panjangnya.
- Penjelasan per opsi: 1–2 kalimat yang menyebut kenapa benar atau salah, bukan mengulang opsi.

## 5. Teks antarmuka

- Tombol memakai kata kerja: "Tandai selesai", "Periksa jawaban", "Simpan sesi".
- Pesan status memberi tahu apa yang terjadi dan apa langkah berikutnya: "Tersimpan di browser ini."
- Label bagian memakai bahasa sehari-hari: "Aturan praktis" bukan "Rule of thumb".
- Hindari emoji sebagai pengganti kata; ikon boleh sebagai hiasan.

## 6. Nada

- Bicara ke pembaca dengan "kamu", seperti mentor yang menjelaskan di whiteboard.
- Jujur tentang batas: "angka kasar", "bergantung pada model", "belum tentu".
- Tidak ada kalimat basa-basi pembuka seperti "Pada pelajaran ini kita akan membahas".

## Pemeriksaan otomatis

Untuk file di `STYLE_CHECKED`, test konten menolak:

- kalimat prosa lebih dari 30 kata,
- panah (→) atau titik koma di baris prosa (di luar kode, tabel, diagram),
- lebih dari 1 tanda kurung buka per 100 kata prosa,
- opsi kuis lebih dari 20 kata,
- soal kuis lebih dari 30 kata.

## Contoh sebelum dan sesudah

Sebelum: "Timeout adalah tebakan, bukan kepastian. Terlalu pendek → retry berlebihan dan failover palsu; terlalu panjang → user menunggu."

Sesudah: "Timeout hanyalah tebakan. Kalau terlalu pendek, sistem mengulang request yang sebenarnya masih diproses. Kalau terlalu panjang, pengguna menunggu tanpa kepastian."

Sebelum: "Alur tulis: client → post service memvalidasi, menulis post ke DB (satu tulisan), mempublikasikan post-created → fan-out worker …"

Sesudah:

1. Client mengirim post ke post service.
2. Post service memvalidasi isi dan menulis post ke database satu kali.
3. Post service menerbitkan event `post-created` ke queue.
4. Fan-out worker membaca event itu dan menambahkan ID post ke timeline setiap follower.
