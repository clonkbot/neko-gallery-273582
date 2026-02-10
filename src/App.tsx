import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GifCard from './components/GifCard';
import CategoryPill from './components/CategoryPill';
import StarDecoration from './components/StarDecoration';

// Curated cat GIFs from various sources (using placeholder URLs that work)
const catGifs = [
  { id: 1, url: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif', title: 'Keyboard Cat', category: 'classic' },
  { id: 2, url: 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif', title: 'Nyan Cat Energy', category: 'meme' },
  { id: 3, url: 'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif', title: 'Cat Computing', category: 'work' },
  { id: 4, url: 'https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif', title: 'Laser Focus', category: 'hunting' },
  { id: 5, url: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif', title: 'Sleepy Boi', category: 'sleepy' },
  { id: 6, url: 'https://media.giphy.com/media/BzyTuYCmvSORqs1ABM/giphy.gif', title: 'Dance Mode', category: 'meme' },
  { id: 7, url: 'https://media.giphy.com/media/nR4L10XlJcSeQ/giphy.gif', title: 'Box Life', category: 'classic' },
  { id: 8, url: 'https://media.giphy.com/media/o0vwzuFwCGAFO/giphy.gif', title: 'Surprise!', category: 'hunting' },
  { id: 9, url: 'https://media.giphy.com/media/GeimqsH0TLDt4tScGw/giphy.gif', title: 'Big Stretch', category: 'sleepy' },
  { id: 10, url: 'https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif', title: 'Working Hard', category: 'work' },
  { id: 11, url: 'https://media.giphy.com/media/xT0BKk9aPtLzKJiUi4/giphy.gif', title: 'Mind Blown', category: 'meme' },
  { id: 12, url: 'https://media.giphy.com/media/l4pTfx2qLszoacZRS/giphy.gif', title: 'Paw Power', category: 'classic' },
];

const categories = ['all', 'classic', 'meme', 'work', 'sleepy', 'hunting'];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('catgif-favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev => {
      const newFavs = prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id];
      localStorage.setItem('catgif-favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  }, []);

  const filteredGifs = catGifs.filter(gif => {
    const categoryMatch = selectedCategory === 'all' || gif.category === selectedCategory;
    const favMatch = !showFavoritesOnly || favorites.includes(gif.id);
    return categoryMatch && favMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 relative overflow-hidden">
      {/* Floating decorations */}
      <StarDecoration className="top-10 left-[5%] text-yellow-300" size={24} delay={0} />
      <StarDecoration className="top-32 right-[10%] text-pink-300" size={32} delay={0.5} />
      <StarDecoration className="top-[40%] left-[3%] text-cyan-300" size={20} delay={1} />
      <StarDecoration className="top-[60%] right-[5%] text-purple-300" size={28} delay={1.5} />
      <StarDecoration className="bottom-32 left-[15%] text-yellow-200" size={22} delay={2} />

      {/* Background blob decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-200/40 to-purple-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-200/40 to-blue-200/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 px-4 py-8 md:px-8 lg:px-12 max-w-7xl mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block"
            animate={{ rotate: [0, -3, 3, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-sm">
              Neko Gallery
            </h1>
          </motion.div>
          <motion.p
            className="font-body text-base md:text-lg text-purple-600/80 mt-3 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ✧ Your daily dose of feline magic ✧
          </motion.p>

          {/* Favorites toggle */}
          <motion.button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`mt-4 px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300 ${
              showFavoritesOnly
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg shadow-pink-200'
                : 'bg-white/60 text-purple-600 hover:bg-white/80 border-2 border-purple-200/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showFavoritesOnly ? '♥ Showing Favorites' : '♡ Show Favorites'} ({favorites.length})
          </motion.button>
        </motion.header>

        {/* Category Pills */}
        <motion.nav
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {categories.map((cat, idx) => (
            <CategoryPill
              key={cat}
              category={cat}
              isActive={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              delay={idx * 0.05}
            />
          ))}
        </motion.nav>

        {/* GIF Grid */}
        <motion.main
          className="flex-grow"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredGifs.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                layout
              >
                {filteredGifs.map((gif, idx) => (
                  <GifCard
                    key={gif.id}
                    gif={gif}
                    isFavorite={favorites.includes(gif.id)}
                    onToggleFavorite={() => toggleFavorite(gif.id)}
                    delay={idx * 0.08}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-6xl mb-4">😿</div>
                <p className="font-body text-purple-500 text-lg">No cats found in this dimension...</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setShowFavoritesOnly(false); }}
                  className="mt-4 px-6 py-2 bg-purple-100 hover:bg-purple-200 rounded-full text-purple-600 font-body transition-colors"
                >
                  Show all cats
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>

        {/* Footer */}
        <motion.footer
          className="mt-12 md:mt-16 pt-6 border-t border-purple-200/30 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="font-body text-xs text-purple-400/60 tracking-wide">
            Requested by @orzxh97 · Built by @clonkbot
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
