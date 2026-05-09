'use client';

import { getTitle } from "@/lib/utils";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AnimeCard from "@/components/AnimeCard";
import SearchBar from "@/components/SearchBar";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((res) => {
          setResults(res.results || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [query]);

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-1.5 h-8 bg-primary rounded-full" />
          {query ? `Hasil Pencarian: ${query}` : "Cari Anime"}
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {results.map((anime: any) => (
            <AnimeCard
              key={anime.id}
              id={anime.id}
              title={getTitle(anime.title)}
              image={anime.image}
              type={anime.type}
            />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-20 text-gray-400">
          Tidak ditemukan hasil untuk &quot;{query}&quot;
        </div>
      ) : (
        <div className="hidden md:block text-center py-20 text-gray-400">
          Gunakan kolom pencarian di atas untuk mencari anime.
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10 max-w-2xl mx-auto md:hidden">
        <h1 className="text-2xl font-bold mb-6 text-center">Cari Anime</h1>
        <SearchBar mobile />
      </div>

      <Suspense fallback={
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      }>
        <SearchResults />
      </Suspense>
    </div>
  );
}
