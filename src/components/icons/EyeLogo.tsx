'use client';

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import useMousePosition from "../utils/useMousePosition";

interface IconProps {
    width?: number;
    height?: number;
    className?: string;
    eyeColor: string;
    color?: string;
}

export default function EyeLogo({
    width = 16,
    height = 16,
    className = "",
    eyeColor,
    color = "var(--custom-icon)",
}: IconProps) {
    
    const { x, y, isMouseInWindow } = useMousePosition();
    const svgRef = useRef<SVGSVGElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const mouseRef = useRef({ x, y });

    const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        mouseRef.current = { x, y };
    }, [x, y]);

    useEffect(() => {
        if (!isMouseInWindow) {
            setPupilOffset({ x: 0, y: 0 });
            return;
        }

        const updatePupilOffset = () => {
            if (!svgRef.current || !isMouseInWindow) return;

            const { x, y } = mouseRef.current;
            const svgRect = svgRef.current.getBoundingClientRect();
            const svgCenterX = svgRect.left + svgRect.width / 2;
            const svgCenterY = svgRect.top + svgRect.height / 2;

            // Vector desde el centro del SVG (iris) hasta el cursor
            const vectorX = x - svgCenterX;
            const vectorY = y - svgCenterY;

            // Magnitud del vector
            const magnitude = Math.sqrt(vectorX * vectorX + vectorY * vectorY);

            const maxDistance = 10;
            const clampedMagnitude = Math.min(magnitude, maxDistance);

            const maxOffset = 20;
            let newOffset = { x: 0, y: 0 };
            if (magnitude > 0) {
                const ratio = clampedMagnitude / magnitude;
                newOffset = {
                    x: (vectorX * ratio / maxDistance) * maxOffset,
                    y: (vectorY * ratio / maxDistance) * maxOffset,
                };
            }
            
            setPupilOffset(newOffset);
            animationFrameRef.current = requestAnimationFrame(updatePupilOffset);
        };

        animationFrameRef.current = requestAnimationFrame(updatePupilOffset);

        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [x, y, isMouseInWindow]);

    return (
        <motion.div
            className={className}
            initial="closed"
            animate="open"
            whileHover="closed"
        >
            <svg
                ref={svgRef}
                width={width}
                height={height}
                viewBox="0 0 512 512"
                className={className}
                style={{
                    color,
                    transition: "color 0.5s ease-in",
                }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="IRIS" transform="matrix(1.078125,0,0,1.078125,-18.382904,-57.152517)">
                    <circle cx="254.5" cy="360.351" r="58.106" fill="currentColor"/>
                </g>

                <motion.g
                    animate={{
                        x: pupilOffset.x,
                        y: pupilOffset.y,
                    }}
                    transition={{
                        type: isMouseInWindow ? "tween" : "spring",
                        duration: isMouseInWindow ? 0.05 : undefined,
                        stiffness: isMouseInWindow ? undefined : 150,
                        damping: isMouseInWindow ? undefined : 20,
                    }}
                    >
                    <circle
                        cx="256"
                        cy="330"
                        r="25"
                        style={{
                            fill: eyeColor,
                            transition: "fill 0.5s ease-in",
                        }}
                    />
                </motion.g>

                <motion.rect
                    x="108"
                    y="240"
                    width="300"
                    height="175"
                    fill="currentColor"
                    style={{
                        originY: 0
                    }}
                    
                    variants={{
                        open: { scaleY: 0},
                        closed: { scaleY: 1 }
                    }}
                    transition={{
                        duration: 0.4,
                        ease: "easeInOut"
                    }}      
                />

                <motion.rect
                    x="108"
                    y="240"
                    width="300"
                    height="175"
                    fill="currentColor"
                    style={{
                        originY: 1
                    }}                    
                    variants={{
                        open: { scaleY: 0},
                        closed: { scaleY: 0.4 }
                    }}
                    transition={{
                        duration: 0.4,
                        ease: "easeInOut"
                    }}
                />
                
                <g id="BACK" transform="matrix(-1,0,0,1,512,-22)">
                        <path d="M256,512C422.477,512 439,343.474 439,343.474L439,198.706C439,198.706 427.37,197.822 398.317,198.652C369.264,199.482 365.113,230.196 365.113,230.196L365.944,130.917C365.944,130.917 364.328,95.764 329.434,95.753C296.195,95.742 291.779,127.611 291.779,127.611C291.779,127.611 291.961,100.366 292.323,77.922C292.839,45.962 262.19,43.165 256,43.165C249.81,43.165 219.161,45.962 219.677,77.922C220.039,100.366 220.221,127.611 220.221,127.611C220.221,127.611 215.805,95.742 182.566,95.753C147.672,95.764 146.056,130.917 146.056,130.917L146.887,230.196C146.887,230.196 142.736,199.482 113.683,198.652C84.63,197.822 73,198.706 73,198.706L73,343.474C73,343.474 73.959,512 256,512ZM256,295.244C328.405,293.749 359.764,340.667 378.454,353.351C349.223,375.271 333.008,410.818 256,411.45L256,411.457C178.131,411.788 150.323,366.408 131.451,353.351C159.613,332.764 176.079,297.042 256,295.244Z" fill="currentColor"/>
                </g> 
            </svg>
        </motion.div>
    );
}