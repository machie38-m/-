import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a1c1e] text-gray-400 py-10 px-6 mt-12 border-t border-[#2a2c2e]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
            <span className="text-primary">ANIME</span>WATCH
          </Link>
          <p className="text-sm leading-relaxed max-w-md">
            AnimeWatch is a free anime streaming website where you can watch anime online in HD quality with English subtitles or dubbing.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/movies" className="hover:text-primary">Movies</Link></li>
            <li><Link href="/tv-series" className="hover:text-primary">TV Series</Link></li>
            <li><Link href="/popular" className="hover:text-primary">Popular</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#2a2c2e] text-center text-xs">
        <p>&copy; {new Date().getFullYear()} AnimeWatch. All rights reserved.</p>
      </div>
    </footer>
  );
}
