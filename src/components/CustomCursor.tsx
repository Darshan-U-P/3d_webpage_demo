import {useEffect, useState} from 'react';
import {motion} from 'motion/react';

export default function CustomCursor() {
  const [position, setPosition] = useState({x: 0, y: 0});

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({x: e.clientX, y: e.clientY});
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-cyan-400 pointer-events-none z-[9999] mix-blend-difference"
      animate={{x: position.x - 12, y: position.y - 12}}
      transition={{type: 'spring', damping: 20, stiffness: 300, mass: 0.5}}
    />
  );
}
