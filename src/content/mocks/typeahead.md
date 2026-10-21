---
title: 'Rancang typeahead / autocomplete pencarian'
order: 10
minutes: 45
relatedCase: 'bagian-3/typeahead'
difficulty: 'sedang'
hints:
  - 'Tanyakan k, sumber popularitas, kesegaran yang dibutuhkan, dan kebijakan konten.'
  - 'Trie dengan top-k terprakomputasi di tiap simpul; jelaskan kenapa trie polos tidak cukup.'
  - 'Pipeline batch popularitas → snapshot → swap atomik di tiap node; replika penuh selama muat memori.'
  - 'Cache berlapis: client (filter lokal), edge per prefix, memori service.'
---

**Soal.** Rancang fitur autocomplete pada kotak pencarian: setiap ketukan menampilkan 10 saran terpopuler yang diawali teks yang diketik, dalam puluhan milidetik, untuk ratusan ribu request per detik.

**Yang diharapkan dalam 45 menit:**

1. Requirements dan NFR (latency, throughput, kesegaran, memori).
2. Estimasi ukuran trie, QPS, cache per prefix, volume log.
3. API suggest dengan header cache; perilaku client (debounce, filter lokal).
4. Skema log, agregat popularitas, snapshot trie, blocklist.
5. High-level design: jalur query dan pipeline pembaruan snapshot.
6. Deep dive: struktur trie + top-k; distribusi dan swap snapshot.
7. Evaluasi: node baru, snapshot rusak, tren, bottleneck 10x.
