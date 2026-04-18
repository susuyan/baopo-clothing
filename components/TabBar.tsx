'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, ShoppingCart } from 'lucide-react';
import { useCart } from './CartProvider';

const tabs = [
  { label: '首页', href: '/', icon: Home },
  { label: '产品', href: '/products', icon: ShoppingBag },
  { label: '采购', href: '/cart', icon: ShoppingCart },
];

export default function TabBar() {
  const pathname = usePathname();
  const { totalQty } = useCart();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-100 safe-area-pb">
      <div className="flex justify-around items-center h-[56px]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href; 
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-[2px] w-full h-full active:opacity-70 relative"
              replace
            >
              <div className="relative">
                <Icon
                  className={`w-[22px] h-[22px] transition-colors ${isActive ? 'text-rose-600' : 'text-gray-400'}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {tab.href === '/cart' && totalQty > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[14px] h-[14px] px-0.5 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {totalQty > 99 ? '99+' : totalQty}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-colors leading-none ${isActive ? 'text-rose-600' : 'text-gray-400'}`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
