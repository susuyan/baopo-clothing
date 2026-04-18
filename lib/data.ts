import { RAW_DATA } from './data/raw-data';
import {
  isSupabaseEnabled,
  fetchProductsFromSupabase,
  fetchProductByIdFromSupabase,
  fetchCategoriesFromSupabase,
  fetchShopFromSupabase,
} from './supabase';

export interface Product {
  id: string;
  name: string;
  title: string;
  price: number;
  category_id: string;
  category_name: string;
  cover_image: string;
  images: string[];
  update_time: string;
  detail_url: string;
  sort_order: number;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface Shop {
  id: string;
  name: string;
  address: string;
  qq: string;
  logo: string;
  subdomain: string;
}

export interface AppData {
  shop: Shop;
  categories: Category[];
  products: Product[];
  total: number;
}

// Fallback to embedded JSON data (works without Supabase)
const localData = RAW_DATA as unknown as AppData;

export async function getDataAsync(): Promise<AppData> {
  if (isSupabaseEnabled) {
    try {
      const [shop, categories, products] = await Promise.all([
        fetchShopFromSupabase(),
        fetchCategoriesFromSupabase(),
        fetchProductsFromSupabase(),
      ]);
      return { shop, categories, products, total: products.length };
    } catch {
      // Fallback to local data
    }
  }
  return localData;
}

export function getData(): AppData {
  return localData;
}

export function getProducts(): Product[] {
  return localData.products;
}

export function getProductById(id: string): Product | undefined {
  return localData.products.find((p) => p.id === id);
}

export function getCategories(): Category[] {
  return localData.categories;
}

export function getShop(): Shop {
  return localData.shop;
}

export function searchProducts(
  query: string,
  categoryId?: string,
  sortBy: 'default' | 'price-asc' | 'price-desc' = 'default'
): Product[] {
  let results = localData.products;

  if (query.trim()) {
    const q = query.trim().toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.category_name.toLowerCase().includes(q)
    );
  }

  if (categoryId && categoryId !== 'all') {
    results = results.filter((p) => p.category_id === categoryId);
  }

  switch (sortBy) {
    case 'price-asc':
      results = [...results].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      results = [...results].sort((a, b) => b.price - a.price);
      break;
    default:
      results = [...results].sort((a, b) => a.sort_order - b.sort_order);
      break;
  }

  return results;
}
