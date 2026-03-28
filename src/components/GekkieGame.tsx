import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { GekkieGameItem } from '../types';

export const GekkieGame = ({
  items,
  completedIds,
  onComplete,
  resetCount = 0,
}: {
  items: GekkieGameItem[];
  completedIds: number[];
  onComplete: (id: number) => void;
  resetCount?: number;
}) => {
  const [currentRound, setCurrentRound] = useState<GekkieGameItem[]>([]);
  const [activeItem, setActiveItem] = useState<GekkieGameItem | null>(null);

  const pickRound = (completed: number[]) => {
    const available = items.filter((item) => !completed.includes(item.id));
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };

  // Runs on mount and whenever a reset is triggered
  useEffect(() => {
    setCurrentRound(pickRound(completedIds));
    setActiveItem(null);
  }, [resetCount]);

  const handleNewRound = () => {
    setCurrentRound(pickRound(completedIds));
  };

  const handleMarkCompleted = (id: number) => {
    onComplete(id);
    setActiveItem(null);
  };

  const remainingCount = items.length - completedIds.length;
  const allDone = remainingCount === 0;

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight italic">Gekkie Game</h2>
          <p className="text-pink-400/60 text-sm font-bold uppercase tracking-widest mt-1">
            {remainingCount} gekkies resterend
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNewRound}
          disabled={allDone}
          className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Nieuwe Ronde
        </motion.button>
      </div>

      {allDone ? (
        <div className="text-center py-24 text-zinc-500 font-black uppercase tracking-widest text-2xl">
          Alle gekkies gedaan! 🎉
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentRound.map((item) => {
            const isDone = completedIds.includes(item.id);
            return (
              <motion.div
                key={item.id}
                layout
                whileHover={!isDone ? { scale: 1.05 } : {}}
                whileTap={!isDone ? { scale: 0.95 } : {}}
                onClick={() => !isDone && setActiveItem(item)}
                className={`relative aspect-video rounded-3xl overflow-hidden border-4 ${
                  isDone ? 'border-green-600/50 cursor-default' : 'border-pink-900/50 cursor-pointer'
                } group shadow-2xl`}
              >
                <img
                  src={item.screenshotUrl}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-all ${
                    isDone ? 'brightness-40 grayscale' : 'brightness-75 group-hover:brightness-100'
                  }`}
                  referrerPolicy="no-referrer"
                />
                {isDone ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-green-500/20 backdrop-blur-sm rounded-full p-5">
                      <span className="text-5xl">✅</span>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <Sparkles className="w-12 h-12 text-pink-400" />
                  </div>
                )}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className={`text-sm font-black uppercase tracking-widest ${isDone ? 'text-green-400' : 'text-pink-400'}`}>
                    {item.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Video Preview Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-12"
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setActiveItem(null)}
            />
            <div className="relative w-full max-w-5xl max-h-[90vh] bg-black rounded-[40px] overflow-hidden border-8 border-pink-900/50 shadow-2xl flex flex-col">
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
              >
                <X className="w-8 h-8 text-white" />
              </button>
              <div className="flex-1 min-h-0 overflow-hidden flex items-center justify-center bg-black">
                <video
                  src={activeItem.videoUrl}
                  controls
                  autoPlay
                  className="max-w-full max-h-full object-contain"
                  style={{ display: 'block' }}
                />
              </div>
              <div className="relative z-10 flex-shrink-0 p-6 flex items-center justify-between bg-zinc-950 gap-4">
                <p className="text-xl font-black text-white uppercase tracking-widest truncate">{activeItem.title}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMarkCompleted(activeItem.id)}
                  className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-colors"
                >
                  ✅ Gedaan
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

