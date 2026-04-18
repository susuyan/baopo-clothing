/**
 * Seed Supabase with initial data from clean_data.json
 *
 * Usage:
 * 1. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars
 * 2. Run: npx tsx scripts/seed-supabase.ts
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  const raw = await import("../lib/data/raw-data");
  const data = (raw as any).RAW_DATA;

  console.log("Seeding Supabase with data...");

  // Seed categories
  const { error: catError } = await supabase
    .from("categories")
    .upsert(data.categories, { onConflict: "id" });

  if (catError) {
    console.error("Categories error:", catError);
    process.exit(1);
  }
  console.log(`✅ Inserted ${data.categories.length} categories`);

  // Seed supplier
  const { error: supError } = await supabase
    .from("suppliers")
    .upsert(
      {
        id: data.shop.id,
        name: data.shop.name,
        address: data.shop.address,
        qq: data.shop.qq,
        logo: data.shop.logo,
        subdomain: data.shop.subdomain,
      },
      { onConflict: "id" }
    );

  if (supError) {
    console.error("Supplier error:", supError);
    process.exit(1);
  }
  console.log("✅ Inserted supplier");

  // Seed products in batches
  const batchSize = 50;
  for (let i = 0; i < data.products.length; i += batchSize) {
    const batch = data.products.slice(i, i + batchSize);
    const { error: prodError } = await supabase
      .from("products")
      .upsert(batch, { onConflict: "id" });

    if (prodError) {
      console.error(`Products batch ${i} error:`, prodError);
      process.exit(1);
    }
    console.log(`✅ Inserted products ${i + 1}-${Math.min(i + batchSize, data.products.length)}`);
  }

  console.log("\n🎉 Seeding complete!");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
