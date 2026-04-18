'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Info } from 'lucide-react';

const tabs = [
  { label: '首页', href: '/', icon: Home },
  { label: '全部产品', href: '/products', icon: ShoppingBag },
  { label: '关于', href: '/about', icon: Info },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 safe-area-pb"
    >
      <div className="flex justify-around items-center h-14"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-0.5 w-full h-full select-none"
              replace
            >
              <Icon
                className={`w-5 h-5 transition-colors ${isActive ? 'text-rose-600' : 'text-gray-400'}`}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${isActive ? 'text-rose-600' : 'text-gray-400'}`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 rounded-full bg-rose-600"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
