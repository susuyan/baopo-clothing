import { createClient } from "@supabase/supabase-js";
import { AppData } from "./data";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseEnabled = !!supabaseUrl && !!supabaseKey;

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and Anon Key are required");
  }
  return createClient(supabaseUrl, supabaseKey);
}

export async function fetchProductsFromSupabase() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function fetchProductByIdFromSupabase(id: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchCategoriesFromSupabase() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*");

  if (error) throw error;
  return data || [];
}

export async function fetchShopFromSupabase() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
