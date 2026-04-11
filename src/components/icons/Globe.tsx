interface GlobeProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Globe({ width = 16, height = 16, className = "" }: GlobeProps) {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  );
}
