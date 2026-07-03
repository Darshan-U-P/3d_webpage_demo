import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedPage({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageSeq = useRef({ frame: 1 });
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameCount = 300;
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  useEffect(() => {
    let isMounted = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i += 1) {
      const img = new Image();
      img.src = `/assets/male${String(i).padStart(4, '0')}.png`;
      images.push(img);
    }
    imagesRef.current = images;

    const preloadImages = () =>
      Promise.all(
        images.map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete && img.naturalWidth) {
                resolve();
                return;
              }
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }),
        ),
      );

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderImage();
    };

    const renderImage = () => {
      const frame = imageSeq.current.frame;
      const img = imagesRef.current[frame];
      if (!img || !img.naturalWidth) return;
      const canvasEl = context.canvas;
      const hRatio = canvasEl.width / img.width;
      const vRatio = canvasEl.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShiftX = (canvasEl.width - img.width * ratio) / 2;
      const centerShiftY = (canvasEl.height - img.height * ratio) / 2;
      context.clearRect(0, 0, canvasEl.width, canvasEl.height);
      context.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
    };

    const render = () => renderImage();

    const onFirstImageLoad = () => render();
    imagesRef.current[0]?.addEventListener('load', onFirstImageLoad);

    preloadImages().then(() => {
      if (!isMounted) return;
      render();
      resizeCanvas();
    });

    window.addEventListener('resize', resizeCanvas);

    const ctx = gsap.context(() => {
      gsap.to(imageSeq.current, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: '#page > canvas',
          start: 'top top',
          end: '600% top',
          scrub: 0.15,
        },
        onUpdate: render,
      });

      ScrollTrigger.create({
        trigger: '#page > canvas',
        pin: true,
        start: 'top top',
        end: '600% top',
      });

      ['#page1', '#page2', '#page3'].forEach((selector) => {
        ScrollTrigger.create({
          trigger: selector,
          start: 'top top',
          end: 'bottom top',
          pin: true,
        });
      });
    });

    return () => {
      isMounted = false;
      imagesRef.current[0]?.removeEventListener('load', onFirstImageLoad);
      window.removeEventListener('resize', resizeCanvas);
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white" id="main">
      <div className="fixed inset-0 opacity-40 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-72 w-72 sm:-top-40 sm:-left-40 sm:h-96 sm:w-96 rounded-full bg-cyan-500 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-purple-600 blur-[160px]" />
      </div>

      <div id="page" className="relative h-screen w-screen bg-[#f1f1f1] text-black">
        <div id="nav" className="fixed top-0 left-0 right-0 z-50 flex flex-col gap-3 items-start justify-between px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <h3 className="text-lg sm:text-xl font-semibold tracking-[0.2em]"><b>DEMO</b></h3>
          <button onClick={onBack} className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white">{today}</button>
        </div>

        <div id="loop" className="absolute top-[25%] left-0 flex h-[20%] w-full overflow-hidden text-[7vw] sm:text-[5vw] leading-none whitespace-nowrap font-[gilroy] text-black">
          <h1 className="mr-12 animate-marquee font-light">
            <b>DEMO</b> IS THE <b><i>REAL</i></b> <span className="-webkit-text-stroke-[1.2px] text-transparent">STORY</span> IN THE <span><i>METAVERSE.</i></span>
          </h1>
          <h1 className="mr-12 animate-marquee font-light">
            <b>DEMO</b> IS THE <b><i>REAL</i></b> <span className="-webkit-text-stroke-[1.2px] text-transparent">STORY</span> IN THE <span><i>METAVERSE.</i></span>
          </h1>
          <h1 className="animate-marquee font-light">
            <b>DEMO</b> IS THE <b><i>REAL</i></b> <span className="-webkit-text-stroke-[1.2px] text-transparent">STORY</span> IN THE <span><i>METAVERSE.</i></span>
          </h1>
        </div>

        <h3 className="absolute top-[55%] left-4 right-4 text-sm text-gray-500 md:left-5 md:right-auto md:max-w-[42rem]">
          DEMO AIMS TO BE A DECENTRALIZED COMMUNITY THAT CAN <br /> CREATE NEW VALUES AND PROFITS THROUGH PLAY IN THE VIRTUAL <br /> WORLD.
        </h3>
        <h4 className="absolute top-[68%] left-4 right-4 text-sm text-gray-700 md:top-[62%] md:left-[25%] md:right-auto">
          ...SCROLL TO READ
        </h4>
        <canvas ref={canvasRef} className="relative z-10 h-full w-full min-h-[320px] sm:min-h-[420px]" />
      </div>

      <div id="page1" className="relative h-screen w-screen bg-[#f1f1f1] text-black">
        <div id="right-text" className="relative md:absolute md:top-[30%] md:left-[10%] top-[18%] left-4 right-4 md:right-auto max-w-full md:max-w-xl">
          <h3 className="text-gray-500 font-normal">DEMO / KEY WORD</h3>
          <h1 className="mt-4 text-[10vw] sm:text-[7vw] md:text-[4vw] leading-[1.1] font-semibold">HAVE FUN<br />LET'S PLAY<br />JUST BE TOGETHER</h1>
        </div>
        <div id="left-text" className="relative md:absolute md:top-[50%] md:right-[10%] top-[52%] right-4 left-4 md:left-auto text-right md:text-right max-w-full md:max-w-xl">
          <h1 className="text-[10vw] sm:text-[7vw] md:text-[4vw] leading-[1.1] font-semibold">MAKE A STORY<br />TAKE A CHANCE<br />BUILD AND OWNED</h1>
          <h3 className="mt-5 text-gray-500 font-normal">..AND MAINTAIN GOOD HUMANITY</h3>
        </div>
      </div>

      <div id="page2" className="relative h-screen w-screen bg-[#f1f1f1] text-black">
        <div id="text1" className="relative md:absolute md:top-[30%] md:left-[10%] top-[18%] left-4 right-4 md:right-auto max-w-full md:max-w-lg">
          <h3 className="text-gray-500 font-normal">DEMO / HAVE FUN</h3>
          <h1 className="mt-4 text-[11vw] sm:text-[8vw] md:text-[5vw] leading-[1.1] font-semibold">LET'S<br />HAVE FUN<br />TOGETHER</h1>
        </div>
        <div id="text2" className="relative md:absolute md:top-[55%] md:right-[10%] top-[54%] right-4 left-4 md:left-auto text-right md:text-right max-w-full md:max-w-[420px] text-gray-500">
          <p>LET'S HAVE A BLAST! LET'S JUST THROW AWAY AGE, GENDER, REGION,<br />STATUS, ETC., DON'T COMPETE, DON'T FIGHT, COOPERATE AND SHARE<br />WITH EACH OTHER AND ENJOY IT TOGETHER! SO THAT YOU CAN STAND<br />THERE IN THE NOT-TOO-DISTANT FUTURE AND DREAM OF ANOTHER NEW<br />FUTURE</p>
        </div>
      </div>

      <div id="page3" className="relative h-screen w-screen bg-[#f1f1f1] text-black">
        <div id="text3" className="relative md:absolute md:top-[40%] md:right-[10%] top-[30%] right-4 left-4 md:left-auto text-right md:text-right max-w-full md:max-w-[360px]">
          <h3 className="text-gray-500 font-normal">DEMO / PLAYGROUND</h3>
          <h1 className="mt-5 text-[12vw] sm:text-[8vw] md:text-[6vw] leading-[1.05] font-semibold">CYBERFIELD<br />IS OUR<br />PLAYGROUND</h1>
        </div>
      </div>
    </div>
  );
}
