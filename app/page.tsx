import Link from "next/link";
import Image from "next/image";
import { getCategories, getProducts, getShop } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";
import { Search } from "lucide-react";

export default function HomePage() {
  const categories = getCategories();
  const products = getProducts();
  const shop = getShop();

  // Featured products: latest 8
  const featured = products
    .filter((p) => p.price >= 15)
    .slice(0, 8);

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50 py-16 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"
            />
            265 款精选服饰在线
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
          >
            爆破服饰
            <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-gray-500 mt-2"
            >
              专业服饰供应链 · 外贸女装 · 中老年女装
            </span
            >
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto mb-8"
          >
            来自江苏常熟的专业供应商，质优价廉，为您的生意提供稳定货源
          </p
          >

          {/* Search CTA */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
          >
            <Search className="w-4 h-4" />
            浏览全部产品
          </Link
          >
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-rose-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-amber-200/30 rounded-full blur-3xl" />
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6"
        >
          产品分类
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-5 sm:p-6 hover:border-rose-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-rose-600 transition-colors mb-1"
                  >
                    {cat.name}
                  </h3
                  >
                  <p className="text-sm text-gray-500"
                  >
                    {cat.count} 款产品
                  </p
                  >
                </div>
                <div className="w-10 h-10 rounded-xl bg-rose-50 group-hover:bg-rose-100 flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-rose-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg
                  >
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      >
        <div className="flex items-center justify-between mb-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900"
          >
            热门产品
          </h2
          >
          <Link
            href="/products"
            className="text-sm text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1"
          >
            查看全部
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg
            >
          </Link
          >
        </div>
        <ProductGrid products={featured} />
      </section>

      {/* Supplier Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14"
      >
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4"
          >
            供应商信息
          </h2
          >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600"
          >
            <div
            >
              <span className="text-gray-400 block mb-1"
              >店铺名称</span
              >
              <span className="font-medium text-gray-900"
              >{shop.name}</span
              >
            </div
            >
            <div
            >
              <span className="text-gray-400 block mb-1"
              >地址</span
              >
              <span className="font-medium text-gray-900"
              >{shop.address}</span
              >
            </div
            >
            <div
            >
              <span className="text-gray-400 block mb-1"
              >QQ</span
              >
              <span className="font-medium text-gray-900"
              >{shop.qq}</span
              >
            </div
            >
            <div
            >
              <span className="text-gray-400 block mb-1"
              >产品数量</span
              >
              <span className="font-medium text-gray-900"
              >{products.length} 款</span
              >
            </div
            >
          </div
          >
        </div>
      </section>
    </div>
  );
}
