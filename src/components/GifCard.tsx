import { useState } from 'react';
import { motion } from 'framer-motion';

interface GifCardProps {
  gif: {
    id: number;
    url: string;
    title: string;
    category: string;
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
  delay: number;
}

export default function GifCard({ gif, isFavorite, onToggleFavorite, delay }: GifCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }}
      layout
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg shadow-purple-200/30"
        whileHover={{
          y: -8,
          boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.25)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Sparkle border effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none z-10"
          animate={{
            background: isHovered
              ? 'linear-gradient(135deg, rgba(255,182,193,0.5) 0%, rgba(186,85,211,0.5) 50%, rgba(0,255,255,0.5) 100%)'
              : 'transparent',
            opacity: isHovered ? 1 : 0
          }}
          style={{
            padding: '2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />

        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
          {/* Loading shimmer */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-purple-50 to-pink-100 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="text-4xl"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🐱
                </motion.span>
              </div>
            </div>
          )}

          <img
            src={gif.url}
            alt={gif.title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />

          {/* Hover overlay with sparkles */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Category badge */}
          <div className="absolute top-2 left-2 md:top-3 md:left-3">
            <span className="px-2.5 py-1 md:px-3 md:py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-body font-medium text-purple-600 capitalize shadow-sm">
              {gif.category}
            </span>
          </div>

          {/* Favorite button */}
          <motion.button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
            className="absolute top-2 right-2 md:top-3 md:right-3 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <motion.span
              className="text-xl md:text-2xl"
              animate={isFavorite ? {
                scale: [1, 1.3, 1],
              } : {}}
              transition={{ duration: 0.3 }}
            >
              {isFavorite ? '💖' : '🤍'}
            </motion.span>
          </motion.button>

          {/* Floating sparkles on hover */}
          <AnimatedSparkles isVisible={isHovered} />
        </div>

        {/* Card footer */}
        <div className="p-3 md:p-4 bg-gradient-to-b from-white to-pink-50/50">
          <h3 className="font-body font-semibold text-purple-800 text-sm md:text-base truncate">
            {gif.title}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-purple-400">✨</span>
            <span className="text-xs text-purple-400 font-body">#{gif.id.toString().padStart(3, '0')}</span>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

function AnimatedSparkles({ isVisible }: { isVisible: boolean }) {
  const sparkles = [
    { x: '20%', y: '30%', delay: 0 },
    { x: '70%', y: '20%', delay: 0.1 },
    { x: '80%', y: '60%', delay: 0.2 },
    { x: '30%', y: '70%', delay: 0.15 },
  ];

  return (
    <>
      {sparkles.map((sparkle, i) => (
        <motion.span
          key={i}
          className="absolute text-yellow-300 text-sm pointer-events-none"
          style={{ left: sparkle.x, top: sparkle.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? {
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -20],
          } : { opacity: 0, scale: 0 }}
          transition={{
            duration: 0.8,
            delay: sparkle.delay,
            repeat: isVisible ? Infinity : 0,
            repeatDelay: 0.5
          }}
        >
          ✦
        </motion.span>
      ))}
    </>
  );
}
