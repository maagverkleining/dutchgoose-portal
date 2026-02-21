export function toSlug(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function formatDate(date: Date) {
  return date.toISOString().slice(0, 10).replaceAll("-", "");
}

export function hashUserAgent(userAgent: string) {
  let hash = 0;
  for (let i = 0; i < userAgent.length; i += 1) {
    hash = (hash << 5) - hash + userAgent.charCodeAt(i);
    hash |= 0;
  }
  return `ua_${Math.abs(hash)}`;
}

export function classNames(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
