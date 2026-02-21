import { NextRequest, NextResponse } from "next/server";
import { dealMap, merchantMap } from "@/lib/data";
import { buildOutgoingLink } from "@/lib/tracking";
import { hashUserAgent } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const placement = request.nextUrl.searchParams.get("placement") || "unknown";

  const deal = dealMap.get(slug);
  const merchant = deal ? merchantMap.get(deal.merchantSlug) : merchantMap.get(slug);

  if (!merchant) {
    return NextResponse.redirect(new URL("/deals", request.url), 302);
  }

  const categorySlug = deal?.category ?? merchant.category;
  const target = buildOutgoingLink({
    merchant,
    deal,
    categorySlug,
    placement,
    slug
  });

  const payload = {
    timestamp: new Date().toISOString(),
    slug,
    category: categorySlug,
    placement,
    ref: request.headers.get("referer") || "",
    userAgentHash: hashUserAgent(request.headers.get("user-agent") || ""),
    country: request.headers.get("x-country") || ""
  };

  try {
    await fetch(new URL("/.netlify/functions/log-click", request.url), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store"
    });
  } catch {
    // Logging mag redirect niet blokkeren.
  }

  return NextResponse.redirect(target, 302);
}
