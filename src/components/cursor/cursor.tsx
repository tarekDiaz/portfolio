'use client';

import { useEffect, useState } from 'react';
import useMousePosition from '../utils/useMousePosition';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {

  const [isHovered, setIsHovered] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  }

  const smoothOptions = {damping: 20, stiffness: 300, mass: 0.5}

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions)
  }
  const { x, y, isMouseInWindow,  } = useMousePosition();

  useEffect(() => {
    mouse.x.set(x);
    mouse.y.set(y);
  }, [x, y]);

  useEffect(() => {
    const interactiveSelector = 'a, button, [role="button"], .clickable';
    const textSelector = 'p, span, h1, h2, h3, h4, h5, h6, li, label, blockquote, em, strong, small, code';

    const updateHoverState = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        setIsHovered(false);
        setIsTextHovered(false);
        return;
      }

      const interactiveMatch = target.closest(interactiveSelector);
      const textMatch = target.closest(textSelector);

      setIsHovered(Boolean(interactiveMatch));
      setIsTextHovered(Boolean(textMatch) && !Boolean(interactiveMatch));
    };

    const onMouseOver = (event: MouseEvent) => {
      updateHoverState(event.target);
    };

    const onMouseLeaveDocument = () => {
      setIsHovered(false);
      setIsTextHovered(false);
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeaveDocument);

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeaveDocument);

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