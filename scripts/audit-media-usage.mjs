/**
 * BaBra media audit — READ ONLY.
 *
 * Run: node scripts/audit-media-usage.mjs
 *
 * The audit reports candidate unused public media by filename and static path
 * references. It intentionally NEVER deletes anything. Assets may be used
 * dynamically, by external pages, emails, service workers, or old links;
 * confirm those separately before removing or archiving them.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicRoot = path.join(root, "public");
const sourceRoots = [
  "app", "components", "lib", "styles", "data", "content", "scripts"
].map((dir) => path.join(root, dir)).filter(fs.existsSync);
const readable = /\.(ts|tsx|js|jsx|mjs|cjs|css|scss|json|md|html)$/i;
const mediaExt = /\.(png|jpe?g|webp|avif|gif|svg|mp4|webm|mov|pdf)$/i;
const ignoredDirs = new Set(["node_modules", ".next", ".git", ".vercel", "coverage"]);

function walk(dir) {
  const list = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirs.has(entry.name)) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) list.push(...walk(file));
    else if (entry.isFile()) list.push(file);
  }
  return list;
}

if (!fs.existsSync(publicRoot)) throw new Error("Run from the repository root.");

const sourceFiles = sourceRoots.flatMap(walk).filter((file) => readable.test(file));
const sources = sourceFiles.map((file) => ({
  path: path.relative(root, file).replaceAll(path.sep, "/"),
  body: fs.readFileSync(file, "utf8")
}));
const mediaFiles = walk(publicRoot).filter((file) => mediaExt.test(file));
const audit = mediaFiles.map((file) => {
  const relative = path.relative(publicRoot, file).replaceAll(path.sep, "/");
  const url = "/" + relative;
  const basename = path.basename(relative);
  const size = fs.statSync(file).size;
  const refs = sources
    .filter((source) => source.body.includes(url) || source.body.includes(relative) || source.body.includes(basename))
    .map((source) => source.path);
  return { url, size, refs };
}).sort((a,b)=>b.size-a.size);

const total = audit.reduce((sum, item) => sum + item.size, 0);
const suspected = audit.filter((item) => item.refs.length === 0 && item.size >= 150_000);
const mb = (b) => (b/1_000_000).toFixed(2) + " MB";
console.log("BaBra public media — read-only scan");
console.log(`Media files: ${audit.length}; total: ${mb(total)}`);
console.log(`Potentially unreferenced assets >=150 kB: ${suspected.length}; total: ${mb(suspected.reduce((s,x)=>s+x.size,0))}`);
console.log("BEWARE: A missing static reference is NOT proof that an asset may be deleted.");
console.log("These files may be referenced dynamically, in published links, by external apps, or in older builds.\n");
for (const item of suspected) console.log(`${mb(item.size).padStart(10)}  ${item.url}`);
console.log("\nLargest referenced media:");
for (const item of audit.filter(x=>x.refs.length>0).slice(0,12)) {
  console.log(`${mb(item.size).padStart(10)}  ${item.url}  [${item.refs.slice(0,2).join(", ")}]`);
}
console.log("\nThis script does not delete files or modify Git history.");
