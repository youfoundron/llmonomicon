// The page registry maps page titles, slugs, qualified `category/slug` forms,
// and aliases to their canonical entry, so `[[wiki-links]]` can resolve against
// the full set of pages discovered in pass 1. Keys are normalized via slugify
// so `[[Attention Is All You Need]]`, the filename, and aliases all collide.

import { slugify } from "./slug.ts";
import type { RegistryEntry } from "./types.ts";

export interface Registry {
  add(entry: RegistryEntry, aliases: string[]): void;
  resolve(name: string): RegistryEntry | undefined;
  all(): RegistryEntry[];
  /** Human-readable descriptions of ambiguous keys, for build-time warnings. */
  collisions(): string[];
}

export function createRegistry(): Registry {
  const byKey = new Map<string, RegistryEntry>();
  const entries: RegistryEntry[] = [];
  const collisions: string[] = [];

  const register = (name: string, entry: RegistryEntry): void => {
    const key = slugify(name);
    if (key === "") return;
    const existing = byKey.get(key);
    if (existing && existing !== entry) {
      collisions.push(`[[${name}]] is ambiguous: ${existing.url} vs ${entry.url} (kept first)`);
      return;
    }
    byKey.set(key, entry);
  };

  return {
    add(entry, aliases) {
      entries.push(entry);
      // Qualified form is always unique and never reported as a collision.
      byKey.set(slugify(`${entry.category}/${entry.slug}`), entry);
      register(entry.title, entry);
      register(entry.slug, entry);
      for (const alias of aliases) register(alias, entry);
    },
    resolve(name) {
      return byKey.get(slugify(name.trim()));
    },
    all() {
      return [...entries];
    },
    collisions() {
      return [...collisions];
    },
  };
}
