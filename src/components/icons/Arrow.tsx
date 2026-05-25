import { useId } from "react";

interface ArrowProps {
    width?: number;
    height?: number;
    className?: string;
    angle?: number;
    gradient?: boolean;
}

export function Arrow({
    width = 16,
    height = 16,
    className = "",
    angle = 0,
    gradient = false,
}: ArrowProps) {
    const gradientId = useId();

    return (
        <svg
            width={width}
            height={height}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            style={{ transform: `rotate(${angle}deg)`, transformOrigin: "center" }}
        >
            {gradient && (
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--gradient-1)" />
                        <stop offset="100%" stopColor="var(--gradient-2)" />
                    </linearGradient>
                </defs>
            )}

            <path
                d="M12 5V19M12 5L6 11M12 5L18 11"
                stroke={gradient ? `url(#${gradientId})` : "currentColor"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

        </svg>  
    );
}