/**
 * Kurikulum: urutan bagian dan pelajaran yang DIRENCANAKAN.
 * Pelajaran yang belum ada file kontennya tetap tampil di sidebar sebagai "segera".
 * Progress dihitung terhadap pelajaran yang sudah tersedia.
 */
export const MODULE_IDS = ['bagian-1', 'bagian-2', 'bagian-3', 'bagian-4'] as const;
export type ModuleId = (typeof MODULE_IDS)[number];

export interface PlannedLesson {
  slug: string; // tanpa prefix bagian
  title: string;
}

export interface CurriculumModule {
  id: ModuleId;
  title: string;
  description: string;
  lessons: PlannedLesson[];
}

export const CURRICULUM: CurriculumModule[] = [
  {
    id: 'bagian-1',
    title: 'Fondasi',
    description:
      'Cara kerja interview, abstraksi distributed system, karakteristik non-fungsional, dan estimasi.',
    lessons: [
      { slug: 'cara-kerja-interview', title: 'Cara kerja system design interview' },
      { slug: 'do-and-dont', title: "Do & don't saat interview" },
      { slug: 'abstraksi-distributed-system', title: 'Abstraksi distributed system' },
      { slug: 'karakteristik-non-fungsional', title: 'Karakteristik non-fungsional' },
      { slug: 'estimasi-kapasitas', title: 'Back-of-the-envelope estimation' },
    ],
  },
  {
    id: 'bagian-2',
    title: 'Building Blocks',
    description: 'Komponen dasar yang dirangkai dalam hampir semua desain.',
    lessons: [
      { slug: 'dns', title: 'DNS' },
      { slug: 'load-balancer', title: 'Load balancer' },
      { slug: 'database', title: 'Database: replication, partitioning, SQL vs NoSQL' },
      { slug: 'key-value-store', title: 'Key-value store' },
      { slug: 'cdn', title: 'CDN' },
      { slug: 'unique-id-generator', title: 'Unique ID generator' },
      { slug: 'distributed-monitoring', title: 'Distributed monitoring' },
      { slug: 'distributed-cache', title: 'Distributed cache' },
      { slug: 'message-queue', title: 'Message queue' },
      { slug: 'pub-sub', title: 'Pub-sub' },
      { slug: 'rate-limiter', title: 'Rate limiter' },
      { slug: 'blob-store', title: 'Blob store' },
      { slug: 'distributed-search', title: 'Distributed search' },
      { slug: 'distributed-logging', title: 'Distributed logging' },
      { slug: 'task-scheduler', title: 'Task scheduler' },
      { slug: 'sharded-counter', title: 'Sharded counter' },
      { slug: 'framework-45-menit', title: 'Framework menjawab soal dalam 45 menit' },
    ],
  },
  {
    id: 'bagian-3',
    title: 'Studi Kasus',
    description: 'Desain sistem nyata, selalu dengan urutan 8 langkah yang sama.',
    lessons: [
      { slug: 'tinyurl', title: 'TinyURL' },
      { slug: 'web-crawler', title: 'Web crawler' },
      { slug: 'newsfeed', title: 'Twitter / newsfeed' },
      { slug: 'instagram', title: 'Instagram' },
      { slug: 'whatsapp', title: 'WhatsApp' },
      { slug: 'youtube', title: 'YouTube' },
      { slug: 'uber', title: 'Uber' },
      { slug: 'google-maps', title: 'Google Maps' },
      { slug: 'yelp-proximity', title: 'Yelp / proximity service' },
      { slug: 'typeahead', title: 'Typeahead' },
      { slug: 'google-docs', title: 'Google Docs' },
      { slug: 'payment-system', title: 'Payment system' },
      { slug: 'deployment-system', title: 'Deployment system' },
      { slug: 'online-judge', title: 'Online judge (LeetCode)' },
      { slug: 'chatgpt-like', title: 'ChatGPT-like system' },
      { slug: 'llm-customer-support', title: 'LLM customer support bot' },
    ],
  },
  {
    id: 'bagian-4',
    title: 'Pelajaran dari Outage Nyata',
    description: 'Postmortem publik dibedah: apa yang gagal, kenapa, dan pola apa yang bisa dipetik.',
    lessons: [
      { slug: 'cloudflare', title: 'Cloudflare' },
      { slug: 'aws', title: 'AWS' },
      { slug: 'facebook-bgp-2021', title: 'Facebook BGP 2021' },
      { slug: 'rangkuman', title: 'Rangkuman' },
    ],
  },
];

/** Urutan global semua pelajaran yang direncanakan, sebagai id "<bagian>/<slug>". */
export function plannedOrder(): string[] {
  return CURRICULUM.flatMap((m) => m.lessons.map((l) => `${m.id}/${l.slug}`));
}

export function moduleOf(id: string): CurriculumModule | undefined {
  const prefix = id.split('/')[0];
  return CURRICULUM.find((m) => m.id === prefix);
}
