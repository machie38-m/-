'use client';

import Link from 'next/link';
import { Search, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#1a1c1e] text-white py-4 px-6 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <span className="text-primary">ANIME</span>WATCH
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/movies" className="hover:text-primary transition-colors">Movies</Link>
            <Link href="/tv-series" className="hover:text-primary transition-colors">TV Series</Link>
            <Link href="/most-popular" className="hover:text-primary transition-colors">Most Popular</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <SearchBar />
          <button className="p-2 hover:bg-[#2a2c2e] rounded-full transition-colors">
            <User className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-[#2a2c2e] rounded-full transition-colors md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 md:hidden pt-24 px-6 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-6 text-xl font-bold">
            <div className="pb-4 border-b border-white/10">
              <SearchBar mobile onSearch={() => setIsMenuOpen(false)} />
            </div>
            <Link onClick={() => setIsMenuOpen(false)} href="/" className="hover:text-primary transition-colors border-b border-white/10 pb-4">Home</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/movies" className="hover:text-primary transition-colors border-b border-white/10 pb-4">Movies</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/tv-series" className="hover:text-primary transition-colors border-b border-white/10 pb-4">TV Series</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/most-popular" className="hover:text-primary transition-colors border-b border-white/10 pb-4">Most Popular</Link>
          </div>
        </div>
      )}
    </>
  );
}
