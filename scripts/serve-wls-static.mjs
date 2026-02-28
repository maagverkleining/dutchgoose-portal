import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const PORT = Number(process.env.PORT || "3002");
const HOST = process.env.HOST || "0.0.0.0";
const ROOT = join(process.cwd(), "wls-static");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8"
};

function safePath(urlPath) {
  const clean = urlPath.split("?")[0].split("#")[0];
  const mapped = clean === "/" ? "/index.html" : clean;
  const normalized = normalize(mapped).replace(/^(\.\.(\/|\\|$))+/, "");
  return join(ROOT, normalized);
}

function existsFile(pathname) {
  try {
    return statSync(pathname).isFile();
  } catch {
    return false;
  }
}

const server = createServer((req, res) => {
  const method = req.method || "GET";
  if (method !== "GET" && method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Method Not Allowed");
    return;
  }

  const filePath = safePath(req.url || "/");
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
  console.log(`WLS static server running on http://localhost:${PORT}`);
});
