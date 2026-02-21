import type { Handler } from "@netlify/functions";
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type ClickRecord = {
  timestamp: string;
  slug: string;
  category: string;
  placement: string;
  ref: string;
  userAgentHash: string;
  country?: string;
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const parsed = JSON.parse(event.body || "{}") as ClickRecord;
    const row = JSON.stringify(parsed);

    const dir = "/tmp/dutchgoose-logs";
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    const filePath = join(dir, "clicks.ndjson");
    if (!existsSync(filePath)) {
      writeFileSync(filePath, "", "utf-8");
    }
    appendFileSync(filePath, `${row}\n`, "utf-8");

    // Placeholder: stuur naar extern endpoint als nodig.
    // await fetch(process.env.CLICK_LOG_ENDPOINT!, { method: "POST", body: row });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false })
    };
  }
};
