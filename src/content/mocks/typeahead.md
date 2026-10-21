---
title: 'Rancang typeahead / autocomplete pencarian'
order: 10
minutes: 45
relatedCase: 'bagian-3/typeahead'
difficulty: 'sedang'
hints:
  - 'Tanyakan berapa saran yang ditampilkan, dari mana popularitas dihitung, seberapa segar saran harus, dan kebijakan konten apa yang berlaku.'
  - 'Pakai trie dengan daftar top-k yang dihitung di muka di tiap simpul. Jelaskan kenapa trie polos tidak cukup.'
  - 'Popularitas dihitung batch, dibungkus sebagai snapshot, lalu ditukar secara atomik di tiap node. Replikasi penuh selama muat di memori.'
  - 'Cache berlapis: client menyaring hasil sebelumnya, edge menyimpan per prefix, dan service menyimpan di memori.'
---

**Soal.** Rancang fitur autocomplete pada kotak pencarian. Setiap ketukan menampilkan 10 saran terpopuler yang diawali teks yang diketik, dalam puluhan milidetik, untuk ratusan ribu request per detik.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirement dan target non-fungsional untuk latency, throughput, kesegaran, dan memori.
2. Hitung ukuran trie, QPS, cache per prefix, dan volume log pencarian.
3. Rancang API suggest dengan header cache, dan jelaskan perilaku client seperti debounce dan penyaringan lokal.
4. Rancang skema log, agregat popularitas, snapshot trie, dan daftar blokir.
5. Gambar high-level design dengan jalur query dan pipeline pembaruan snapshot.
6. Dalami struktur trie dengan top-k, lalu distribusi dan pertukaran snapshot.
7. Evaluasi node baru yang bergabung, snapshot yang rusak, saran tren, dan bottleneck saat beban 10 kali.

Kerjakan di kertas atau whiteboard sambil bicara seolah ada interviewer. Setelah selesai, buka studi kasus terkait dan bandingkan.
