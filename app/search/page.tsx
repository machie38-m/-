import { searchAnime } from "@/lib/anime";
import AnimeCard from "@/components/AnimeCard";
import { AnimeResult } from "@/lib/types";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: query } = await searchParams;

  if (!query) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">No search query provided</h1>
        <p className="text-gray-400">Please search for an anime using the search bar.</p>
      </div>
    );
  }

  const results = await searchAnime(query);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Search Results for: <span className="text-primary">{query}</span>
      </h1>

      {results.results && results.results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {results.results.map((anime: AnimeResult) => (
            <AnimeCard
              key={anime.id}
              id={anime.id}
              title={anime.title.toString()}
              image={anime.image || ""}
              type={anime.type}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400">No results found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  );
}
