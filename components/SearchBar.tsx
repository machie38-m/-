'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar({ mobile, onSearch }: { mobile?: boolean, onSearch?: () => void }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      if (onSearch) onSearch();
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${mobile ? 'block w-full' : 'hidden sm:block'}`}>
      <input
        type="text"
        placeholder="Cari anime..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`bg-[#2a2c2e] border-none rounded-full py-2 px-4 pr-10 text-sm focus:ring-1 focus:ring-primary outline-none text-white ${mobile ? 'w-full' : 'w-64'}`}
      />
      <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-primary transition-colors">
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}
