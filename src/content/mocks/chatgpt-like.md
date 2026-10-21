---
title: 'Rancang sistem chat LLM (ChatGPT-like)'
order: 15
minutes: 45
relatedCase: 'bagian-3/chatgpt-like'
difficulty: 'sulit'
hints:
  - 'Tanyakan berapa model atau tier, apakah jawaban di-stream, apakah ada tool use, kuota per pengguna, dan retensi percakapan.'
  - 'Estimasi token per detik lalu jumlah GPU. Biaya adalah faktor desain utama.'
  - 'Inference server memakai continuous batching, KV cache dengan paging, prefix caching, dan routing yang menempel ke replika yang memegang cache.'
  - 'Admission control: prioritas, kuota, turun ke model kecil saat penuh, kapasitas yang dihangatkan lebih dulu, dan backpressure sebelum GPU.'
  - 'Streaming lewat SSE atau WebSocket dari ujung ke ujung, dengan cancel, sambung ulang, dan moderasi output.'
---

**Soal.** Rancang layanan chat berbasis LLM untuk jutaan pengguna. Percakapan tersimpan, jawaban di-stream token per token, ada beberapa tier model, dan setiap pengguna punya kuota. Kapasitas GPU terbatas dan mahal.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirement dan target non-fungsional untuk waktu ke token pertama, token per detik, availability, biaya, dan privasi.
2. Hitung request per detik, token per detik, jumlah GPU, memori KV cache, dan koneksi streaming.
3. Rancang API percakapan dan pesan dengan SSE, pembatalan, dan pemakaian kuota.
4. Rancang skema percakapan, pesan, dan pemakaian, dengan model yang tidak menyimpan state.
5. Gambar high-level design dari gateway ke orchestrator, admission, router, dan inference, lalu jalur stream balik ke client.
6. Dalami inference server dengan batching dan KV cache, lalu admission control dan kapasitas.
7. Evaluasi GPU yang penuh, node GPU yang mati saat streaming, konteks yang panjang, dan bottleneck saat beban 10 kali.

Kerjakan di kertas atau whiteboard sambil bicara seolah ada interviewer. Setelah selesai, buka studi kasus terkait dan bandingkan.
