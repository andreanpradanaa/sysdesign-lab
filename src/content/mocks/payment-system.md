---
title: 'Rancang sistem pembayaran marketplace'
order: 12
minutes: 45
relatedCase: 'bagian-3/payment-system'
difficulty: 'sulit'
hints:
  - 'Tanyakan: pedagang atau platform? memproses kartu sendiri atau lewat PSP? refund, payout, mata uang?'
  - 'Throughput kecil; yang dinilai adalah correctness: idempotency di setiap batas dan ledger double-entry.'
  - 'Timeout ke PSP = tidak diketahui, bukan gagal; state pending + status-check + webhook + rekonsiliasi.'
  - 'Webhook at-least-once dan tidak berurutan: dedup by event id, tarik status dari sumber.'
---

**Soal.** Rancang sistem pembayaran untuk marketplace: pembeli membayar pesanan lewat kartu/e-wallet (via payment service provider), platform memotong fee, penjual dibayar terjadwal, refund didukung, dan tidak boleh ada tagihan ganda atau uang yang hilang.

**Yang diharapkan dalam 45 menit:**

1. Requirements dan NFR (correctness, konsistensi, keamanan/PCI).
2. Estimasi transaksi, ledger, panggilan PSP, webhook.
3. API pay-in dengan idempotency key, refund, webhook, saldo.
4. Skema payments, idempotency store, ledger double-entry, event.
5. High-level design dengan alur pay-in termasuk jalur timeout.
6. Deep dive: idempotency end-to-end (sequence diagram) dan ledger; integrasi PSP dan rekonsiliasi.
7. Evaluasi: tagihan ganda, PSP down, failover DB, skala 100x.
