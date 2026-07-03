import { useRef, useLayoutEffect, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import ThreeScene from "./ThreeScene";
import { useParticleExplosion } from "../hooks/useParticleExplosion";

export default function LoginPage({ onBack }: { onBack: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const explode = useParticleExplosion();
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-title", { y: 60, opacity: 0, duration: 1, ease: "power4.out" })
        .from(".hero-sub", { y: 20, opacity: 0, duration: .7 }, "-=.5")
        .from(".stagger", { y: 30, opacity: 0, stagger: .12, duration: .6 }, "-=.3");
      gsap.to(card.current, {
        y: 12,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut"
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const parallax = (e: React.MouseEvent) => {
    if (!card.current) return;
    const x = (e.clientX - window.innerWidth / 2) * 0.02;
    const y = (e.clientY - window.innerHeight / 2) * 0.02;
    gsap.to(card.current, { x, y, duration: .5 });
  };

  const reset = () => gsap.to(card.current, { x: 0, y: 0, duration: .5 });

  const handleLogin = (e: React.MouseEvent) => {
    explode(e.clientX, e.clientY);
    setLoading(true);
    gsap.to(".login-btn", { scale: .96, duration: .15, yoyo: true, repeat: 1 });
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div
      ref={container}
      onMouseMove={parallax}
      onMouseLeave={reset}
      className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-24 -left-24 h-72 w-72 sm:-top-40 sm:-left-40 sm:h-96 sm:w-96 rounded-full bg-cyan-500 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-purple-600 blur-[160px]" />
      </div>

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 relative z-10">

        <div className="flex items-center justify-center p-6 sm:p-8">

          <div
            ref={card}
            className="w-full max-w-xl sm:max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl relative">

            {/* Return Home Button */}
            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-6 left-6 flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md transition hover:border-cyan-400 hover:bg-cyan-500/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Return Home
            </motion.button>

            <div className="pt-12">
              <h1 className="hero-title text-3xl sm:text-4xl font-bold">
                Welcome Back
              </h1>

              <p className="hero-sub mt-2 text-gray-400">
                Access your AI Workspace
              </p>
            </div>

            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => e.preventDefault()}>

              <div className="stagger">
                <label>Email</label>
                <input
                  type="email"
                  className="mt-2 w-full rounded-xl border border-gray-700 bg-black/30 p-4 outline-none transition focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,.6)]"
                  placeholder="Enter email" />
              </div>

              <div className="stagger">
                <label>Password</label>
                <input
                  type="password"
                  className="mt-2 w-full rounded-xl border border-gray-700 bg-black/30 p-4 outline-none transition focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,.6)]"
                  placeholder="Password" />
              </div>

              <div className="stagger flex justify-between text-sm">
                <label className="flex gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>
                <a className="text-cyan-400 cursor-pointer">Forgot Password?</a>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: .98 }}
                onClick={handleLogin}
                className="login-btn stagger w-full rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 p-4 font-bold">
                {loading ? "Authenticating..." : "LOGIN"}
              </motion.button>

            </form>

            <div className="stagger my-6 text-center text-gray-500">OR</div>

            <div className="space-y-3">
              <button className="stagger w-full rounded-xl border border-gray-700 bg-black/30 p-4 hover:bg-white/10">
                Continue with Google
              </button>

              <button className="stagger w-full rounded-xl border border-gray-700 bg-black/30 p-4 hover:bg-white/10">
                Continue with GitHub
              </button>
            </div>

            <div className="stagger mt-6 text-center">
              Don't have an account?
              <button
                onClick={onBack}
                className="ml-2 text-cyan-400">
                Create Account
              </button>
            </div>

          </div>

        </div>

        <div className="hidden md:block relative">
          <ThreeScene />
        </div>

      </div>

    </div>
  );
}