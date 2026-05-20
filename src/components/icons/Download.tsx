interface DownloadProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Download({ width = 16, height = 16, className = "" }: DownloadProps) {
  return (
    <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        className="shrink-0"
    >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
    </svg>
  );
}
