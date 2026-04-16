import { useState, useEffect } from "react";

export default function useMousePosition() {
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInWindow, setIsMouseInWindow] = useState(false);

  const updateMousePosition = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      setIsMouseInWindow(true);
  };

  const handleMouseLeave = () => {
      setIsMouseInWindow(false);
  };

  useEffect(() => {
   
    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { ...mousePosition, isMouseInWindow };
}