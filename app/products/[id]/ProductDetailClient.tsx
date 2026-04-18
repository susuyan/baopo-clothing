"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, Shop } from "@/lib/data";
import { useCart } from "@/components/CartProvider";
import Stepper from "@/components/Stepper";
import CopyButton from "@/components/CopyButton";
import { ArrowLeft, Phone, ExternalLink, ShoppingCart } from "lucide-react";

interface Props {
  product: Product;
  shop: Shop;
}

export default function ProductDetailClient({ product, shop }: Props) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, qty);
  };

  return (
    <div className="md:max-w-7xl md:mx-auto md:px-6 md:py-6">
      {/* Mobile */}
      <div className="md:hidden">
        <div className="sticky top-0 z-40 flex items-center h-12 px-3 bg-white/95 backdrop-blur-sm border-b border-gray-100">
          <Link href="/products" className="p-2 -ml-2 text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="flex-1 text-sm font-medium text-center pr-8 truncate">
            {product.name}
          </span>
        </div>

        <div className="relative aspect-[3/4] bg-gray-100">
          <Image src={product.cover_image} alt={product.title} fill sizes="100vw" className="object-cover" priority />
        </div>

        <div className="px-4 pt-4 pb-32">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-xs font-medium rounded">{product.category_name}</span>
            <span className="text-xs text-gray-400">{product.update_time}</span>
          </div>

          <div className="text-3xl font-bold text-rose-600 mb-1">
            ¥{product.price}
            <span className="text-xs font-normal text-gray-400 ml-1">批发价</span>
          </div>

          <h1 className="text-lg font-semibold text-gray-900 leading-snug mt-2">{product.title}</h1>

          <div className="mt-4 bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm text-gray-600">采购数量</span>
            <Stepper value={qty} onChange={setQty} size="md" />
          </div>

          <div className="mt-2 bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">货号</p>
              <p className="font-mono text-sm font-bold text-gray-900">{product.name}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 mb-0.5">分类</p>
              <p className="text-sm font-medium text-gray-900">{product.category_name}</p>
            </div>
          </div>

          <div className="mt-2 bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-2">供应商</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{shop.name}</p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{shop.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <CopyButton text={product.name} />
            </div>
          </div>

          <a href={product.detail_url} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-1.5 w-full py-3 text-sm text-gray-500 border border-gray-200 rounded-xl active:bg-gray-50">
            <ExternalLink className="w-3.5 h-3.5" />
            查看聚衣网详情
          </a>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 px-4 py-3 safe-area-pb">
          <div className="flex items-center gap-3">
            <div className="shrink-0 text-right">
              <p className="text-xs text-gray-400">合计</p>
              <p className="text-xl font-bold text-rose-600">¥{product.price * qty}</p>
            </div>
            <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 bg-rose-600 text-white text-sm font-medium rounded-full active:bg-rose-700 transition-colors">
              <ShoppingCart className="w-4 h-4" />
              加入采购清单
            </button>
            <a href={`https://wpa.qq.com/msgrd?v=3&uin=${shop.qq}&site=qq&menu=yes`} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-3 bg-gray-900 text-white text-sm font-medium rounded-full active:bg-gray-800 transition-colors">
              <Phone className="w-4 h-4" />
              联系采购
            </a>
          </div>
        </div>
      </div>

      {/* PC */}
      <div className="hidden md:grid grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative">
          <Image src={product.cover_image} alt={product.title} fill sizes="50vw" className="object-cover" priority />
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 bg-rose-50 text-rose-700 text-xs font-medium rounded-lg">{product.category_name}</span>
            <span className="text-xs text-gray-400">{product.update_time}</span>
          </div>

          <div className="text-4xl font-bold text-rose-600 mb-4">
            ¥{product.price}
            <span className="text-sm font-normal text-gray-400 ml-2">批发价</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">{product.title}</h1>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-gray-600">采购数量</span>
            <Stepper value={qty} onChange={setQty} />
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-5">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-400 block mb-1">货号</span>
                <span className="font-mono font-semibold text-gray-900">{product.name}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">分类</span>
                <span className="font-semibold text-gray-900">{product.category_name}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={handleAddToCart} className="flex items-center justify-center gap-2 w-full px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl transition-colors">
              <ShoppingCart className="w-4 h-4" />
              加入采购清单
            </button>
            <a href={`https://wpa.qq.com/msgrd?v=3&uin=${shop.qq}&site=qq&menu=yes`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-colors">
              <Phone className="w-4 h-4" />
              联系供应商采购
            </a>
            <a href={product.detail_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-8 py-3.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
              <ExternalLink className="w-4 h-4" />
              查看聚衣网详情
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">采购时请告知货号：</span>
              <CopyButton text={product.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
