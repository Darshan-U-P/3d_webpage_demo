import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';

gsap.registerPlugin(Draggable, Physics2DPlugin);

export const useParticleExplosion = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const explosionRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    // Build the container
    const container = document.createElement('div');
    container.style.cssText = "position:fixed; left:0; top:0; overflow:visible; z-index:9999; pointer-events:none;";
    document.body.appendChild(container);
    containerRef.current = container;

    const dotQuantity = 30;
    const tl = gsap.timeline({ paused: true });

    for (let i = 0; i < dotQuantity; i++) {
      const dot = document.createElement("div");
      dot.className = "absolute rounded-full pointer-events-none";
      // Improved styling with random colors
      const colors = ['#06b6d4', '#a855f7', '#ec4899', '#ffffff'];
      dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      const size = gsap.utils.random(5, 15, 1);
      container.appendChild(dot);

      const angle = Math.random() * Math.PI * 2;
      const length = Math.random() * 50;

      gsap.set(dot, {
        x: 0,
        y: 0,
        width: size,
        height: size,
        xPercent: -50,
        yPercent: -50,
        force3D: true
      });

      tl.to(dot, {
        physics2D: {
          angle: (angle * 180) / Math.PI,
          velocity: gsap.utils.random(200, 500),
          gravity: 500
        },
        duration: 1 + Math.random(),
        ease: "power2.out"
      }, 0).to(dot, {
        opacity: 0,
        duration: 0.5
      }, 0.5);
    }

    explosionRef.current = tl;

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  const explode = (x: number, y: number) => {
    if (explosionRef.current && containerRef.current) {
      gsap.set(containerRef.current, { x, y });
      explosionRef.current.play(0);
    }
  };

  return explode;
};
