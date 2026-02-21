export const categoryIllustration: Record<string, string> = {
  proteine: "/illustrations/category-proteine.svg",
  vezels: "/illustrations/category-vezels.svg",
  "keuken-en-tools": "/illustrations/category-keuken-en-tools.svg",
  "kleding-na-afvallen": "/illustrations/category-kleding-na-afvallen.svg",
  "uitjes-en-leven": "/illustrations/category-uitjes-en-leven.svg",
  "maaltijden-en-structuur": "/illustrations/category-maaltijden-en-structuur.svg"
};

export function getCategoryIllustration(slug: string) {
  return categoryIllustration[slug] ?? "/illustrations/deals-categories.svg";
}
