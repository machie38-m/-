import Link from 'next/link';
import { Search, Menu, User } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
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
          <Search className="w-5 h-5 sm:hidden" />
        </button>
        <button className="p-2 hover:bg-[#2a2c2e] rounded-full transition-colors">
          <User className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-[#2a2c2e] rounded-full transition-colors md:hidden">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
