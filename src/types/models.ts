export type TrackingNetwork = "awin" | "direct";

export type Merchant = {
  name: string;
  slug: string;
  category: string;
  shortPitch: string;
  whyForMaagverkleining: string[];
  trackingNetwork: TrackingNetwork;
  awinMerchantId?: string;
  awinTrackingUrl?: string;
  baseUrl: string;
  allowDefaultCode: boolean;
  couponCode?: string;
  couponText?: string;
  heroImage?: string;
  isFeatured: boolean;
  needsReview: boolean;
};

export type DealType = "code" | "link" | "sale";

export type Deal = {
  title: string;
  slug: string;
  merchantSlug: string;
  category: string;
  placementDefault: string;
  dealType: DealType;
  couponCode?: string;
  couponText?: string;
  startDate?: string;
  endDate?: string;
  note: string;
};

export type Category = {
  name: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  introCopy: string;
  faqs: Array<{ question: string; answer: string }>;
};

export type KennisbankArticle = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  updatedAt: string;
  readingMinutes: number;
  body: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export type PartnerFaq = {
  question: string;
  answer: string;
};

export type StarterKit = {
  slug: string;
  title: string;
  phase: string;
  description: string;
  bullets: string[];
  links: Array<{ label: string; href: string }>;
};
