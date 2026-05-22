interface ArrowProps {
    width?: number;
    height?: number;
    className?: string;
    angle?: number;
}

export function Arrow({
    width = 16,
    height = 16,
    className = "",
    angle = 0,
}: ArrowProps) {
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

            <path
                d="M12 5V19M12 5L6 11M12 5L18 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

        </svg>  
    );
}