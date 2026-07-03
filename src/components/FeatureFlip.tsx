import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

export default function FeatureFlip() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const windowRef = useRef<HTMLDivElement | null>(null);
  const finalRef = useRef<HTMLDivElement | null>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, { opacity: 1, scale: 1, rotateZ: 0 });
  }, []);

  const toggleFlip = () => {
    const card = cardRef.current;
    const windowEl = windowRef.current;
    const finalEl = finalRef.current;
    if (!card || !windowEl || !finalEl) return;

    const state = Flip.getState(card);
    const target = flipped ? windowEl : finalEl;
    target.appendChild(card);

    Flip.from(state, {
      duration: 0.75,
      ease: 'power2.inOut',
      scale: true,
      absolute: true,
    });

    setFlipped(!flipped);
  };

  return (
    <section className="flip-demo feature-section px-6 md:px-12 py-10">
      <div className="max-w-[1200px] mx-auto rounded-[30px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_80px_rgba(0,0,0,0.4)] backdrop-blur-lg">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-6">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Landing feature</div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Interactive layout motion powered by Flip.
            </h2>
            <p className="max-w-xl text-gray-300 leading-relaxed">
              Tap the card to move it between two frames and feel the layout transform with a clean Flip transition.
            </p>
            <button
              type="button"
              className="px-8 py-3 rounded-full bg-cyan-500 text-black font-semibold uppercase tracking-wider shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transition"
              onClick={toggleFlip}
            >
              {flipped ? 'Move back' : 'Show flow'}
            </button>
          </div>

          <div className="flip-panel relative rounded-[26px] border border-white/10 bg-zinc-950/70 p-6 min-h-[340px] overflow-hidden">
            <div className="flip-frame frame-start" ref={windowRef}>
              <div className="flip-slot initialPosition">Start</div>
              <div ref={cardRef} className="flip-card gradient-blue cursor-pointer" onClick={toggleFlip}>
                Tap
              </div>
            </div>
            <div className="flip-frame frame-end" ref={finalRef}>
              <div className="flip-slot finalPosition">End</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
