'use client';

import { useEffect, useState } from 'react';
import useMousePosition from '../utils/useMousePosition';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const mouse = { x: useMotionValue(0), y: useMotionValue(0) };
  const smoothOptions = {damping: 20, stiffness: 300, mass: 0.5}
  const smoothMouse = { x: useSpring(mouse.x, smoothOptions), y: useSpring(mouse.y, smoothOptions) };
  const { x, y, isMouseInWindow,  } = useMousePosition();

  useEffect(() => {
    mouse.x.set(x);
    mouse.y.set(y);
  }, [x, y]);  

  useEffect(() => {
    const interactives = document.querySelectorAll('a, button, [role="button"], .clickable');
    const texts = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, label, blockquote, em, strong, small, code');

    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);
    const onTextEnter = () => setIsTextHovered(true);
    const onTextLeave = () => setIsTextHovered(false);
    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);

    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    texts.forEach((el) => {
      el.addEventListener('mouseenter', onTextEnter);
      el.addEventListener('mouseleave', onTextLeave);
    });

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });

      texts.forEach((el) => {
        el.removeEventListener('mouseenter', onTextEnter);
        el.removeEventListener('mouseleave', onTextLeave);
      });

      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);


  return (
      <motion.div 
        style={{
          left: smoothMouse.x, 
          top: smoothMouse.y,
        }} 
        className={`cursor-container ${isHovered ? 'cursor--hover' : ''} ${isTextHovered ? 'cursor--hover-text' : ''} ${isHovered && isPressed ? 'cursor--active' : ''} ${!isMouseInWindow ? 'cursor--hidden' : ''}`}>

      </motion.div>

  )
}