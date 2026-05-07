import { getAnimeInfo, getEpisodeSources } from "@/lib/anime";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, List, Info } from "lucide-react";
import { AnimeInfo, Episode } from "@/lib/types";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string; episodePath: string[] }>;
}) {
  const { id, episodePath } = await params;

  // The episodeId in AnimePahe provider is usually the full string after /watch/
  // In our case it seems it can have multiple segments
  const episodeId = episodePath.join('/');

  const [anime, sources] = await Promise.all([
    getAnimeInfo(id) as Promise<AnimeInfo | null>,
    getEpisodeSources(episodeId),
  ]);

  if (!anime || !sources) {
    return notFound();
  }

  const currentEpisode = anime.episodes?.find((ep: Episode) => ep.id === episodeId);
  const currentIndex = anime.episodes?.findIndex((ep: Episode) => ep.id === episodeId) ?? -1;
  const prevEpisode = currentIndex > 0 && anime.episodes ? anime.episodes[currentIndex - 1] : null;
  const nextEpisode = anime.episodes && currentIndex < (anime.episodes.length - 1) ? anime.episodes[currentIndex + 1] : null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Player Area */}
        <div className="flex-grow">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400 mb-4 overflow-hidden whitespace-nowrap">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href={`/details/${id}`} className="hover:text-primary truncate">{anime.title.toString()}</Link>
            <span>/</span>
            <span className="text-white">Episode {currentEpisode?.number || 'Playing'}</span>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-[#2a2c2e]">
            {sources.headers?.Referer || sources.download?.[0]?.url ? (
                <iframe
                    src={sources.headers?.Referer || sources.download?.[0]?.url}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    scrolling="no"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                    <div>
                        <p className="text-xl font-bold mb-2">Video source not embeddable</p>
                        <p className="text-gray-400 mb-6">Try watching it on the source directly or check other episodes.</p>
                        {sources.sources?.[0]?.url && (
                            <a
                                href={sources.sources[0].url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-primary text-black px-6 py-2 rounded-full font-bold"
                            >
                                Open External Player
                            </a>
                        )}
                    </div>
                </div>
            )}
          </div>

          {/* Player Controls / Info */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-[#1a1c1e] p-4 rounded-lg border border-[#2a2c2e]">
            <div className="flex items-center gap-4">
              <h1 className="text-lg md:text-xl font-bold">
                {currentEpisode ? `EP ${currentEpisode.number}: ` : ''} <span className="font-medium text-gray-400">{anime.title.toString()}</span>
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {prevEpisode && (
                <Link
                  href={`/watch/${id}/${prevEpisode.id}`}
                  className="p-2 bg-[#2a2c2e] hover:bg-primary hover:text-black rounded transition-colors"
                  title="Previous Episode"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Link>
              )}
              {nextEpisode && (
                <Link
                  href={`/watch/${id}/${nextEpisode.id}`}
                  className="p-2 bg-[#2a2c2e] hover:bg-primary hover:text-black rounded transition-colors"
                  title="Next Episode"
                >
                  <ChevronRight className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full" />
                About Anime
            </h3>
            <div className="bg-[#1a1c1e] p-6 rounded-lg border border-[#2a2c2e]">
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 md:line-clamp-none">
                    {anime.description}
                </p>
                <div className="mt-4 pt-4 border-t border-[#2a2c2e] flex flex-wrap gap-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                    <div>Status: <span className="text-white">{anime.status}</span></div>
                    <div>Type: <span className="text-white">{anime.type}</span></div>
                    <div>Released: <span className="text-white">{anime.releaseDate}</span></div>
                </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Episode List */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-[#1a1c1e] rounded-lg border border-[#2a2c2e] overflow-hidden">
            <div className="p-4 border-b border-[#2a2c2e] flex items-center justify-between bg-[#2a2c2e]/30">
              <h2 className="font-bold flex items-center gap-2">
                <List className="w-4 h-4 text-primary" />
                Episodes
              </h2>
              <span className="text-xs text-gray-400">{anime.episodes?.length} Total</span>
            </div>
            <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
              {anime.episodes?.map((ep: Episode) => (
                <Link
                  key={ep.id}
                  href={`/watch/${id}/${ep.id}`}
                  className={`flex items-center gap-3 p-3 hover:bg-[#2a2c2e] transition-colors border-b border-[#2a2c2e]/50 last:border-0 ${
                    ep.id === episodeId ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded font-bold text-sm ${
                    ep.id === episodeId ? 'bg-primary text-black' : 'bg-[#2a2c2e] text-gray-400'
                  }`}>
                    {ep.number}
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <p className={`text-sm font-medium truncate ${ep.id === episodeId ? 'text-primary' : 'text-gray-200'}`}>
                      Episode {ep.number}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter">HD Streaming</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
