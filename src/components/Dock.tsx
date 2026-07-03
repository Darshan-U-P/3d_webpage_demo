import { useRef } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'motion/react';
import { 
  Book, Code, Database, Globe, Layers, Terminal, Github, GitBranch, 
  Box, Cpu, FileCode, Server, Layout, Palette, Settings, Command 
} from 'lucide-react';

const ICONS = [Book, Code, Database, Globe, Layers, Terminal, Github, GitBranch, Box, Cpu, FileCode, Server, Layout, Palette, Settings, Command];

function DockIcon({ mouseX, Icon }: { mouseX: any, Icon: any }) {
  let ref = useRef<HTMLDivElement>(null);
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return (val as number) - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 90, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white shadow-lg"
    >
      <Icon className="w-1/2 h-1/2" />
    </motion.div>
  );
}

export default function Dock() {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto flex h-20 items-center gap-4 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 px-6 fixed top-6 left-1/2 z-50 -translate-x-1/2 w-fit"
    >
      {ICONS.map((Icon, i) => (
        <DockIcon key={i} mouseX={mouseX} Icon={Icon} />
      ))}
    </motion.div>
  );
}
