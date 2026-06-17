// Small filesystem helpers built on node:fs/promises. writeIfChanged avoids
// rewriting unchanged output, which keeps the dev watch loop from re-triggering
// itself when the build writes into a directory it isn't watching.

import { cp, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export async function readText(path: string): Promise<string> {
  return readFile(path, "utf8");
}

export async function ensureDir(dir: string): Promise<void> {
  await mkdir(dir, { recursive: true });
}

/** Write a file (creating parent dirs) only when its content differs. */
export async function writeIfChanged(path: string, content: string): Promise<boolean> {
  try {
    if ((await readFile(path, "utf8")) === content) return false;
  } catch {
    // missing file — fall through and write it
  }
  await ensureDir(dirname(path));
  await writeFile(path, content);
  return true;
}

/** Recursively copy a directory tree. No-op if the source does not exist. */
export async function copyDir(src: string, dest: string): Promise<void> {
  try {
    await stat(src);
  } catch {
    return;
  }
  await cp(src, dest, { recursive: true });
}
