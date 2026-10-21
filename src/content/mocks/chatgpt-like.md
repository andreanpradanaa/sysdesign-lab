---
title: 'Rancang sistem chat LLM (ChatGPT-like)'
order: 15
minutes: 45
relatedCase: 'bagian-3/chatgpt-like'
difficulty: 'sulit'
hints:
  - 'Tanyakan: berapa model/tier, streaming, tool use, kuota, retensi.'
  - 'Estimasi token/detik → jumlah GPU; biaya adalah faktor desain utama.'
  - 'Inference server: continuous batching, KV cache dengan paging, prefix caching, routing affinity.'
  - 'Admission control: prioritas, kuota, degradasi ke model kecil, pre-warm; backpressure di depan GPU.'
  - 'Streaming SSE/WS end-to-end dengan cancel, reconnect, moderasi output.'
---

**Soal.** Rancang layanan chat berbasis LLM untuk jutaan pengguna: percakapan tersimpan, jawaban di-stream token per token, beberapa tier model, kuota per pengguna, dan kapasitas GPU yang terbatas dan mahal.

**Yang diharapkan dalam 45 menit:**

1. Requirements dan NFR (TTFT, token/detik, availability, biaya, privasi).
2. Estimasi request/detik, token/detik, GPU, memori KV, koneksi streaming.
3. API percakapan/pesan dengan SSE, cancel, usage.
4. Skema percakapan, pesan, usage; model stateless.
5. High-level design: gateway → orchestrator → admission → router → inference, dan jalur stream balik.
6. Deep dive: inference server (batching, KV cache); admission control dan kapasitas.
7. Evaluasi: GPU penuh, node GPU mati saat stream, konteks panjang, bottleneck 10x.
