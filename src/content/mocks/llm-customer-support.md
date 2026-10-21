---
title: 'Rancang bot customer support berbasis LLM'
order: 16
minutes: 45
relatedCase: 'bagian-3/llm-customer-support'
difficulty: 'sulit'
hints:
  - 'Tanyakan sumber pengetahuan, tindakan apa yang boleh dilakukan bot, cara eskalasi, data pelanggan apa yang diakses, dan regulasi yang berlaku.'
  - 'RAG: pipeline indexing dengan chunk, embedding, versi, dan ACL, lalu retrieval gabungan vektor dan leksikal dengan reranker dan ambang untuk menjawab tidak tahu.'
  - 'Tool layer berada di luar model: identitas dari sesi, kebijakan deterministik, konfirmasi untuk tindakan berdampak, dan audit.'
  - 'Perlakukan prompt injection dan kebocoran data sebagai requirement keamanan, bukan catatan kaki.'
  - 'Evaluasi offline dari tiket nyata dan evaluasi online dari rasio eskalasi dan kepuasan adalah komponen sistem.'
---

**Soal.** Rancang bot customer support untuk e-commerce. Bot menjawab dari pusat bantuan dan kebijakan resmi, bisa memeriksa status pesanan pelanggan yang login, mengusulkan refund dalam batas tertentu, dan mengeskalasi ke agen manusia dengan konteks. Bot tidak boleh mengarang jawaban atau membocorkan data.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirement dan target non-fungsional untuk grounding, keamanan, latency, kesegaran, dan biaya.
2. Hitung request per detik, ukuran index, token per request, dan biaya.
3. Rancang API sesi dan pesan dengan stream yang memuat event retrieval dan tool, lalu konfirmasi, eskalasi, basis pengetahuan, dan evaluasi.
4. Rancang skema dokumen dan chunk ber-versi dengan ACL, sesi, audit tool, dan data evaluasi.
5. Gambar high-level design dengan alur satu giliran dari guardrail, retrieval, LLM, guardrail, sampai simpan atau eskalasi.
6. Dalami indexing dan retrieval gabungan, lalu orchestrator, tool layer, dan guardrail.
7. Evaluasi LLM yang mati, dokumen yang salah, serangan injeksi, bottleneck saat beban 10 kali, dan cara mengukur kualitas.

Kerjakan di kertas atau whiteboard sambil bicara seolah ada interviewer. Setelah selesai, buka studi kasus terkait dan bandingkan.
