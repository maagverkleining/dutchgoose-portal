import categoriesData from "@data/categories.json";
import dealsData from "@data/deals.json";
import knowledgeData from "@data/knowledgebase.json";
import merchantsData from "@data/merchants.json";
import starterKitsData from "@data/starter-kits.json";
import type {
  Category,
  Deal,
  KennisbankArticle,
  Merchant,
  StarterKit
} from "@/types/models";

export const categories = categoriesData as Category[];
export const merchants = merchantsData as Merchant[];
export const deals = dealsData as Deal[];
export const knowledgebase = knowledgeData as KennisbankArticle[];
export const starterKits = starterKitsData as StarterKit[];

export const categoryMap = new Map(categories.map((item) => [item.slug, item]));
export const merchantMap = new Map(merchants.map((item) => [item.slug, item]));
export const dealMap = new Map(deals.map((item) => [item.slug, item]));
export const starterKitMap = new Map(starterKits.map((item) => [item.slug, item]));
export const articleMap = new Map(knowledgebase.map((item) => [item.slug, item]));

export function getDealsByCategory(slug: string) {
  return deals.filter((deal) => deal.category === slug);
}

export function getMerchantsByCategory(slug: string) {
  return merchants.filter((merchant) => merchant.category === slug);
}
