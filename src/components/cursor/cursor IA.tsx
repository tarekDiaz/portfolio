'use client';

import { useEffect, useRef } from 'react';
import useMousePosition from '../utils/useMousePosition';

export default function Cursor() {
  
  const cursorRef = useRef<HTMLDivElement>(null);
    const { x, y, isMouseInWindow } = useMousePosition();

    useEffect(() => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      cursor.classList.toggle('cursor--hidden', !isMouseInWindow);
    }, [x, y, isMouseInWindow]);

    useEffect(() => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      const onMouseEnterInteractive = () => cursor.classList.add('cursor--hover');
      const onMouseLeaveInteractive = () => cursor.classList.remove('cursor--hover');

      // Seleccionamos todos los elementos que activarán el efecto
      const refreshInteractiveElements = () => {
        const interactives = document.querySelectorAll('a, button, [role="button"], .clickable');
        interactives.forEach((el) => {
          el.addEventListener('mouseenter', onMouseEnterInteractive);
          el.addEventListener('mouseleave', onMouseLeaveInteractive);
        });
      };

      refreshInteractiveElements();

      return () => {
        const interactives = document.querySelectorAll('a, button, [role="button"], .clickable');
        interactives.forEach((el) => {
          el.removeEventListener('mouseenter', onMouseEnterInteractive);
          el.removeEventListener('mouseleave', onMouseLeaveInteractive);
        });
      };
    }, []);

  return <div ref={cursorRef} className="cursor-container cursor--hidden" />;
}