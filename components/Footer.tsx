import { getShop } from '@/lib/data';

export default function Footer() {
  const shop = getShop();

  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">爆</span>
              </div>
              <span className="text-lg font-bold text-white">爆破服饰</span>
            </div>
            <p className="text-sm leading-relaxed">
              专业服饰供应链，为您提供外贸女装与中老年女装的优质货源。
            </p>
          </div>

          {/* Supplier */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">供应商信息</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5 shrink-0">●</span>
                <span>{shop.name}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5 shrink-0">●</span>
                <span>{shop.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5 shrink-0">●</span>
                <span>QQ: {shop.qq}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">快捷链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/products" className="hover:text-white transition-colors">全部产品</a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">关于我们</a>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  联系方式
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs">
          <p>© 2026 爆破服饰 — 专业服饰供应链</p>
        </div>
      </div>
    </footer>
  );
}
