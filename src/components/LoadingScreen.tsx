import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';

export default function LoadingScreen() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('#svg-stage', { opacity: 1 });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

      tl.fromTo('.group1', { scale: 0.1, transformOrigin: '124 124' }, { duration: 0.35, scale: 1, ease: 'expo.inOut' })
        .to('.group1', { duration: 1.2, rotate: 15, ease: 'none' }, 0.1)
        .to('.group1 image', { scale: (i) => [0.4, 0.2, 0.3][i], x: (i) => [0, 135, 100][i], y: (i) => [90, 24, 124][i], ease: 'back' }, 0.4)
        .to('.group1 image', { duration: 0.01, opacity: 0, stagger: 0.06 }, 1.1)

        .to('#g2_mask circle', { duration: 0.4, attr: { r: "124" }, ease: 'circ' }, 1.3)
        .fromTo('.group2', { scale: 1, transformOrigin: '124 124' }, { duration: 1.5, scale: 0.9, ease: 'none' }, 1.3)
        .to('#g2_mask circle', { duration: 0.3, attr: { cx: (i) => ["+=248", "-=248"][i] }, ease: 'sine.in' }, 2.45)

        .fromTo('.group3', { transformOrigin: '124 124', rotate: -90 }, { duration: 0.9, rotate: 0, ease: 'expo' }, 2.6)
        .fromTo('#g3_mask rect', { transformOrigin: (i) => ['0 124', '124 0', '124 124', '248 124'][i], scale: 0 }, { duration: 0.4, scale: 1, ease: 'expo', stagger: -0.03 }, 2.6)
        .to('.group3', { duration: 0.01, scale: 0 }, 3.7)

        .from('.group4 image', { duration: 0.01, opacity: 0 }, 3.8)
        .fromTo('.group4', { transformOrigin: '83 124', rotate: 15, scale: 0.2 }, { duration: 0.5, rotate: 0, scale: 0.85, ease: 'bounce' }, 3.8)
        .to('.group4 image', { duration: 0.01, opacity: 0 }, 4.7)

        .fromTo('#g5_mask path', { transformOrigin: '124 124', scale: 0 }, { duration: 0.8, scale: 1, ease: 'expo' }, 4.7)
        .fromTo('#g5_mask circle', { transformOrigin: '83 0', scale: 0 }, { scale: 1, ease: 'expo' }, 4.7);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      ref={containerRef}
    >
      <svg id="svg-stage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248 248" className="w-64 h-64">
        <g className="group1">
          <image href="https://assets.codepen.io/16327/flair-2.png" />
          <image href="https://assets.codepen.io/16327/flair-2.png" />
          <image href="https://assets.codepen.io/16327/flair-2.png" />
        </g>

        <g className="group2">
          <image href="https://assets.codepen.io/16327/flair-3.png" mask="url(#g2_mask)" />
        </g>
        <mask id="g2_mask" fill="#fff">
          <circle cx="124" cy="0" r="0" />
          <circle cx="124" cy="248" r="0" />
        </mask>

        <g className="group3">
          <image href="https://assets.codepen.io/16327/flair-4.png" mask="url(#g3_mask)" />
        </g>
        <mask id="g3_mask" fill="#fff">
          <rect x="0" y="0" width="124" height="124" />
          <rect x="124" y="0" width="124" height="124" />
          <rect x="0" y="124" width="124" height="124" />
          <rect x="124" y="124" width="124" height="124" />
        </mask>

        <g className="group4">
          <image href="https://assets.codepen.io/16327/flair-5.png" x="70" />
        </g>

        <g className="group5">
          <image href="https://assets.codepen.io/16327/flair-7.png" mask="url(#g5_mask)" />
        </g>
        <mask id="g5_mask" fill="#fff">
          <path d="M0 248h248L124 0 0 247z" />
          <circle cx="124" cy="83" r="83" />
        </mask>
      </svg>
    </motion.div>
  );
}
