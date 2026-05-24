type YouTubeVideoProps = {
  videoId: string;
  title?: string;
  className?: string;
};

export default function YouTubeVideo({
  videoId,
  title = "YouTube video player",
  className = "",
}: YouTubeVideoProps) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-background3 bg-background2 ${className}`}>
      <div className="relative aspect-video w-full">
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}