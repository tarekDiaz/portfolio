"use client";

import { useState } from "react";
import { TbPlayerPlayFilled } from "react-icons/tb";

type YouTubeVideoProps = {
  videoId: string;
  title?: string;
  className?: string;
  thumbnailSrc?: string;
};

const visibilityEventName = "cursor-visibility-change";

function setCursorHidden(hidden: boolean) {
  window.dispatchEvent(
    new CustomEvent(visibilityEventName, {
      detail: { hidden },
    })
  );
}

export default function YouTubeVideo({
  videoId,
  title = "YouTube video player",
  className = "",
  thumbnailSrc,
}: YouTubeVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  const defaultPosterUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const posterUrl = thumbnailSrc ?? defaultPosterUrl;

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-background3 bg-background2 ${className}`}>
      <div className="relative aspect-video w-full">
        {isPlaying ? (
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 h-full w-full"
            onMouseEnter={() => setCursorHidden(true)}
            onMouseLeave={() => setCursorHidden(false)}
            onBlur={() => setCursorHidden(false)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <>
            <img
              src={posterUrl}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/30 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center p-6">
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="group inline-flex origin-center items-center gap-4 rounded-full bg-background2 px-6 py-3 text-sm uppercase tracking-[0.22em] text-text backdrop-blur-md transition-all duration-300 hover:scale-102"
                aria-label={`Play ${title}`}
              >
                <span className="flex h-11 w-11 origin-center items-center justify-center rounded-full bg-text text-background transition-transform duration-300 group-hover:scale-105">
                  <TbPlayerPlayFilled size={16} aria-hidden="true" className="block" />
                </span>
                Play video
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}