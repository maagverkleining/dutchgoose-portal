"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type GoLinkProps = {
  slug: string;
  placement: string;
  eventName?: "affiliate_click" | "deal_click";
  className?: string;
  children: ReactNode;
};

export function GoLink({
  slug,
  placement,
  eventName = "affiliate_click",
  className,
  children
}: GoLinkProps) {
  const href = `/go/${slug}?placement=${encodeURIComponent(placement)}`;
  return (
    <Link
      className={className}
      href={href}
      rel="nofollow sponsored"
      onClick={() => trackEvent(eventName, { slug, placement })}
    >
      {children}
    </Link>
  );
}
