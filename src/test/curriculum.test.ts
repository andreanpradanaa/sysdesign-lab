import { describe, it, expect } from 'vitest';
import { CURRICULUM, MODULE_IDS, plannedOrder, moduleOf } from '../data/curriculum';

describe('curriculum', () => {
  it('empat bagian dengan id unik dan slug unik', () => {
    expect(CURRICULUM.map((m) => m.id)).toEqual([...MODULE_IDS]);
    const ids = plannedOrder();
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.length).toBeGreaterThanOrEqual(40);
  });

  it('slug memakai kebab-case', () => {
    for (const id of plannedOrder()) expect(id).toMatch(/^bagian-[1-4]\/[a-z0-9-]+$/);
  });

  it('moduleOf', () => {
    expect(moduleOf('bagian-3/tinyurl')?.title).toBe('Studi Kasus');
    expect(moduleOf('bagian-9/x')).toBeUndefined();
  });
});
