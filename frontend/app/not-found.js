import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-void-cream">
      <span className="text-xs font-mono tracking-super-wide uppercase text-void-slate">
        404 &bull; ARCHIVE NOT FOUND
      </span>
      <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-void-black mt-3 uppercase">
        PAGE NOT IN CIRCULATION
      </h1>
      <p className="text-sm text-void-slate max-w-md mt-4 leading-relaxed font-light">
        The piece, page, or silhouette you are looking for does not exist in the VOID ESSENTIALS archive.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 bg-void-black text-void-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>RETURN TO ATELIER</span>
      </Link>
    </div>
  );
}

