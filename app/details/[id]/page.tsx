import { getAnimeInfo } from "@/lib/anime";
import { Play, Star, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimeInfo, Episode } from "@/lib/types";

export default async function AnimeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const anime = await getAnimeInfo(id) as AnimeInfo | null;

  if (!anime) {
    return notFound();
  }

  return (
    <div className="pb-12">
      {/* Banner */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <img
          src={anime.image || ""}
          alt={anime.title.toString()}
          className="w-full h-full object-cover blur-sm opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-48 md:w-64 flex-shrink-0 mx-auto md:mx-0">
            <img
              src={anime.image || ""}
              alt={anime.title.toString()}
              className="w-full aspect-[3/4] object-cover rounded-lg shadow-2xl border border-white/10"
            />
          </div>

          {/* Details */}
          <div className="flex-grow text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <span className="text-sm font-medium text-gray-400">Home</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <span className="text-sm font-medium text-gray-400">{anime.type}</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <span className="text-sm font-medium text-white">{anime.title.toString()}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black mb-6">
              {anime.title.toString()}
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold">{anime.rating || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-medium">{anime.releaseDate || 'N/A'}</span>
              </div>
              <div className="bg-primary/20 text-primary px-3 py-1 rounded text-sm font-bold border border-primary/30">
                {anime.status}
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-3xl mb-8 text-sm md:text-base">
              {anime.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
              {anime.genres?.map((genre: string) => (
                <span key={genre} className="px-3 py-1 bg-[#1a1c1e] border border-[#2a2c2e] rounded-full text-xs font-medium hover:text-primary cursor-pointer transition-colors">
                  {genre}
                </span>
              ))}
            </div>

            {anime.episodes && anime.episodes.length > 0 && (
              <Link
                href={`/watch/${id}/${anime.episodes[0].id}`}
                className="inline-flex items-center gap-2 bg-primary text-black px-10 py-4 rounded-full font-black text-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg shadow-primary/20"
              >
                <Play className="w-6 h-6 fill-current" /> WATCH NOW
              </Link>
            )}
          </div>
        </div>

        {/* Episode List Section */}
        <div className="mt-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-1.5 h-8 bg-primary rounded-full" />
              List of Episodes
            </h2>
            <div className="flex-grow h-px bg-[#2a2c2e]" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {anime.episodes?.map((ep: Episode) => (
              <Link
                key={ep.id}
                href={`/watch/${id}/${ep.id}`}
                className="bg-[#1a1c1e] hover:bg-primary hover:text-black border border-[#2a2c2e] py-3 text-center rounded transition-all font-medium text-sm"
              >
                EP {ep.number}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
