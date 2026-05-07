import { getRecentEpisodes, getTopAiring } from "@/lib/anime";
import AnimeCard from "@/components/AnimeCard";
import { ChevronRight, Play } from "lucide-react";
import Link from "next/link";
import { AnimeResult } from "@/lib/types";

export default async function Home() {
  const [recentEpisodes, topAiring] = await Promise.all([
    getRecentEpisodes(),
    getTopAiring(),
  ]);

  const featured = topAiring.results?.[0] as AnimeResult | undefined;

  return (
    <div className="pb-10">
      {/* Hero Section */}
      {featured && (
        <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={featured.image || ""}
              alt={featured.title.toString()}
              className="w-full h-full object-cover blur-[2px] scale-105 opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-16 md:pb-24">
            <div className="flex items-center gap-2 text-primary mb-4">
              <span className="bg-primary/20 px-2 py-1 rounded text-xs font-bold tracking-wider">FEATURED</span>
              <span className="text-xs font-medium text-white/70">#1 Trending Now</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 max-w-2xl leading-tight">
              {featured.title.toString()}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm md:text-base font-medium">
              <span className="flex items-center gap-1.5">
                <Play className="w-4 h-4 fill-primary text-primary" /> TV Series
              </span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span>HD Quality</span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span className="text-primary">Sub | Dub</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/details/${featured.id}`}
                className="bg-primary text-black px-8 py-3.5 rounded-full font-bold flex items-center gap-2 hover:bg-primary/90 transition-all hover:scale-105"
              >
                <Play className="w-5 h-5 fill-current" /> WATCH NOW
              </Link>
              <Link
                href={`/details/${featured.id}`}
                className="bg-white/10 backdrop-blur-md text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                DETAILS
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-6 mt-12 space-y-12">
        {/* Recent Episodes */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-1.5 h-8 bg-primary rounded-full" />
              Recent Episodes
            </h2>
            <Link href="/recent" className="text-sm text-gray-400 hover:text-primary flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {recentEpisodes.results?.slice(0, 12).map((anime: AnimeResult) => (
              <AnimeCard
                key={anime.id}
                id={anime.id}
                title={anime.title.toString()}
                image={anime.image || ""}
                episodeNumber={anime.episodeNumber}
              />
            ))}
          </div>
        </section>

        {/* Trending Anime */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-1.5 h-8 bg-primary rounded-full" />
              Trending Anime
            </h2>
            <Link href="/trending" className="text-sm text-gray-400 hover:text-primary flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {topAiring.results?.slice(0, 12).map((anime: AnimeResult) => (
              <AnimeCard
                key={anime.id}
                id={anime.id}
                title={anime.title.toString()}
                image={anime.image || ""}
                type="TV"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
