import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const PORT = Number(process.env.PORT || "3000");
const HOST = process.env.HOST || "0.0.0.0";
const STATIC_ROOT = process.env.STATIC_ROOT || "dutchgoose-live";
const ROOT = join(process.cwd(), STATIC_ROOT);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf"
};

function loadRedirects() {
  const redirectFile = join(ROOT, ".htaccess");
  if (!existsFile(redirectFile)) {
    return new Map();
  }

  const lines = readFileSync(redirectFile, "utf8").split(/\r?\n/);
  const map = new Map();

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const match = trimmed.match(/^Redirect\s+301\s+(\S+)\s+(\S+)$/i);
    if (!match) {
      continue;
    }
    const [, fromPath, toPath] = match;
    map.set(fromPath, toPath);
  }
  return map;
}

function existsFile(pathname) {
  try {
    return statSync(pathname).isFile();
  } catch {
    return false;
  }
}

function safePath(urlPath) {
  const clean = urlPath.split("?")[0].split("#")[0];
  const mapped = clean === "/" ? "/index.html" : clean;
  const normalized = normalize(mapped).replace(/^(\.\.(\/|\\|$))+/, "");
  const directPath = join(ROOT, normalized);

  if (existsFile(directPath)) {
    return directPath;
  }

  if (extname(normalized) === "") {
    const htmlPath = join(ROOT, `${normalized}.html`);
    if (existsFile(htmlPath)) {
      return htmlPath;
    }

    const indexPath = join(ROOT, normalized, "index.html");
    if (existsFile(indexPath)) {
      return indexPath;
    }
  }

  return directPath;
}

const redirects = loadRedirects();

const server = createServer((req, res) => {
  const method = req.method || "GET";
  if (method !== "GET" && method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Method Not Allowed");
    return;
  }

  const filePath = safePath(req.url || "/");
  const urlPath = (req.url || "/").split("?")[0];
  const redirectTarget = redirects.get(urlPath);
  if (redirectTarget) {
    res.statusCode = 301;
    res.setHeader("location", redirectTarget);
    res.end();
    return;
  }

  if (!existsFile(filePath)) {
    res.statusCode = 404;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Not found");
    return;
  }

  const ext = extname(filePath).toLowerCase();
  res.statusCode = 200;
  res.setHeader("content-type", MIME[ext] || "application/octet-stream");
  if (method === "HEAD") {
    res.end();
    return;
  }
  res.end(readFileSync(filePath));
});

server.listen(PORT, HOST, () => {
  console.log(`Static site server running on http://localhost:${PORT} (root: ${STATIC_ROOT})`);
});
