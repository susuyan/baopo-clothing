'use client';

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getCategories, searchProducts } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";

function ProductsInner() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get("category") || "all";
  const initialQuery = searchParams?.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [categoryId, setCategoryId] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");

  const categories = getCategories();

  const filteredProducts = useMemo(() => {
    return searchProducts(query, categoryId === "all" ? undefined : categoryId, sortBy);
  }, [query, categoryId, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">全部产品</h1>
        <p className="text-sm text-gray-500">
          共 {filteredProducts.length} 款产品
          {query && ` · 搜索「${query}」`}
          {categoryId !== "all" && ` · ${categories.find((c) => c.id === categoryId)?.name}`}
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
        {/* Search */}
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索货号或关键词..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 cursor-pointer"
        >
          <option value="all">全部分类</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({cat.count})
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 cursor-pointer"
        >
          <option value="default">默认排序</option>
          <option value="price-asc">价格: 低到高</option>
          <option value="price-desc">价格: 高到低</option>
        </select>
      </div>

      {/* Results */}
      <ProductGrid
        products={filteredProducts}
        emptyMessage={query ? `没有找到「${query}」的相关产品` : "暂无产品"}
      />
    </div>
  );
}

export default function ProductsContent() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-10 bg-gray-200 rounded w-full" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl aspect-square" />
            ))}
          </div>
        </div>
      </div>
    }>
      <ProductsInner />
    </Suspense>
  );
}
