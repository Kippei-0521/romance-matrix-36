"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizComponent from '../components/QuizComponent';
import { Heart, Grid } from 'lucide-react';
import { personalityTypes, X_AXES, Y_AXES } from '../lib/quizData';

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative bg-[#fff5f7]">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-pink-200 floating"><Heart size={40} fill="currentColor" /></div>
      <div className="absolute bottom-20 right-10 text-pink-200 floating" style={{ animationDelay: '1s' }}><Heart size={30} fill="currentColor" /></div>
      <div className="absolute top-1/2 right-10 text-blue-200 floating" style={{ animationDelay: '2s' }}><Heart size={20} fill="currentColor" /></div>

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl flex flex-col items-center z-10 py-20"
          >
            <div className="text-center mb-16">
              <div className="mb-8 relative inline-block">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-white p-6 rounded-full shadow-2xl shadow-pink-100"
                >
                  <Heart size={64} className="text-pink-500" fill="#ff85a1" />
                </motion.div>
              </div>

              <h1 className="text-5xl font-black text-gray-800 mb-6 tracking-tight">
                恋愛における<br />
                <span className="text-pink-500">36タイプ</span>診断
              </h1>
              <p className="text-gray-500 mb-10 max-w-xs mx-auto leading-relaxed text-sm">
                あなたの深層心理を「価値軸 × 行動軸」のマトリックスで解き明かします。
              </p>

              <button
                onClick={() => setStarted(true)}
                className="btn-primary text-xl px-12"
              >
                診断をスタートして自分のタイプを知る
              </button>
            </div>

            {/* Matrix Preview Table */}
            <div className="w-full bg-white/40 backdrop-blur-sm p-6 rounded-[40px] border border-white/60 shadow-inner overflow-x-auto">
              <div className="flex items-center gap-2 mb-6 px-4">
                <Grid size={18} className="text-pink-400" />
                <h3 className="font-black text-gray-700 uppercase tracking-widest text-xs">Personality Matrix Preview</h3>
              </div>

              <div className="min-w-[500px]">
                <table className="w-full border-separate border-spacing-2">
                  <thead>
                    <tr>
                      <th className="w-16"></th>
                      {X_AXES.map(x => (
                        <th key={x} className="text-[10px] font-black text-gray-400 uppercase pb-2">{x}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Y_AXES.map(y => (
                      <tr key={y}>
                        <td className="text-[10px] font-black text-gray-400 uppercase text-right pr-2">{y}</td>
                        {X_AXES.map(x => {
                          const id = `${x.toLowerCase()}-${y.toLowerCase()}`;
                          const type = personalityTypes[id];
                          return (
                            <td key={id} className="p-1">
                              <div
                                className="h-10 rounded-xl flex items-center justify-center text-lg shadow-sm border border-white/50"
                                style={{ backgroundColor: `${type.color}33` }}
                                title={type.name}
                              >
                                {type.emoji}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-center text-[10px] text-gray-400 mt-6 font-medium">合計36の恋愛スタイル。あなたはどこに位置する？</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex justify-center"
          >
            <QuizComponent />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
