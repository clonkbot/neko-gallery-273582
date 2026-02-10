import { motion } from 'framer-motion';

interface StarDecorationProps {
  className?: string;
  size?: number;
  delay?: number;
}

export default function StarDecoration({ className = '', size = 24, delay = 0 }: StarDecorationProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{
        opacity: [0.4, 0.8, 0.4],
        scale: [0.8, 1, 0.8],
        rotate: [0, 180, 360],
      }}
      transition={{
        delay,
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
    </motion.div>
  );
}
