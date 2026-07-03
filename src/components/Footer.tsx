export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#02060d]/80 backdrop-blur-xl py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-slate-300">
        <div className="font-medium text-slate-200">Demo Motion Studio</div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
          <span>© 2026</span>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
