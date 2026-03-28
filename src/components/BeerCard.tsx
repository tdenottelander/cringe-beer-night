import React from 'react';
import { motion } from 'motion/react';
import { Beer as BeerIcon, Sparkles } from 'lucide-react';
import { Beer } from '../types';

export const BeerCard = ({ beer, onReveal }: { beer: Beer; onReveal: (id: number) => void; key?: React.Key }) => {
  const isMystery = beer.mystery && !beer.revealed;

  return (
    <motion.div
      layout
      key={beer.id}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onReveal(beer.id)}
      className={`relative aspect-[3/4] rounded-3xl p-3 cursor-pointer overflow-hidden transition-all duration-500 ${
        beer.revealed
          ? 'bg-zinc-900 shadow-xl border-4 border-pink-900/50'
          : isMystery
          ? 'bg-gradient-to-br from-[#1a0035] to-black shadow-2xl border-4 border-purple-700/60'
          : 'bg-black shadow-2xl border-4 border-zinc-900'
      }`}
    >
      {/* Purple glow for mystery tile */}
      {isMystery && (
        <>
          <div className="absolute inset-0 bg-purple-900/20 blur-xl pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-purple-600/10 to-transparent pointer-events-none" />
        </>
      )}

      <div className="flex flex-col h-full items-center justify-between text-center gap-2">
        {beer.revealed ? (
          <>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="w-full flex-1 rounded-2xl overflow-hidden shadow-inner bg-zinc-950 min-h-0"
            >
              {beer.imageUrl ? (
                <img
                  src={beer.imageUrl}
                  alt={beer.name}
                  className="w-full h-full object-contain p-2 brightness-90"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-600 to-orange-700">
                  <BeerIcon className="w-12 h-12 text-white/80" />
                </div>
              )}
            </motion.div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-white leading-tight line-clamp-2">{beer.name}</h3>
              <p className="text-[10px] font-bold text-pink-400 uppercase tracking-wider truncate w-full">{beer.brewery}</p>
              <div className="inline-block px-2 py-0.5 bg-zinc-800 rounded-full text-[8px] font-black text-zinc-400 uppercase tracking-widest">
                {beer.style}
              </div>
            </div>
          </>
        ) : isMystery ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 relative z-10">
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-6xl leading-none select-none"
            >
              ?
            </motion.div>
            <p className="text-purple-300/80 font-black uppercase tracking-[0.3em] text-[10px]">
              ??? Mystery ???
            </p>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  className="w-1.5 h-1.5 rounded-full bg-purple-400"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <BeerIcon className="w-32 h-32 text-black fill-black opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white/20 animate-pulse" />
              </div>
            </div>
            <p className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px]">Mystery Brew</p>
          </div>
        )}
      </div>

      {!beer.revealed && !isMystery && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      )}
      {isMystery && (
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 to-transparent pointer-events-none" />
      )}
    </motion.div>
  );
};
