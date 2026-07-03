import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CARDS = [
  { title: 'gsap.to()', x: '5%', y: '8%', r: '-3deg', img: 'https://assets.codepen.io/16327/2D-keyframe.png' },
  { title: 'gsap.from()', x: '28%', y: '2%', r: '2deg', img: 'https://assets.codepen.io/16327/2D-flower.png' },
  { title: 'gsap.fromTo()', x: '55%', y: '5%', r: '-1deg', img: 'https://assets.codepen.io/16327/2D-diamond.png' },
  { title: 'gsap.set()', x: '80%', y: '3%', r: '4deg', img: 'https://assets.codepen.io/16327/2D-circle.png' },
  { title: 'timeline()', x: '12%', y: '32%', r: '2deg', img: 'https://assets.codepen.io/16327/2D-star.png' },
  { title: 'stagger', x: '40%', y: '28%', r: '-4deg', img: 'https://assets.codepen.io/16327/2D-circles.png' },
  { title: 'ScrollTrigger', x: '68%', y: '30%', r: '1deg', img: 'https://assets.codepen.io/16327/2D-sparkle.png' },
  { title: 'ease', x: '3%', y: '58%', r: '-2deg', img: 'https://assets.codepen.io/16327/2D-wobble.png' },
  { title: 'Flip', x: '30%', y: '55%', r: '3deg', img: 'https://assets.codepen.io/16327/3D-hoop.png' },
  { title: 'MotionPath', x: '58%', y: '60%', r: '-3deg', img: 'https://assets.codepen.io/16327/2D-morph.png' },
  { title: 'SplitText', x: '82%', y: '55%', r: '2deg', img: 'https://assets.codepen.io/16327/2D-label.png' },
  { title: 'overwrite', x: '18%', y: '82%', r: '-1deg', img: 'https://assets.codepen.io/16327/2D-lock.png' },
  { title: 'defaults()', x: '48%', y: '85%', r: '3deg', img: 'https://assets.codepen.io/16327/3D-cone.png' },
  { title: 'killTweensOf()', x: '75%', y: '80%', r: '-2deg', img: 'https://assets.codepen.io/16327/2D-windmill.png' },
];

export default function ProximityGrid() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const radius = 200;
  const maxScale = 2.5;
  const dur = 0.35;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const cards = gsap.utils.toArray<HTMLElement>('.proximity-card');

    const onMouseMove = (event: MouseEvent) => {
      const mx = event.clientX;
      const my = event.clientY;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const d = Math.hypot(
          mx - (rect.left + rect.width / 2),
          my - (rect.top + rect.height / 2)
        );

        const p = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0, radius, 1, 0, d)
        );

        gsap.to(card, {
          scale: 1 + (maxScale - 1) * p,
          duration: dur,
          overwrite: true,
          ease: 'power2.out',
        });
      });
    };

    const onMouseLeave = () => {
      cards.forEach((card) => {
        gsap.to(card, {
          scale: 1,
          duration: dur * 2,
          overwrite: true,
          ease: 'power2.out',
        });
      });
    };

    stage.addEventListener('mousemove', onMouseMove);
    stage.addEventListener('mouseleave', onMouseLeave);

    return () => {
      stage.removeEventListener('mousemove', onMouseMove);
      stage.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section className="proximity-grid mt-16">
      <div className="proximity-stage" ref={stageRef}>
        <div className="proximity-grid-layout">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="proximity-card"
              style={{ left: card.x, top: card.y, transform: `rotate(${card.r})` }}
            >
              <div className="proximity-card-icon">
                <img src={card.img} alt="icon" />
              </div>
              <span className="proximity-card-label">DEMO</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
