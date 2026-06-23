// Per-file "last touched" timestamps from git history — the wiki's only honest
// recency signal. The `updated:` front-matter field is bulk-set (every article
// shares one of two dates), so it can't rank entries; git commit dates can,
// because the contributor pipeline lands one entry per rebase-merged commit.
//
// Pure read of committed history via a single `git log` subprocess. If git is
// unavailable or this isn't a checkout (e.g. a tarball build), it returns an
// empty map and callers fall back to front-matter dates — the build never fails
// for want of git.

import { execFileSync } from "node:child_process";

/**
 * Map each tracked `content/...md` path to the Unix-ms timestamp of the most
 * recent commit that touched it. One newest-first `git log` walk: the first time
 * a path appears is its latest commit, so we record it and ignore later (older)
 * mentions. Returns an empty map on any git failure.
 */
export function lastCommitDates(): Map<string, number> {
  const dates = new Map<string, number>();
  let out: string;
  try {
    // `@%ct` marks each commit line with its committer timestamp (landing order
    // on main); `--name-only` with the `content` pathspec then lists only the
    // content files that commit changed.
    out = execFileSync(
      "git",
      ["log", "--no-merges", "--format=@%ct", "--name-only", "--", "content"],
      { encoding: "utf8", maxBuffer: 256 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] },
    );
  } catch {
    return dates; // not a git repo / git missing — caller degrades gracefully
  }

  let ts = 0;
  for (const line of out.split("\n")) {
    if (line.charCodeAt(0) === 64 /* '@' */) {
      ts = Number.parseInt(line.slice(1), 10) * 1000;
    } else if (ts && line.length > 0 && !dates.has(line)) {
      dates.set(line, ts);
    }
  }
  return dates;
}
