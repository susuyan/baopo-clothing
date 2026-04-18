'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, User } from 'lucide-react';

const tabs = [
  { label: '首页', href: '/', icon: Home },
  { label: '产品', href: '/products', icon: ShoppingBag },
  { label: '我的', href: '/about', icon: User },
];

export default function TabBar() {
  const pathname = usePathname();

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
              className="flex flex-col items-center justify-center gap-[2px] w-full h-full active:opacity-70"
              replace
            >
              <Icon
                className={`w-[22px] h-[22px] transition-colors ${isActive ? 'text-rose-600' : 'text-gray-400'}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
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
