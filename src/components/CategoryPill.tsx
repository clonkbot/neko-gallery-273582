import { motion } from 'framer-motion';

interface CategoryPillProps {
  category: string;
  isActive: boolean;
  onClick: () => void;
  delay: number;
}

const categoryEmojis: Record<string, string> = {
  all: '🌟',
  classic: '📼',
  meme: '🎭',
  work: '💻',
  sleepy: '😴',
  hunting: '🎯',
};

export default function CategoryPill({ category, isActive, onClick, delay }: CategoryPillProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-4 py-2.5 md:px-5 md:py-3 rounded-full font-body text-sm md:text-base font-medium transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-white shadow-lg shadow-purple-300/40'
          : 'bg-white/70 text-purple-600 hover:bg-white hover:shadow-md border border-purple-100/50'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="flex items-center gap-1.5 md:gap-2">
        <span>{categoryEmojis[category] || '✨'}</span>
        <span className="capitalize">{category}</span>
      </span>

      {/* Active indicator ring */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/50"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          layoutId="activePill"
        />
      )}
    </motion.button>
  );
}
