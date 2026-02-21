import fs from "node:fs";
import path from "node:path";

const merchantsPath = path.join(process.cwd(), "data", "merchants.json");
const previewsDir = path.join(process.cwd(), "public", "merchant-previews");

const merchants = JSON.parse(fs.readFileSync(merchantsPath, "utf-8"));

if (!fs.existsSync(previewsDir)) {
  fs.mkdirSync(previewsDir, { recursive: true });
}

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function ensureAbsolute(url, base) {
  try {
    return new URL(url, base).toString();
  } catch {
    return "";
  }
}

function extFromContentType(contentType) {
  const clean = (contentType || "").toLowerCase();
  if (clean.includes("png")) return "png";
  if (clean.includes("webp")) return "webp";
  if (clean.includes("svg")) return "svg";
  if (clean.includes("gif")) return "gif";
  return "jpg";
}

function extractImageCandidates(html, baseUrl) {
  const candidates = [];
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/gi,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/gi,
    /<link[^>]+rel=["'][^"']*apple-touch-icon[^"']*["'][^>]+href=["']([^"']+)["']/gi,
    /<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]+href=["']([^"']+)["']/gi
  ];

  for (const pattern of patterns) {
    let match = pattern.exec(html);
    while (match) {
      const absolute = ensureAbsolute(match[1], baseUrl);
      if (absolute) {
        candidates.push(absolute);
      }
      match = pattern.exec(html);
    }
  }

  return [...new Set(candidates)];
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "text/html,*/*" },
    redirect: "follow"
  });
  if (!res.ok) {
    throw new Error(`HTML ${res.status}`);
  }
  return res.text();
}

async function downloadImage(url, fileBase) {
  const res = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "image/*,*/*" },
    redirect: "follow"
  });
  if (!res.ok) {
    throw new Error(`IMG ${res.status}`);
  }
  const arr = new Uint8Array(await res.arrayBuffer());
  const ext = extFromContentType(res.headers.get("content-type") || "");
  const fileName = `${fileBase}.${ext}`;
  const filePath = path.join(previewsDir, fileName);
  fs.writeFileSync(filePath, arr);
  return `/merchant-previews/${fileName}`;
}

async function fetchFallbackFavicon(baseUrl, slug) {
  const host = new URL(baseUrl).hostname;
  const url = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=256`;
  return downloadImage(url, slug);
}

async function fetchPreviewForMerchant(merchant) {
  if (!merchant.baseUrl) {
    throw new Error("Geen baseUrl");
  }

  const baseUrl = merchant.baseUrl.startsWith("http")
    ? merchant.baseUrl
    : `https://${merchant.baseUrl}`;

  let html = "";
  try {
    html = await fetchHtml(baseUrl);
  } catch {
    // fallback verderop
  }

  if (html) {
    const candidates = extractImageCandidates(html, baseUrl);
    for (const imageUrl of candidates) {
      try {
        const localPath = await downloadImage(imageUrl, merchant.slug);
        return { localPath, source: imageUrl };
      } catch {
        // probeer volgende kandidaat
      }
    }
  }

  const localPath = await fetchFallbackFavicon(baseUrl, merchant.slug);
  return { localPath, source: "google-favicon-fallback" };
}

async function run() {
  const report = [];

  for (const merchant of merchants) {
    try {
      const { localPath, source } = await fetchPreviewForMerchant(merchant);
      merchant.heroImage = localPath;
      report.push({
        merchant: merchant.name,
        slug: merchant.slug,
        status: "ok",
        source
      });
    } catch (error) {
      report.push({
        merchant: merchant.name,
        slug: merchant.slug,
        status: "failed",
        source: String(error)
      });
    }
  }

  fs.writeFileSync(merchantsPath, `${JSON.stringify(merchants, null, 2)}\n`, "utf-8");
  console.table(report);
}

run();
