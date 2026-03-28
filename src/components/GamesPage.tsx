import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dices, X, Sparkles, Gamepad2 } from 'lucide-react';
import { GAMES, Game, ScoreSection, ChallengeGroup } from '../gamesData';
import { useLocalStorage } from '../hooks/useLocalStorage';

// ── Score table ──────────────────────────────────────────────────────────────

const ScoreTable = ({ sections }: { sections: ScoreSection[] }) => {
  if (sections.length === 0) return null;
  return (
    <div className="space-y-4">
      {sections.map((section, si) => (
        <div key={si}>
          {section.heading && (
            <p className="text-[10px] font-black text-pink-400/60 uppercase tracking-widest mb-2">
              {section.heading}
            </p>
          )}
          <div className="rounded-2xl overflow-hidden border border-white/5">
            {section.rows.map((row, ri) => (
              <div
                key={ri}
                className={`flex items-center justify-between px-4 py-2.5 text-sm font-bold gap-4 ${
                  ri % 2 === 0 ? 'bg-white/[0.03]' : 'bg-transparent'
                }`}
              >
                <span className={row.highlight ? 'text-white' : 'text-zinc-400'}>
                  {row.label}
                </span>
                <span
                  className={`font-black tabular-nums ${
                    row.highlight ? 'text-yellow-400' : row.negative ? 'text-red-400' : 'text-zinc-300'
                  }`}
                >
                  {typeof row.aura === 'number'
                    ? `${row.aura > 0 ? '+' : ''}${row.aura} aura`
                    : row.aura}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Mystery / revealed tile ───────────────────────────────────────────────────

const GameTile = ({
  game,
  revealed,
  onClick,
}: {
  game: Game;
  revealed: boolean;
  onClick: () => void;
}) => (
  <motion.div
    layout
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`relative aspect-[3/4] rounded-3xl p-3 cursor-pointer overflow-hidden transition-all duration-500 ${
      revealed
        ? 'bg-zinc-900 shadow-xl border-4 border-pink-900/50'
        : 'bg-black shadow-2xl border-4 border-zinc-900'
    }`}
  >
    <div className="flex flex-col h-full items-center justify-between text-center gap-2">
      {revealed ? (
        <>
          {/* Emoji display */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-full flex-1 rounded-2xl overflow-hidden shadow-inner bg-zinc-950 min-h-0 flex items-center justify-center"
          >
            {game.image ? (
              <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[5rem] leading-none select-none">{game.emoji}</span>
            )}
          </motion.div>
          {/* Title */}
          <div className="space-y-1">
            <p className="text-[10px] font-black text-pink-400 uppercase tracking-[0.2em]">
              {game.isFinal ? 'Eindspel' : `Spel ${game.id}`}
            </p>
            <h3 className="text-lg font-black text-white leading-tight line-clamp-2">{game.title}</h3>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <Dices className="w-32 h-32 text-black fill-black opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white/20 animate-pulse" />
            </div>
          </div>
          <p className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px]">Mystery Spel</p>
        </div>
      )}
    </div>

    {!revealed && (
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    )}
  </motion.div>
);

const ChallengeGroups = ({ groups }: { groups: ChallengeGroup[] }) => (
  <div className="space-y-4">
    {groups.map((group, gi) => (
      <div key={gi}>
        <p className="text-[10px] font-black text-pink-400/60 uppercase tracking-widest mb-2">
          {group.heading}
        </p>
        <ul className="space-y-2">
          {group.items.map((item, ii) => (
            <li key={ii} className="flex items-start gap-2.5 text-sm text-zinc-300 leading-snug">
              <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-pink-500/70" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

// ── Detail flyout ─────────────────────────────────────────────────────────────

const GameDetailModal = ({
  game,
  onClose,
  onOpenGekkieGame,
}: {
  game: Game;
  onClose: () => void;
  onOpenGekkieGame: () => void;
}) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl"
    />
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 40 }}
      className="relative w-full max-w-6xl max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] bg-zinc-950 rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row border-8 border-pink-900/50"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
      >
        <X className="w-8 h-8 text-white" />
      </button>

      {/* Emoji panel */}
      <div
        className={`flex-shrink-0 w-full md:w-2/5 h-64 md:h-auto relative flex flex-col items-center justify-center gap-4 p-10 ${
          game.isFinal
            ? 'bg-gradient-to-br from-pink-950 to-zinc-900'
            : 'bg-gradient-to-br from-zinc-900 to-zinc-950'
        }`}
      >
        <span className="text-[7rem] leading-none select-none">
          {game.image ? (
            <img src={game.image} alt={game.title} className="w-48 h-48 object-cover rounded-3xl shadow-2xl" />
          ) : (
            game.emoji
          )}
        </span>
        <p className="text-[10px] font-black text-pink-400/60 uppercase tracking-[0.3em]">
          {game.isFinal ? 'Eindspel' : `Spel ${game.id}`}
        </p>
        {game.isFinal && (
          <span className="flex items-center gap-1 text-[9px] font-black text-pink-400 uppercase tracking-widest bg-pink-900/40 px-3 py-1 rounded-full">
            <Sparkles className="w-2.5 h-2.5" /> Final
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Info panel */}
      <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-start gap-6 flex-1 min-h-0 overflow-y-auto">
        <div className="space-y-2">
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-sm font-black text-pink-400 uppercase tracking-[0.3em]"
          >
            {game.isFinal ? 'Eindspel' : `Spel ${game.id}`}
          </motion.p>
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase leading-none"
          >
            {game.title}
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-pink-100/60 font-medium leading-relaxed"
        >
          {game.description}
        </motion.p>

        {game.teamNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="px-4 py-3 bg-zinc-800/60 rounded-2xl border border-white/5"
          >
            <p className="text-[11px] font-black text-yellow-400/80 uppercase tracking-wider">
              {game.teamNote}
            </p>
          </motion.div>
        )}

        {game.challengeGroups && game.challengeGroups.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
          >
            <ChallengeGroups groups={game.challengeGroups} />
          </motion.div>
        )}

        {game.scoreSections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ScoreTable sections={game.scoreSections} />
          </motion.div>
        )}

        {game.id === 1 && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { onClose(); onOpenGekkieGame(); }}
            className="flex items-center justify-center gap-2 py-5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-sm shadow-xl transition-all border border-pink-900/40"
          >
            <Gamepad2 className="w-5 h-5 text-pink-400" />
            Speel de Gekkies
          </motion.button>
        )}

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="mt-auto py-5 bg-pink-500 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-lg shadow-xl shadow-pink-900/30 hover:bg-pink-600 transition-all"
        >
          Sluiten
        </motion.button>
      </div>
    </motion.div>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

export const GamesPage = ({ onOpenGekkieGame }: { onOpenGekkieGame: () => void }) => {
  const [revealedIds, setRevealedIds] = useLocalStorage<number[]>('revealedGameIds', []);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handleTileClick = (game: Game) => {
    if (!revealedIds.includes(game.id)) {
      setRevealedIds(prev => [...prev, game.id]);
    }
    setSelectedGame(game);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight italic">Spellen</h2>
        <p className="text-pink-400/60 text-sm font-bold uppercase tracking-widest mt-1">
          {GAMES.length - 1} spellen + 1 eindspel — klik een tegel om te onthullen
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
        {GAMES.map((game) => (
          <React.Fragment key={game.id}>
            <GameTile
              game={game}
              revealed={revealedIds.includes(game.id)}
              onClick={() => handleTileClick(game)}
            />
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence>
        {selectedGame && (
          <GameDetailModal
            game={selectedGame}
            onClose={() => setSelectedGame(null)}
            onOpenGekkieGame={onOpenGekkieGame}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
