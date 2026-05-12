interface MoonProps {
  size?: number;
  className?: string;
}

export function Moon({ size=16, className = "" }: MoonProps) {
  return (
    <svg
      width={size}
      height={size  }
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
