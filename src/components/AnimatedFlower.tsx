import { motion } from "motion/react";

export default function AnimatedFlower() {
  return (
    <motion.div
      className="inline-block"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
    >
      <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#f59e0b", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#ec4899", stopOpacity:1}} />
          </linearGradient>
        </defs>
        <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 9 9.5 11 12 11C14.5 11 16.5 9 16.5 6.5C16.5 4 14.5 2 12 2Z" fill="url(#grad1)"/>
        <path d="M2 12C2 9.5 4 7.5 6.5 7.5C9 7.5 11 9.5 11 12C11 14.5 9 16.5 6.5 16.5C4 16.5 2 14.5 2 12Z" fill="url(#grad1)"/>
        <path d="M12 22C14.5 22 16.5 20 16.5 17.5C16.5 15 14.5 13 12 13C9.5 13 7.5 15 7.5 17.5C7.5 20 9.5 22 12 22Z" fill="url(#grad1)"/>
        <path d="M22 12C22 14.5 20 16.5 17.5 16.5C15 16.5 13 14.5 13 12C13 9.5 15 7.5 17.5 7.5C20 7.5 22 9.5 22 12Z" fill="url(#grad1)"/>
      </svg>
    </motion.div>
  );
}
