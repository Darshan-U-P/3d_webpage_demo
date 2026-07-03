/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useState, useEffect, useRef, type MouseEvent as ReactMouseEvent} from 'react';
import LoadingScreen from './components/LoadingScreen';
import ThreeScene from './components/ThreeScene';
import CustomCursor from './components/CustomCursor';
import AnimatedFlower from './components/AnimatedFlower';
import LoginPage from './components/LoginPage';
import AnimatedPage from './components/AnimatedPage';
import Dock from './components/Dock';
import Footer from './components/Footer';
import FeatureFlip from './components/FeatureFlip';
import ProximityGrid from './components/ProximityGrid';
import {useParticleExplosion} from './hooks/useParticleExplosion';
import {AnimatePresence, motion} from 'motion/react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {Observer} from 'gsap/Observer';
import {Physics2DPlugin} from 'gsap/Physics2DPlugin';

gsap.registerPlugin(ScrollTrigger, Observer, Physics2DPlugin);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'landing' | 'login' | 'animated'>('landing');
  const explode = useParticleExplosion();

  const subRef = useRef<HTMLParagraphElement | null>(null);
  const btnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline();
      tl.from(".hero-title .line .char", {
        rotationX: -90,
        yPercent: 50,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.5)",
        stagger: 0.05,
      })
      .from(subRef.current, { y: 30, opacity: 0, duration: 1, ease: 'power4.out' }, '-=0.7')
      .from(btnRef.current, { y: 25, opacity: 0, stagger: 0.15, duration: 0.7, ease: "back.out(1.5)" }, '-=0.5');
    }
  }, [loading]);

  const splitText = (text: string) =>
    text.split('').map((char, index) => (
      <span key={index} className="inline-block char transform-3d">
        {char}
      </span>
    ));

  useEffect(() => {
    const btnContainer = btnRef.current;
    if (!btnContainer) return;
    
    const buttons = btnContainer.querySelectorAll<HTMLButtonElement>('button');

    const handlers: {el: HTMLButtonElement, move: EventListener, leave: EventListener}[] = [];

    buttons.forEach((buttonEl) => {
      const onMouseMove: EventListener = (event) => {
        const e = event as MouseEvent;
        const target = e.currentTarget as HTMLElement;
        const { x, y } = target.getBoundingClientRect();
        const nx = (e.clientX - x - target.offsetWidth / 2) / 3;
        const ny = (e.clientY - y - target.offsetHeight / 2) / 3;

        gsap.to(target, { x: nx, y: ny, duration: 0.3, ease: 'power2.out' });
      };

      const onMouseLeave: EventListener = () => {
         gsap.to(buttonEl, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
      };

      buttonEl.addEventListener('mousemove', onMouseMove);
      buttonEl.addEventListener('mouseleave', onMouseLeave);
      handlers.push({el: buttonEl, move: onMouseMove, leave: onMouseLeave});
    });

    return () => {
        handlers.forEach(h => {
            h.el.removeEventListener('mousemove', h.move);
            h.el.removeEventListener('mouseleave', h.leave);
        });
    }
  }, [view]);

  return (
    <div className="bg-[#050505] text-white min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px]"></div>
      </div>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      
      {view === 'landing' ? (
      <>
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12 pt-32 pb-32 min-h-screen items-center relative z-10">
          <div className="space-y-8">
            <h1 className="hero-title text-[40px] md:text-[80px] font-medium leading-[1.2] tracking-tighter text-[#f5f5dc]">
            <div className="line overflow-hidden mb-6">
              <span className="block"><AnimatedFlower /></span>
            </div>
            <div className="line overflow-hidden mb-2 perspective-[1000px]">
              <span className="animate-rainbow inline-block">
                {splitText('Demo')}
              </span>
            </div>
            <div className="line overflow-hidden mb-2 perspective-[1000px]">
              <span className="animate-rainbow inline-block">
                {splitText('Animation')}
              </span>
            </div>
          </h1>
          <div className="overflow-hidden">
            <p ref={subRef} className="text-gray-400 text-sm max-w-[360px] leading-relaxed">
              Beautiful animations using React, GSAP and Three.js. 
              Build immersive websites with premium motion, cinematic effects and interactive 3D experiences.
            </p>
          </div>
          <div ref={btnRef} className="flex flex-col sm:flex-row gap-4 pt-4 z-20 relative">
            <motion.button 
              className="px-8 py-3 bg-cyan-500 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              whileHover={{scale: 1.1}}
              whileTap={{scale: 0.95}}
              onClick={(e: ReactMouseEvent<HTMLButtonElement>) => {
                explode(e.clientX, e.clientY);
                setView('login');
              }}
            >
              Login
            </motion.button>
            <motion.button 
              className="px-8 py-3 bg-cyan-500 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              whileHover={{scale: 1.1}}
              whileTap={{scale: 0.95}}
              onClick={(e: ReactMouseEvent<HTMLButtonElement>) => {
                explode(e.clientX, e.clientY);
                setView('animated');
              }}
            >
              Next Page Animated Page
            </motion.button>
          </div>
        </div>
        
        <div className="h-[300px] md:h-[500px] w-full">
          <ThreeScene />
        </div>
        <Dock />
      </main>
      <ProximityGrid />
      <FeatureFlip />
      <Footer />
      </>
      ) : view === 'login' ? (
        <LoginPage onBack={() => setView('landing')} />
      ) : (
        <AnimatedPage onBack={() => setView('landing')} />
      )}
    </div>
  );
}
