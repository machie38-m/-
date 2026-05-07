import Link from 'next/link';
import { Play } from 'lucide-react';

interface AnimeCardProps {
  id: string;
  title: string;
  image: string;
  episodeNumber?: number;
  type?: string;
}

export default function AnimeCard({ id, title, image, episodeNumber, type }: AnimeCardProps) {
  return (
    <Link href={`/details/${id}`} className="group relative block overflow-hidden rounded-md bg-[#1a1c1e] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[3/4] w-full">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
          <div className="bg-primary p-3 rounded-full text-black">
            <Play className="w-6 h-6 fill-current" />
          </div>
        </div>
        {episodeNumber && (
          <div className="absolute top-2 left-2 bg-primary text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
            EP {episodeNumber}
          </div>
        )}
        {type && (
          <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
            {type}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  );
}
