import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Team } from '../types';

export const AuraTube = ({ team, maxAura, isAdding }: { team: Team; maxAura: number; isAdding?: boolean }) => {
  const percentage = Math.min((team.aura / maxAura) * 100, 100);
  const teamColorClass = team.id === 1 ? 'text-yellow-400' : 'text-orange-500';
  const teamBorderClass = team.id === 1 ? 'border-yellow-900/50' : 'border-orange-900/50';
  const teamAuraGradient = team.id === 1 ? 'from-yellow-400 to-yellow-600' : 'from-orange-400 to-orange-600';
  const teamLabelColor = team.id === 1 ? 'text-yellow-500/60' : 'text-orange-500/60';

  return (
    <div className="flex flex-col items-center gap-4 h-full relative">
      <h2 className={`text-4xl font-black ${teamColorClass} drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] uppercase tracking-tighter italic`}>
        {team.name}
      </h2>
      <div className="relative w-24 h-[60vh] bg-zinc-900/50 backdrop-blur-md border-4 border-white/10 rounded-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Glass Reflection */}
        <div className="absolute inset-y-0 left-2 w-2 bg-white/10 rounded-full z-20" />

        {/* Moving Shine Effect */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
            opacity: [0, 0.1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: 2,
          }}
          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 z-40 pointer-events-none"
        />

        {/* Aura Liquid Container */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          className="absolute bottom-0 left-0 right-0 overflow-hidden"
        >
          {/* Fixed-size Gradient Background */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[60vh] animate-aura-flow"
            style={{
              background:
                'linear-gradient(to top, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #a855f7, #ec4899, #ef4444)',
              backgroundSize: '100% 50%',
              backgroundRepeat: 'repeat-y',
            }}
          />

          {/* Bubbles */}
          <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ bottom: '-5%', opacity: 0 }}
                animate={{
                  bottom: '105%',
                  opacity: [0, 1, 1, 0],
                  x: Math.sin(i) * 15,
                }}
                transition={{
                  duration: 3 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 10,
                  ease: 'linear',
                }}
                className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
                style={{ left: `${Math.random() * 80 + 10}%` }}
              />
            ))}
          </div>
        </motion.div>

        {/* Aura Glow */}
        <AnimatePresence>
          {percentage > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 pointer-events-none z-30"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8), transparent 90%)',
                filter: 'blur(16px)',
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Sprinkle Burst Effect */}
      <AnimatePresence>
        {isAdding && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1.5, 0],
                  x: (Math.random() - 0.5) * 300,
                  y: (Math.random() - 0.5) * 600,
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute text-2xl"
              >
                {['✨', '💖', '🔥', '👑', '💎', '🌈', '🗿', '🥶'][i % 8]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className={`bg-zinc-900/90 px-4 py-2 rounded-2xl shadow-lg border-2 ${teamBorderClass}`}>
        <span className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${teamAuraGradient}`}>
          {team.aura}
        </span>
        <span className={`ml-1 text-sm font-bold ${teamLabelColor} uppercase tracking-widest`}>Aura</span>
      </div>
    </div>
  );
};

