/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Beer as BeerIcon, Trophy, X, Plus, Sparkles, Dices, RotateCcw } from 'lucide-react';
import { BEERS, CRINGE_MEMES, AURA_SOUNDS } from './constants';
import { GEKKIE_GAME_DATA } from './gekkieGameData';
import { Beer, Team } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AuraTube } from './components/AuraTube';
import { BeerCard } from './components/BeerCard';
import { GekkieGame } from './components/GekkieGame';
import { GamesPage } from './components/GamesPage';

export default function App() {
  const [view, setView] = useLocalStorage<'dashboard' | 'gallery' | 'gekkie-game' | 'spellen'>('view', 'dashboard');
  const [teams, setTeams] = useLocalStorage<Team[]>('teams', [
    { id: 1, name: 'Team Skibidi', aura: 0 },
    { id: 2, name: 'Team Sigma', aura: 0 },
  ]);
  const [beers, setBeers] = useLocalStorage<Beer[]>('beers', BEERS);
  const [memeIndex, setMemeIndex] = useLocalStorage<number>('memeIndex', 0);
  const [gekkieCompletedIds, setGekkieCompletedIds] = useLocalStorage<number[]>('gekkieCompletedIds', []);
  const [gekkieKey, setGekkieKey] = useState(0);

  const [showAddAura, setShowAddAura] = useState<number | null>(null);
  const [auraInput, setAuraInput] = useState('');
  const [selectedBeer, setSelectedBeer] = useState<Beer | null>(null);

  const rotateMeme = () => {
    setMemeIndex(prev => {
      let next;
      do {
        next = Math.floor(Math.random() * CRINGE_MEMES.length);
      } while (next === prev && CRINGE_MEMES.length > 1);
      return next;
    });
  };

  useEffect(() => {
    const interval = setInterval(rotateMeme, 10000);
    return () => clearInterval(interval);
  }, []);

  const maxTeamAura = Math.max(...teams.map(t => t.aura));
  const maxAura = Math.max(1000, maxTeamAura + 200);

  const playSoundByUrl = (url: string) => {
    const audio = new Audio(url);
    audio.volume = 0.5;
    audio.play().catch(e => {
      console.warn(`Audio play failed for ${url}:`, e.message);
    });
  }

  const playSound = () => {
    const url = AURA_SOUNDS[Math.floor(Math.random() * AURA_SOUNDS.length)];

    playSoundByUrl(url)
  };

  const [addingAuraTo, setAddingAuraTo] = useState<number | null>(null);

  const handleAddAura = (teamId: number) => {
    const amount = parseInt(auraInput);
    if (isNaN(amount)) return;

    setTeams(prev => prev.map(t => 
      t.id === teamId ? { ...t, aura: t.aura + amount } : t
    ));
    
    // Trigger sprinkles
    setAddingAuraTo(teamId);
    setTimeout(() => setAddingAuraTo(null), 1000);

    playSound();
    setAuraInput('');
    setShowAddAura(null);
  };

  const [isRevealing, setIsRevealing] = useState(false);

  const handleRevealBeer = (id: number) => {
    if (isRevealing) return;
    
    const beer = beers.find(b => b.id === id);
    if (!beer) return;

    if (!beer.revealed) {
      setIsRevealing(true);
      playSound();
      
      const updatedBeer = { ...beer, revealed: true };
      setBeers(prev => prev.map(b => b.id === id ? updatedBeer : b));
      setSelectedBeer(updatedBeer);
      
      // Reset guard after a short delay
      setTimeout(() => setIsRevealing(false), 500);
    } else {
      setSelectedBeer(beer);
    }
  };

  const handleReset = () => {
    if (!window.confirm('Reset all progress? This clears aura scores, beer reveals and gekkie progress.')) return;
    setView('dashboard');
    setTeams([
      { id: 1, name: 'Team Skibidi', aura: 0 },
      { id: 2, name: 'Team Sigma', aura: 0 },
    ]);
    setBeers(BEERS);
    setMemeIndex(0);
    setGekkieCompletedIds([]);
    setGekkieKey(k => k + 1);
    localStorage.removeItem('revealedGameIds');
  };

  return (
    <div className="min-h-screen bg-[#3d0a28] font-sans selection:bg-pink-900/30 overflow-x-hidden text-white">
      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-700/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-800/30 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[35%] h-[35%] bg-pink-500/20 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-3"
        >
          <div className="p-3 bg-white rounded-2xl shadow-lg border-2 border-pink-100">
            <Trophy className="w-8 h-8 text-pink-500" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tighter italic uppercase leading-none">
              67 Rizzler sh0rtking <span className="text-pink-400">CRiNGE</span> Bieravont
            </h1>
            <p className="text-[10px] font-bold text-pink-200/60 uppercase tracking-widest">Tastery Night 2026</p>
          </div>
        </motion.div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('dashboard')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-colors ${view === 'dashboard' ? 'bg-pink-600 text-white' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}
          >
            Dashboard
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('gallery')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-colors ${view === 'gallery' ? 'bg-pink-600 text-white' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}
          >
            <BeerIcon className="w-4 h-4" /> Beer Menu
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('spellen')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-colors ${view === 'spellen' ? 'bg-pink-600 text-white' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}
          >
            <Dices className="w-4 h-4" /> Spellen
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-colors bg-zinc-900 text-red-500 hover:bg-red-950 border border-red-900/40"
            title="Reset all progress"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>
      </header>

      {/* Floating Emojis for Cringe Vibe */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '110vh', x: `${Math.random() * 100}vw`, rotate: 0 }}
            animate={{ 
              y: '-10vh', 
              rotate: 360,
              x: `${Math.random() * 100}vw`
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute text-4xl"
          >
            {['💀', '🤡', '🔥', '👑', '🗿', '💅', '✨', '🥶', '💩', '👩‍🦼', '🫃🏻', '🇷🇺'][i % 12]}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto p-6 min-h-[calc(100vh-120px)] flex flex-col">
        <AnimatePresence mode="wait">
          {view === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center gap-8"
            >
              <div className="w-full flex justify-between items-center gap-8 px-12">
                <AuraTube team={teams[0]} maxAura={maxAura} isAdding={addingAuraTo === 1} />
                
                <div className="flex flex-col items-center gap-8">
                  <div className="relative group">
                    <motion.div
                      onClick={rotateMeme}
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0],
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="w-48 h-48 bg-zinc-900 rounded-full shadow-2xl border-8 border-pink-900/50 relative z-10 overflow-hidden cursor-pointer active:scale-95 transition-transform"
                    >
                      <AnimatePresence mode="popLayout">
                        <motion.img
                          key={memeIndex}
                          src={CRINGE_MEMES[memeIndex]}
                          alt="Cringe Meme"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8 }}
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                          referrerPolicy="no-referrer"
                        />
                      </AnimatePresence>
                    </motion.div>
                    <div className="absolute inset-0 bg-pink-400 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  </div>

                  <div className="flex flex-col gap-4">
                    {teams.map(team => (
                      <button
                        key={team.id}
                        onClick={() => setShowAddAura(team.id)}
                        className={`group flex items-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 rounded-3xl shadow-lg border-2 ${team.id === 1 ? 'border-yellow-900/50' : 'border-orange-900/50'} transition-all`}
                      >
                        <Plus className={`w-5 h-5 ${team.id === 1 ? 'text-yellow-500' : 'text-orange-500'} group-hover:rotate-90 transition-transform`} />
                        <span className={`font-black ${team.id === 1 ? 'text-yellow-100' : 'text-orange-100'} uppercase tracking-widest text-sm`}>
                          Add Aura to {team.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <AuraTube team={teams[1]} maxAura={maxAura} isAdding={addingAuraTo === 2} />
              </div>
            </motion.div>
          ) : view === 'gallery' ? (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12"
            >
              {beers.map(beer => (
                <BeerCard 
                  key={beer.id} 
                  beer={beer} 
                  onReveal={handleRevealBeer} 
                />
              ))}
            </motion.div>
          ) : view === 'spellen' ? (
            <motion.div
              key="spellen"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <GamesPage onOpenGekkieGame={() => setView('gekkie-game')} />
            </motion.div>
          ) : (
            <motion.div
              key="gekkie-game"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GekkieGame
                items={GEKKIE_GAME_DATA}
                completedIds={gekkieCompletedIds}
                onComplete={(id) => setGekkieCompletedIds(prev => [...prev, id])}
                resetCount={gekkieKey}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Add Aura Modal */}
      <AnimatePresence>
        {showAddAura !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddAura(null)}
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative w-full max-w-md bg-zinc-950 rounded-[40px] p-10 shadow-2xl border-4 ${showAddAura === 1 ? 'border-yellow-900/50' : 'border-orange-900/50'}`}
            >
              <button 
                onClick={() => setShowAddAura(null)}
                className="absolute top-6 right-6 p-2 hover:bg-zinc-900 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-zinc-600" />
              </button>

              <div className="text-center space-y-6">
                <div className={`w-20 h-20 ${showAddAura === 1 ? 'bg-yellow-950' : 'bg-orange-950'} rounded-3xl flex items-center justify-center mx-auto`}>
                  <Sparkles className={`w-10 h-10 ${showAddAura === 1 ? 'text-yellow-500' : 'text-orange-500'}`} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                    Farm <span className={showAddAura === 1 ? 'text-yellow-500' : 'text-orange-500'}>Aura</span>
                  </h3>
                  <p className={`text-sm font-bold ${showAddAura === 1 ? 'text-yellow-200/40' : 'text-orange-200/40'} uppercase tracking-widest`}>
                    How much aura did {teams.find(t => t.id === showAddAura)?.name} farm?
                  </p>
                </div>

                <div className="relative">
                  <input
                    autoFocus
                    type="number"
                    value={auraInput}
                    onChange={(e) => setAuraInput(e.target.value)}
                    placeholder="0"
                    className={`w-full text-center text-6xl font-black ${showAddAura === 1 ? 'text-yellow-500 focus:border-yellow-200' : 'text-orange-500 focus:border-orange-200'} bg-zinc-50 rounded-3xl py-8 border-4 border-transparent outline-none transition-all placeholder:text-zinc-200`}
                  />
                </div>

                <button
                  onClick={() => handleAddAura(showAddAura)}
                  className={`w-full py-6 bg-zinc-900 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-lg shadow-xl ${showAddAura === 1 ? 'hover:bg-yellow-900' : 'hover:bg-orange-900'} transition-all active:scale-95`}
                >
                  Farm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Beer Detail Modal */}
      <AnimatePresence>
        {selectedBeer && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBeer(null)}
              className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative w-full max-w-4xl md:h-[600px] bg-zinc-950 rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row border-8 border-pink-900/50"
            >
              <button 
                onClick={() => setSelectedBeer(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
              >
                <X className="w-8 h-8 text-white" />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 h-72 md:h-full bg-zinc-900 relative">
                {selectedBeer.imageUrl ? (
                  <img 
                    src={selectedBeer.imageUrl} 
                    alt={selectedBeer.name} 
                    className="w-full h-full object-contain p-8"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-600 to-orange-800">
                    <BeerIcon className="w-32 h-32 text-white/50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Info Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center gap-6 overflow-y-auto">
                <div className="space-y-2">
                  <motion.p 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm font-black text-pink-400 uppercase tracking-[0.3em]"
                  >
                    {selectedBeer.brewery}
                  </motion.p>
                  <motion.h2 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase leading-none"
                  >
                    {selectedBeer.name}
                  </motion.h2>
                </div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-3"
                >
                  <div className="px-4 py-2 bg-white text-zinc-950 rounded-2xl text-xs font-black uppercase tracking-widest">
                    {selectedBeer.style}
                  </div>
                  <div className="px-4 py-2 bg-pink-900/50 text-pink-400 rounded-2xl text-xs font-black uppercase tracking-widest">
                    Premium Quality
                  </div>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-pink-100/60 font-medium leading-relaxed"
                >
                  {selectedBeer.description}
                </motion.p>

                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedBeer(null)}
                  className="mt-4 py-5 bg-pink-500 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-lg shadow-xl shadow-pink-200 hover:bg-pink-600 transition-all"
                >
                  Back to Menu
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes aura-flow {
          0% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }
        .animate-aura-flow {
          animation: aura-flow 6s linear infinite;
        }
      `}</style>
    </div>
  );
}
