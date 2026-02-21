import Link from "next/link";
import type { ReactNode } from "react";

type GoLinkProps = {
  slug: string;
  placement: string;
  className?: string;
  children: ReactNode;
};

export function GoLink({ slug, placement, className, children }: GoLinkProps) {
  const href = `/go/${slug}?placement=${encodeURIComponent(placement)}`;
  return (
    <Link className={className} href={href} rel="nofollow sponsored">
      {children}
    </Link>
  );
}
