import fs from "node:fs";
import path from "node:path";
import xlsx from "xlsx";
import merchants from "../data/merchants.json";
import { toSlug } from "../src/lib/utils";

type MerchantRow = {
  name?: string;
  merchant?: string;
  merchantName?: string;
  Merchant?: string;
  MerchantName?: string;
  merchant_id?: string | number;
  MerchantId?: string | number;
  id?: string | number;
  url?: string;
  website?: string;
  tracking_url?: string;
  awin_tracking_url?: string;
};

function resolveSourceFile() {
  const importsDir = path.join(process.cwd(), "imports");
  const files = fs
    .readdirSync(importsDir)
    .filter((file) => /\.(csv|xlsx|xls)$/i.test(file))
    .sort();

  if (files.length === 0) {
    throw new Error("Geen CSV of Excel gevonden in /imports");
  }

  return path.join(importsDir, files[0]);
}

function normalizeRow(row: MerchantRow) {
  const name =
    row.name || row.merchant || row.merchantName || row.Merchant || row.MerchantName || "";
  const awinMerchantId =
    row.merchant_id?.toString() || row.MerchantId?.toString() || row.id?.toString() || "";
  const baseUrl = row.url || row.website || "";
  const awinTrackingUrl = row.tracking_url || row.awin_tracking_url || "";

  return {
    name: name.trim(),
    slug: toSlug(name),
    category: "",
    shortPitch: "Geimporteerd uit Awin export. Nog aanvullen.",
    whyForMaagverkleining: [
      "Nog te reviewen",
      "Nog te reviewen",
      "Nog te reviewen"
    ],
    trackingNetwork: "awin" as const,
    awinMerchantId,
    awinTrackingUrl,
    baseUrl,
    allowDefaultCode: false,
    isFeatured: false,
    needsReview: true
  };
}

function run() {
  const sourceFile = resolveSourceFile();
  const workbook = xlsx.readFile(sourceFile);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json<MerchantRow>(sheet, { defval: "" });

  const imported = rows
    .map(normalizeRow)
    .filter((row) => Boolean(row.name) && Boolean(row.slug));

  const existingSlugs = new Set(merchants.map((item) => item.slug));
  const additions = imported.filter((row) => !existingSlugs.has(row.slug));
  const skipped = imported.length - additions.length;

  const merged = [...merchants, ...additions];
  fs.writeFileSync(path.join(process.cwd(), "data", "merchants.json"), `${JSON.stringify(merged, null, 2)}\n`, "utf-8");

  const summary = {
    bronBestand: path.basename(sourceFile),
    rijenGelezen: rows.length,
    valideRijen: imported.length,
    toegevoegd: additions.length,
    overgeslagenBestaand: skipped,
    reviewNodig: additions.filter((item) => item.needsReview).length
  };

  console.table(summary);
}

run();
