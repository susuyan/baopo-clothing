'use client';

import Link from "next/link";
import Image from "next/image";
import { getCategories, getProducts } from "@/lib/data";
import { useCart } from "@/components/CartProvider";
import { Search } from "lucide-react";

function ProductCardMobile({ p }: { p: ReturnType<typeof getProducts>[0] }) {
  const { addItem } = useCart();
  return (
    <div className="block bg-white rounded-xl overflow-hidden active:scale-[0.98] transition-transform relative">
      <Link href={`/products/${p.id}`} className="block">
        <div className="relative aspect-[3/4] bg-gray-100">
          <Image src={p.cover_image} alt={p.title} fill sizes="50vw" className="object-cover" loading="lazy" />
          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/60 text-white text-[9px] rounded">{p.category_name}</span>
        </div>
        <div className="p-2.5">
          <div className="flex items-end justify-between mb-1">
            <span className="text-sm font-bold text-rose-600">¥{p.price}</span>
            <span className="text-[10px] text-gray-400">{p.name}</span>
          </div>
          <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">{p.title}</p>
        </div>
      </Link>
      <button
        onClick={() => addItem(p, 1)}
        className="absolute bottom-1.5 right-1.5 w-7 h-7 bg-rose-600 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform z-10"
        aria-label="加入采购清单"
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}

function ProductCardPC({ p }: { p: ReturnType<typeof getProducts>[0] }) {
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
        onClick={() => addItem(p, 1)}
        className="absolute bottom-3 right-3 w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 active:scale-90 transition-all z-10"
        aria-label="加入采购清单"
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}

export default function HomePage() {
  const categories = getCategories();
  const products = getProducts();
  const featured = products.slice(0, 10);

  return (
    <div className="md:pb-0">
      {/* Mobile top bar */}
      <div className="md:hidden bg-white border-b border-gray-100 px-4 py-2.5 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-base font-bold bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">爆破服饰</h1>
        <Link href="/products" className="text-xs text-gray-400 flex items-center gap-0.5">共{products.length}款<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
      </div>

      {/* Mobile: Search Bar + Categories */}
      <div className="md:hidden bg-white px-4 pt-3 pb-3.5 border-b border-gray-100">
        <Link href="/products" className="flex items-center gap-2 w-full px-3.5 py-2.5 bg-gray-50 rounded-full text-sm text-gray-400">
          <Search className="w-4 h-4" />搜索货号或关键词...
        </Link>
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/products?category=${cat.id}`} className="shrink-0 px-3.5 py-1.5 bg-rose-50 text-rose-600 text-xs font-medium rounded-full">{cat.name}</Link>
          ))}
          <Link href="/products" className="shrink-0 px-3.5 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">全部</Link>
        </div>
      </div>

      {/* PC Hero */}
      <section className="hidden md:block relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            265 款精选服饰
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
            爆破服饰
            <span className="block text-xl font-normal text-gray-500 mt-1.5">服饰供应链 · 外贸女装 · 中老年女装</span>
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">来自江苏常熟的专业供应商，质优价廉，为您的生意提供稳定货源</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
            <Search className="w-4 h-4" />浏览全部产品
          </Link>
        </div>
      </section>

      {/* Mobile: Featured Products */}
      <section className="md:hidden px-3 pt-3 pb-20">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-sm font-bold text-gray-900">热门产品</span>
          <Link href="/products" className="text-xs text-rose-600">查看更多</Link>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {featured.map((p) => (
            <ProductCardMobile key={p.id} p={p} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Link href="/products" className="text-xs text-gray-400 px-4 py-2 border border-gray-200 rounded-full active:bg-gray-50">查看更多产品</Link>
        </div>
      </section>

      {/* PC: Categories + Featured */}
      <section className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">产品分类</h2>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/products?category=${cat.id}`} className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-rose-200 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-rose-600 transition-colors">{cat.name}</h3>
                  <p className="text-sm text-gray-500">{cat.count} 款</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">热门产品</h2>
        <div className="grid grid-cols-4 gap-4">
          {featured.slice(0, 8).map((p) => (
            <ProductCardPC key={p.id} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
