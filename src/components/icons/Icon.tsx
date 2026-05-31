import { useId } from "react";

interface IconProps {
    width?: number;
    height?: number;
    className?: string;
    gradient?: boolean;
}

export function Icon({ width = 16, height = 16, className = "", gradient = false }: IconProps) {
    const gradientId = useId();

    const iconShape = (
        <g xmlns="http://www.w3.org/2000/svg" id="BLACK-LOGO" transform="matrix(0.946606,0,0,0.932734,13.668831,17.60958)">
            <g id="IRIS" transform="matrix(1.078125,0,0,1.078125,-18.382904,-57.152517)">
                <path d="M254.5,302.244C286.57,302.244 312.606,328.281 312.606,360.351C312.606,392.42 286.57,418.457 254.5,418.457C222.43,418.457 196.394,392.42 196.394,360.351C196.394,328.281 222.43,302.244 254.5,302.244ZM254.5,338.485C242.432,338.485 232.634,348.282 232.634,360.351C232.634,372.419 242.432,382.217 254.5,382.217C266.568,382.217 276.366,372.419 276.366,360.351C276.366,348.282 266.568,338.485 254.5,338.485Z"
                fill="currentColor"/>
            </g>
            <g id="EYELID" transform="matrix(1,0,0,0.099138,-6.509588,216.23816)">
                <rect x="123.729" y="255.582" width="277.562" height="145.491"
                fill="currentColor"/>
            </g>
            <g id="BACK" transform="matrix(-1,0,0,1,512,-22)">
                <path d="M256,512C422.477,512 439,343.474 439,343.474L439,198.706C439,198.706 427.37,197.822 398.317,198.652C369.264,199.482 365.113,230.196 365.113,230.196L365.944,130.917C365.944,130.917 364.328,95.764 329.434,95.753C296.195,95.742 291.779,127.611 291.779,127.611C291.779,127.611 291.961,100.366 292.323,77.922C292.839,45.962 262.19,43.165 256,43.165C249.81,43.165 219.161,45.962 219.677,77.922C220.039,100.366 220.221,127.611 220.221,127.611C220.221,127.611 215.805,95.742 182.566,95.753C147.672,95.764 146.056,130.917 146.056,130.917L146.887,230.196C146.887,230.196 142.736,199.482 113.683,198.652C84.63,197.822 73,198.706 73,198.706L73,343.474C73,343.474 73.959,512 256,512ZM256,295.244C328.405,293.749 359.764,340.667 378.454,353.351C349.223,375.271 333.008,410.818 256,411.45L256,411.457C178.131,411.788 150.323,366.408 131.451,353.351C159.613,332.764 176.079,297.042 256,295.244Z"
                fill="currentColor"/>
            </g>
        </g>
    );

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 512 512"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            {gradient && (
                <defs>
                    <linearGradient
                        id={gradientId}
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop offset="0%" stopColor="var(--gradient-1)" />
                        <stop offset="100%" stopColor="var(--gradient-2)" />
                    </linearGradient>
                    <mask id={`${gradientId}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="512">
                        <g style={{ color: "white" }}>
                            {iconShape}
                        </g>
                    </mask>
                </defs>
            )}
            {gradient ? (
                <rect width="512" height="512" fill={`url(#${gradientId})`} mask={`url(#${gradientId}-mask)`} />
            ) : (
                iconShape
            )}
        </svg>
    );
}
