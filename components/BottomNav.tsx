'use client';

import Link from 'next/link';
import { Home, Search, TrendingUp, Film } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Beranda', icon: Home, href: '/' },
    { label: 'Cari', icon: Search, href: '/search' },
    { label: 'Film', icon: Film, href: '/movies' },
    { label: 'Populer', icon: TrendingUp, href: '/most-popular' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1c1e] border-t border-white/10 px-6 py-3 z-50 flex justify-between items-center shadow-[0_-4px_12px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-gray-400'}`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
