'use client';

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { getCategories, searchProducts, Product } from "@/lib/data";
import { useCart } from "@/components/CartProvider";

function ProductCardMobile({ p }: { p: Product }) {
  const { addItem } = useCart();
  return (
    <div className="block bg-white rounded-xl overflow-hidden active:scale-[0.97] transition-transform relative">
      <Link href={`/products/${p.id}`} className="block">
        <div className="relative aspect-[3/4] bg-gray-100">
          <Image src={p.cover_image} alt={p.title} fill sizes="50vw" className="object-cover" loading="lazy" />
          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/60 text-white text-[9px] rounded">{p.category_name}</span>
        </div>
        <div className="p-2.5">
          <div className="flex items-end justify-between mb-0.5">
            <span className="text-sm font-bold text-rose-600">¥{p.price}</span>
            <span className="text-[10px] text-gray-400">{p.name}</span>
          </div>
          <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">{p.title}</p>
        </div>
      </Link>
      {/* Add to cart button */}
      <button
        onClick={(e) => { e.stopPropagation(); addItem(p, 1); }}
        className="absolute bottom-1.5 right-1.5 w-7 h-7 bg-rose-600 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform z-10"
        aria-label="加入采购清单"
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
      </button>
    </div>
  );
}

function ProductCardPC({ p }: { p: Product }) {
  const { addItem } = useCart();
  return (
    <div className="block bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow relative group">
      <Link href={`/products/${p.id}`} className="block">
        <div className="relative aspect-square bg-gray-100">
          <Image src={p.cover_image} alt={p.title} fill sizes="25vw" className="object-cover" loading="lazy" />
        </div>
        <div className="p-3">
          <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-xs rounded mb-1.5 inline-block">{p.category_name}</span>
          <span className="text-sm font-bold text-rose-600 block">¥{p.price}</span>
          <p className="text-sm text-gray-800 mt-0.5 line-clamp-1">{p.title}</p>
          <span className="text-xs text-gray-400 mt-1 block">货号: {p.name}</span>
        </div>
      </Link>
      <button
        onClick={(e) => { e.stopPropagation(); addItem(p, 1); }}
        className="absolute bottom-3 right-3 w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 active:scale-90 transition-all z-10"
        aria-label="加入采购清单"
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
      </button>
    </div>
  );
}

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
    <div className="md:max-w-7xl md:mx-auto md:px-6 md:py-8">
      {/* Mobile: sticky search bar */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-100 px-3 pt-2.5 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索货号或关键词..."
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 rounded-full text-sm focus:outline-none focus:bg-gray-100 transition-colors"
              autoComplete="off"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">清除</button>
            )}
          </div>
          <button
            onClick={() => setSortBy(prev => prev === "default" ? "price-asc" : prev === "price-asc" ? "price-desc" : "default")}
            className={`shrink-0 px-3 py-2 text-xs font-medium rounded-full border transition-colors ${sortBy !== "default" ? "border-rose-200 bg-rose-50 text-rose-600" : "border-gray-200 text-gray-500"}`}
          >
            {sortBy === "default" ? "排序" : sortBy === "price-asc" ? "价↑" : "价↓"}
          </button>
        </div>
        <div className="flex gap-2 mt-2.5 overflow-x-auto scrollbar-hide">
          <button onClick={() => setCategoryId("all")} className={`shrink-0 px-3 py-1 text-xs font-medium rounded-full transition-colors ${categoryId === "all" ? "bg-rose-600 text-white" : "bg-gray-100 text-gray-600"}`}>全部</button>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setCategoryId(cat.id)} className={`shrink-0 px-3 py-1 text-xs font-medium rounded-full transition-colors ${categoryId === cat.id ? "bg-rose-600 text-white" : "bg-gray-100 text-gray-600"}`}>
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* PC filters */}
      <div className="hidden md:flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索货号或关键词..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
        </div>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm cursor-pointer">
          <option value="all">全部分类</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name} ({cat.count})</option>
          ))}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm cursor-pointer">
          <option value="default">默认排序</option>
          <option value="price-asc">价格: 低到高</option>
          <option value="price-desc">价格: 高到低</option>
        </select>
      </div>

      {/* Results count */}
      <div className="px-3 md:px-0 py-2 md:py-0">
        <p className="text-xs text-gray-400">共 {filteredProducts.length} 款 {query && `· "${query}"`} {categoryId !== "all" && `· ${categories.find(c => c.id === categoryId)?.name}`}</p>
      </div>

      {/* Mobile grid */}
      <div className="md:hidden grid grid-cols-2 gap-2 px-3 pt-2 pb-20">
        {filteredProducts.map((p) => (
          <ProductCardMobile key={p.id} p={p} />
        ))}
      </div>

      {/* PC grid */}
      <div className="hidden md:grid grid-cols-4 gap-4 mt-4">
        {filteredProducts.map((p) => (
          <ProductCardPC key={p.id} p={p} />
        ))}
      </div>

      {/* Empty */}
      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <svg className="w-12 h-12 mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
          <p className="text-sm">{query ? `未找到"${query}"` : "暂无产品"}</p>
        </div>
      )}
    </div>
  );
}

export default function ProductsContent() {
  return (
    <Suspense fallback={
      <div className="md:max-w-7xl md:mx-auto md:px-6 p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-10 bg-gray-200 rounded-full w-full" />
          <div className="h-7 bg-gray-200 rounded-full w-2/3" />
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl aspect-[3/4]" />
            ))}
          </div>
        </div>
      </div>
    }>
      <ProductsInner />
    </Suspense>
  );
}
