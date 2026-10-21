---
title: 'Rancang WhatsApp (chat 1:1 dan grup)'
order: 5
minutes: 45
relatedCase: 'bagian-3/whatsapp'
difficulty: 'sulit'
hints:
  - 'Tanyakan: grup berapa anggota? multi-device? E2EE? apakah server menyimpan riwayat?'
  - 'Hitung pesan/detik dan koneksi bersamaan; koneksi bersamaan menentukan jumlah server koneksi.'
  - 'Pisahkan lapisan koneksi (stateful ringan) dari message service; routing user → server di KV dengan lease.'
  - 'Reliability: inbox durable sebelum ACK, clientMsgId untuk dedup, ack bertingkat; jelaskan skenario penerima offline.'
  - 'Sebutkan apa yang tidak bisa dilakukan server karena E2EE.'
---

**Soal.** Rancang aplikasi chat seperti WhatsApp: pesan 1:1 dan grup, status terkirim/dibaca, penerima bisa offline, miliaran pengguna, isi pesan tidak bisa dibaca server.

**Yang diharapkan dalam 45 menit:**

1. Requirements functional (1:1, grup, status, presence, media) dan NFR (latency, tidak hilang, urutan, privasi).
2. Estimasi pesan/detik, koneksi bersamaan, storage inbox.
3. API: jalur HTTP vs koneksi persisten; frame SEND/ACK/MESSAGE/DELIVERED/READ.
4. Skema routing, inbox, grup, kunci.
5. High-level design dengan alur penerima online dan offline.
6. Deep dive: lapisan koneksi dan kegagalan server koneksi; jaminan reliability dan fanout grup.
7. Evaluasi terhadap latency, availability, skala 10x; batasan E2EE.
