import { getShop, getProducts, getCategories } from "@/lib/data";
import { MapPin, Phone, Package, ShoppingBag, TrendingUp, Users, MessageCircle } from "lucide-react";

export default function AboutPage() {
  const shop = getShop();
  const products = getProducts();
  const categories = getCategories();

  const stats = [
    { label: "产品数量", value: products.length.toString(), icon: Package },
    { label: "产品分类", value: categories.length.toString(), icon: ShoppingBag },
    { label: "价格区间", value: "¥8~¥47", icon: TrendingUp },
    { label: "供应信誉", value: "多年供应", icon: Users },
  ];

  return (
    <div className="md:max-w-7xl md:mx-auto md:px-6 md:py-8">
      {/* Mobile top */}
      <div className="md:hidden px-4 pt-4 pb-2">
        <h1 className="text-lg font-bold text-gray-900">关于</h1>
        <p className="text-xs text-gray-400 mt-0.5">爆破服饰供应链</p>
      </div>

      {/* Brand card */}
      <div className="mx-3 md:mx-0 bg-gradient-to-br from-rose-500 to-amber-500 rounded-2xl p-5 md:p-8 text-white mb-3 md:mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-bold text-lg">爆</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">爆破服饰</h2>
            <p className="text-xs text-white/70">专业服饰供应链</p>
          </div>
        </div>
        <p className="text-sm text-white/80 leading-relaxed">
          为您提供外贸女装与中老年女装的优质批发货源，来自江苏常熟的专业供应商。
        </p>
      </div>

      {/* Stats */}
      <div className="mx-3 md:mx-0 grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-4 mb-3 md:mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-4 text-center md:border md:border-gray-100"
          >
            <stat.icon className="w-5 h-5 text-rose-500 mx-auto mb-1.5" />
            <div className="text-lg font-bold text-gray-900">{stat.value}</div>
            <div className="text-[11px] text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Supplier info */}
      <div className="mx-3 md:mx-0 bg-white rounded-xl p-4 md:border md:border-gray-100 md:p-6 mb-3 md:mb-6">
        <h3 className="text-sm font-bold text-gray-900 mb-4">供应商信息</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4 text-rose-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">店铺名称</p>
              <p className="text-sm font-medium text-gray-900">{shop.name}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-rose-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">地址</p>
              <p className="text-sm font-medium text-gray-900">{shop.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 text-rose-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">QQ 联系</p>
              <a
                href={`https://wpa.qq.com/msgrd?v=3&uin=${shop.qq}&site=qq&menu=yes`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-rose-600"
              >
                {shop.qq} →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mx-3 md:mx-0 bg-white rounded-xl p-4 md:border md:border-gray-100 md:p-6 mb-20 md:mb-0">
        <h3 className="text-sm font-bold text-gray-900 mb-3">产品分类</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sm font-bold text-rose-600 shadow-sm">
                  {cat.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-900">{cat.name}</span>
              </div>
              <span className="text-xs text-gray-400">{cat.count} 款 ›</span>
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-[11px] text-gray-300 mt-4 mb-4 md:mb-0">
        爆破服饰 © 2026
      </p>
    </div>
  );
}
