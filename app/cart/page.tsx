"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import Stepper from "@/components/Stepper";
import { getShop } from "@/lib/data";
import { formatOrder } from "@/lib/cart";
import { ShoppingCart, ArrowLeft, Trash2, ClipboardList, Phone } from "lucide-react";

export default function CartPage() {
  const { items, totalQty, totalPrice, updateQty, removeItem, showToast } = useCart();
  const shop = getShop();

  const handleCheckout = async () => {
    const text = formatOrder(items);
    try {
      await navigator.clipboard.writeText(text);
      showToast("采购清单已复制");
      setTimeout(() => {
        window.open(`https://wpa.qq.com/msgrd?v=3&uin=${shop.qq}&site=qq&menu=yes`, "_blank");
      }, 800);
    } catch {
      showToast("复制失败");
    }
  };

  return (
    <div className="md:max-w-7xl md:mx-auto md:px-6 md:py-8">
      {/* Mobile header */}
      <div className="md:hidden sticky top-0 z-40 flex items-center h-12 px-3 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <Link href="/" className="p-2 -ml-2 text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="flex-1 text-sm font-medium text-center pr-8">采购清单</span>
      </div>

      {/* PC header */}
      <div className="hidden md:block mb-6">
        <h1 className="text-2xl font-bold text-gray-900">采购清单</h1>
        <p className="text-sm text-gray-400 mt-1">共 {items.length} 款商品</p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 md:py-32 text-gray-400">
          <ShoppingCart className="w-14 h-14 mb-4 opacity-30" />
          <p className="text-sm text-gray-500 mb-2">还没有选中的商品</p>
          <Link href="/products" className="mt-3 px-6 py-2.5 bg-rose-600 text-white text-sm font-medium rounded-full active:bg-rose-700 transition-colors">
            去挑选商品
          </Link>
        </div>
      ) : (
        <>
          {/* List */}
          <div className="md:hidden pb-36">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-3 px-4 py-4 border-b border-gray-50 bg-white">
                <Link href={`/products/${item.productId}`} className="shrink-0">
                  <div className="w-20 h-28 bg-gray-100 rounded-lg overflow-hidden relative">
                    <Image src={item.coverImage} alt={item.title} fill sizes="80px" className="object-cover" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-gray-400">货号 {item.name}</p>
                        <p className="text-sm text-gray-800 leading-snug mt-0.5 line-clamp-2">{item.title}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-1.5 text-gray-300 active:text-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-rose-600">¥{item.price}</span>
                    <Stepper value={item.quantity} onChange={(v) => updateQty(item.productId, v)} size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PC list */}
          <div className="hidden md:block mb-6">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 mb-3">
                <Link href={`/products/${item.productId}`} className="shrink-0">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden relative">
                    <Image src={item.coverImage} alt={item.title} fill sizes="80px" className="object-cover" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400">货号 {item.name}</p>
                  <p className="text-sm text-gray-800 mt-0.5 line-clamp-1">{item.title}</p>
                  <p className="text-sm font-bold text-rose-600 mt-1">¥{item.price}</p>
                </div>
                <Stepper value={item.quantity} onChange={(v) => updateQty(item.productId, v)} />
                <button
                  onClick={() => removeItem(item.productId)}
                  className="p-2 text-gray-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="text-right min-w-[80px]">
                  <p className="text-xs text-gray-400">小计</p>
                  <p className="text-base font-bold text-gray-900">¥{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile bottom bar */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 px-4 pt-3 pb-4 safe-area-pb">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1">
                <p className="text-xs text-gray-400">
                  共 <span className="text-gray-700 font-medium">{items.length}</span> 款 <span className="text-gray-700 font-medium">{totalQty}</span> 件
                </p>
                <p className="text-xs text-gray-400">
                  合计 <span className="text-lg font-bold text-rose-600">¥{totalPrice}</span>
                </p>
              </div>
              <button
                onClick={handleCheckout}
                className="flex items-center gap-1.5 px-6 py-3 bg-rose-600 text-white text-sm font-medium rounded-full active:bg-rose-700 transition-colors"
              >
                <ClipboardList className="w-4 h-4" />
                复制清单
              </button>
              <a
                href={`https://wpa.qq.com/msgrd?v=3&uin=${shop.qq}&site=qq&menu=yes`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-5 py-3 bg-gray-900 text-white text-sm font-medium rounded-full active:bg-gray-800"
              >
                <Phone className="w-4 h-4" />
                QQ联系
              </a>
            </div>
          </div>

          {/* PC bottom */}
          <div className="hidden md:flex items-center justify-between bg-white rounded-xl border border-gray-100 p-5">
            <div>
              <p className="text-sm text-gray-500">共 {items.length} 款 {totalQty} 件</p>
              <p className="text-2xl font-bold text-rose-600 mt-0.5">¥{totalPrice}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCheckout}
                className="flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-xl transition-colors"
              >
                <ClipboardList className="w-4 h-4" />
                复制采购清单
              </button>
              <a
                href={`https://wpa.qq.com/msgrd?v=3&uin=${shop.qq}&site=qq&menu=yes`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" />
                QQ联系供应商
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
