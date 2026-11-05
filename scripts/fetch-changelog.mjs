// Builds src/pages/changelog.md from the Lumunarr repo's history.md.
// Runs automatically before `npm start` and `npm run build` (see package.json).
// If the download fails, the last downloaded copy is kept so the build still works.

import { writeFile, access } from "node:fs/promises";

const SOURCE = "https://raw.githubusercontent.com/chadwpalm/Lumunarr/refs/heads/main/history.md";
const TARGET = new URL("../src/pages/changelog.md", import.meta.url);

// `mdx: format: md` keeps the {[#10](...)} issue links from being parsed as JavaScript.
const FRONT_MATTER = `---
title: Changelog
id: changelog
description: What's new in Lumunarr – release notes and updates
sidebar_label: Changelog
mdx:
  format: md
---

`;

try {
  const res = await fetch(SOURCE, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const history = await res.text();
  await writeFile(TARGET, FRONT_MATTER + history);
  console.log("[changelog] Updated from history.md");
} catch (err) {
  const exists = await access(TARGET).then(
    () => true,
    () => false,
  );
  if (!exists) {
    await writeFile(TARGET, FRONT_MATTER + "# Lumunarr Version History\n\nThe changelog could not be loaded.\n");
  }
  console.warn(`[changelog] Could not download history.md (${err.message}); ${exists ? "keeping existing copy" : "wrote placeholder"}`);
}
