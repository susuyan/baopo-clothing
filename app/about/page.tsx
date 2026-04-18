import { getShop, getProducts, getCategories } from "@/lib/data";
import { MapPin, Phone, ShoppingBag, TrendingUp, Package, Users } from "lucide-react";

export default function AboutPage() {
  const shop = getShop();
  const products = getProducts();
  const categories = getCategories();

  const stats = [
    { label: "产品数量", value: products.length.toString(), icon: Package },
    { label: "产品分类", value: categories.length.toString(), icon: ShoppingBag },
    { label: "批发价格区间", value: "¥8 ~ ¥47", icon: TrendingUp },
    { label: "客户信赖", value: "多年供应", icon: Users },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          关于爆破服饰
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          专业服饰供应链平台，为您提供高性价比的女装批发货源
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 text-center hover:shadow-md transition-shadow"
          >
            <stat.icon className="w-6 h-6 text-rose-500 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Supplier Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">供应商信息</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4 text-rose-500" />
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-0.5">店铺名称</div>
                <div className="font-medium text-gray-900">{shop.name}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-rose-500" />
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-0.5">地址</div>
                <div className="font-medium text-gray-900">{shop.address}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-rose-500" />
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-0.5">QQ 联系</div>
                <a
                  href={`https://wpa.qq.com/msgrd?v=3&uin=${shop.qq}&site=qq&menu=yes`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-rose-600 hover:text-rose-700 transition-colors"
                >
                  {shop.qq}（点击联系）
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">产品分类</h2>
          
          <div className="space-y-3">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 hover:bg-rose-50 hover:border-rose-100 border border-transparent transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sm font-bold text-rose-600 shadow-sm">
                    {cat.name.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-900">{cat.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">{cat.count} 款</span>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
