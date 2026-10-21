---
title: 'Rancang bot customer support berbasis LLM'
order: 16
minutes: 45
relatedCase: 'bagian-3/llm-customer-support'
difficulty: 'sulit'
hints:
  - 'Tanyakan: sumber pengetahuan, tindakan yang boleh dilakukan bot, eskalasi, data pelanggan, regulasi.'
  - 'RAG: pipeline indexing (chunk, embed, versi, ACL) dan retrieval hybrid + rerank dengan ambang "tidak tahu".'
  - 'Tool layer di luar model: identitas dari sesi, kebijakan deterministik, konfirmasi untuk tindakan berdampak, audit.'
  - 'Prompt injection dan kebocoran data sebagai requirement keamanan, bukan catatan kaki.'
  - 'Evaluasi offline (suite dari tiket nyata) dan online (eskalasi, CSAT) sebagai komponen sistem.'
---

**Soal.** Rancang bot customer support untuk e-commerce yang menjawab dari pusat bantuan dan kebijakan resmi, bisa memeriksa status pesanan pelanggan yang login, mengusulkan refund dalam batas tertentu, dan mengeskalasi ke agen manusia dengan konteks, tanpa mengarang jawaban atau membocorkan data.

**Yang diharapkan dalam 45 menit:**

1. Requirements dan NFR (grounding, keamanan, latency, kesegaran, biaya).
2. Estimasi request/detik, ukuran index, token per request, biaya.
3. API sesi/pesan (stream dengan event retrieval/tool), konfirmasi, eskalasi, KB, eval.
4. Skema dokumen/chunk ber-versi dengan ACL, sesi, audit tool, eval.
5. High-level design dengan alur satu giliran (guardrail → retrieval → LLM → guardrail → simpan/eskalasi).
6. Deep dive: indexing + retrieval hybrid; orchestrator + tool layer + guardrail.
7. Evaluasi: LLM down, dokumen salah, injeksi, bottleneck 10x; cara mengukur kualitas.
