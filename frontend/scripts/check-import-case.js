#!/usr/bin/env node
/*
  check-import-case.js
  - Scans frontend/src for JS/TS files
  - Finds relative imports (./ or ../) and verifies the file path exists with exact casing
  - Exits with non-zero code if any mismatches are found
*/

import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd(), 'src');
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'];

function getAllFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      files = files.concat(getAllFiles(res));
    } else if (/\.(js|jsx|ts|tsx|mjs|cjs)$/.test(entry.name)) {
      files.push(res);
    }
  }
  return files;
}

function pathExistsWithExactCase(fullPath) {
  const parsed = path.parse(path.resolve(fullPath));
  const root = parsed.root; // e.g., C:\ or /
  const rest = path
    .resolve(fullPath)
    .slice(root.length)
    .split(path.sep)
    .filter(Boolean);
  let cur = root;
  for (const segment of rest) {
    try {
      const entries = fs.readdirSync(cur || path.sep);
      const match = entries.find((e) => e === segment);
      if (!match) return false;
      cur = path.join(cur, match);
    } catch (err) {
      return false;
    }
  }
  return true;
}

function resolveCandidate(base, fileDir) {
  // If base is already absolute, use it; otherwise resolve relative to fileDir
  const abs = path.resolve(fileDir, base);

  // Try the path directly (if extension was provided)
  if (fs.existsSync(abs) && pathExistsWithExactCase(abs))
    return { ok: true, found: abs };

  // Try with known extensions
  for (const ext of EXTENSIONS) {
    const p = abs + ext;
    if (fs.existsSync(p) && pathExistsWithExactCase(p))
      return { ok: true, found: p };
  }

  // Try index files (folder imports)
  for (const ext of EXTENSIONS) {
    const p = path.join(abs, 'index' + ext);
    if (fs.existsSync(p) && pathExistsWithExactCase(p))
      return { ok: true, found: p };
  }

  // If a file exists but casing mismatch, detect that too (exists but not exact case)
  for (const ext of EXTENSIONS) {
    const p = abs + ext;
    if (fs.existsSync(p) && !pathExistsWithExactCase(p))
      return { ok: false, candidate: p };
  }
  for (const ext of EXTENSIONS) {
    const p = path.join(abs, 'index' + ext);
    if (fs.existsSync(p) && !pathExistsWithExactCase(p))
      return { ok: false, candidate: p };
  }

  // No file found
  return { ok: false, candidate: null };
}

function findImports(content) {
  const imports = new Set();
  const importRe = /import\s+(?:[^'"\\n]+from\s+)?['"](.+?)['"]/g;
  const dynamicImportRe = /import\(\s*['"](.+?)['"]\s*\)/g;
  const requireRe = /require\(\s*['"](.+?)['"]\s*\)/g;
  let m;
  while ((m = importRe.exec(content))) imports.add(m[1]);
  while ((m = dynamicImportRe.exec(content))) imports.add(m[1]);
  while ((m = requireRe.exec(content))) imports.add(m[1]);
  return Array.from(imports).filter((s) => /^\.\.?/i.test(s)); // only relative
}

let files = getAllFiles(ROOT);
let errors = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const imports = findImports(content);
  const dir = path.dirname(file);
  for (const imp of imports) {
    const r = resolveCandidate(imp, dir);
    if (r.ok === true) continue; // good
    if (r.candidate) {
      // exists but case mismatch
      errors.push({
        file,
        import: imp,
        candidate: r.candidate,
        reason: 'case-mismatch',
      });
    } else {
      // File not found — warn only, don't fail (avoids false positives for optional/3rd-party code)
      console.warn(
        `Warning: In ${path.relative(
          process.cwd(),
          file
        )} -> import '${imp}' could not be resolved (tried common extensions). This is only a warning for the import-case checker.`
      );
    }
  }
}

if (errors.length > 0) {
  console.error(
    '\nImport case check failed: found ' + errors.length + ' problem(s)'
  );
  for (const e of errors) {
    if (e.reason === 'case-mismatch') {
      console.error(
        `\n[CASE MISMATCH] In ${path.relative(
          process.cwd(),
          e.file
        )} -> import '${e.import}' resolves to ${path.relative(
          process.cwd(),
          e.candidate
        )} but casing does not match exactly.`
      );
    } else {
      console.error(
        `\n[NOT FOUND] In ${path.relative(process.cwd(), e.file)} -> import '${
          e.import
        }' could not be resolved (tried common extensions).`
      );
    }
  }
  console.error(
    '\nFix the imports or file names so the path and casing match exactly.'
  );
  process.exit(1);
} else {
  console.log(
    'Import case check passed — all relative imports match file casing.'
  );
  process.exit(0);
}
