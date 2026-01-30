"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizComponent from '../components/QuizComponent';
import { Heart, Grid, Sparkles } from 'lucide-react';
import { personalityTypes, X_AXES, Y_AXES } from '../lib/quizData';
import CharacterPortrait from '../components/CharacterPortrait';

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
            className="w-full max-w-6xl flex flex-col items-center z-10 py-12 md:py-20"
          >
            <div className="text-center mb-12 md:mb-16">
              <div className="mb-8 relative inline-block">
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="bg-white p-6 rounded-[40px] shadow-2xl shadow-pink-100 border-2 border-pink-50"
                >
                  <Heart size={72} className="text-pink-500" fill="#ff85a1" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-blue-500 text-white p-2 rounded-2xl shadow-lg"
                >
                  <Grid size={24} />
                </motion.div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-gray-800 mb-6 tracking-tight leading-tight">
                愛の深淵を読み解く<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-400">36タイプ</span>診断
              </h1>

              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-pink-200">所要時間: 約3分</span>
                <span className="bg-white text-gray-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-100">36タイプ分析</span>
                <span className="bg-white text-gray-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-100">完全無料</span>
              </div>

              <p className="text-gray-500 mb-12 max-w-lg mx-auto leading-loose text-[16px] px-4 font-medium">
                あなたの「魂の価値観」と「愛の表現方法」の深淵へ。<br className="hidden md:block" />
                25の直感的な質問が、あなたの恋愛の本質を36通りの回答から解き明かします。
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStarted(true)}
                className="btn-primary text-xl px-16 py-6 group relative overflow-hidden ring-4 ring-pink-100 ring-offset-4 ring-offset-[#fff5f7]"
              >
                <span className="relative z-10">診断を開始して真実を知る</span>
                <motion.div
                  animate={{ x: ['100%', '-100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />
              </motion.button>
            </div>

            {/* How it works */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 w-full px-4">
              {[
                { icon: <Heart size={24} className="text-pink-400" />, title: "25の深層質問", desc: "最新の心理学に基づき、あなたの潜在的な恋愛傾向を抽出。" },
                { icon: <Grid size={24} className="text-blue-400" />, title: "36マトリックス", desc: "価値観と行動パターンの交差が生み出す、独自の36タイプ分析。" },
                { icon: <Sparkles size={24} className="text-purple-400" />, title: "精密な診断書", desc: "強み、課題、相性、そして未来へのアドバイスを詳細に網羅。" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, type: "spring" }}
                  className="bg-white p-8 rounded-[48px] border-2 border-white shadow-xl hover:shadow-2xl transition-shadow group"
                >
                  <div className="bg-gray-50 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-50 transition-colors">
                    {item.icon}
                  </div>
                  <h4 className="font-black text-gray-800 mb-3 text-lg">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-loose">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Matrix View */}
            <div className="w-full bg-white p-6 md:p-12 rounded-[50px] shadow-2xl border-4 border-white mb-20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50/50 rounded-full blur-3xl -mr-32 -mt-32 z-0" />

              <div className="flex flex-col items-center mb-12 text-center relative z-10 px-4">
                <div className="bg-pink-100/50 px-5 py-1.5 rounded-full mb-5 border border-pink-100">
                  <p className="text-[10px] font-black text-pink-500 uppercase tracking-[0.4em]">Personality Matrix Explorer</p>
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight leading-tight">全36タイプの類型的分類</h3>
                <p className="text-gray-400 text-[11px] md:text-sm mt-4 uppercase tracking-[0.2em] font-bold max-w-2xl leading-relaxed">
                  あなたの深層にある「価値観(X)」と恋愛の「表現スタイル(Y)」の交差点。<br />
                  それぞれに固有の名称と物語を持つ、36人の分身たち。
                </p>
              </div>

              <div className="overflow-x-auto pb-10 scrollbar-pink relative z-10">
                <div className="min-w-[1200px] px-4">
                  <div className="grid grid-cols-7 gap-4">
                    {/* Header corner */}
                    <div className="flex flex-col items-center justify-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 p-4">
                      <Sparkles className="text-pink-200 mb-2" size={24} />
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">36 Types</span>
                    </div>

                    {/* X Headers */}
                    {X_AXES.map(x => (
                      <div key={x} className="bg-white p-5 rounded-[32px] border-2 border-gray-50 shadow-sm text-center">
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">Value: {x}</p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-xl">{personalityTypes[`${x.toLowerCase()}-${Y_AXES[0].toLowerCase()}`]?.emoji}</span>
                          <h4 className="font-black text-gray-700 text-[13px] tracking-widest">{personalityTypes[`${x.toLowerCase()}-${Y_AXES[0].toLowerCase()}`]?.name.split('の')[0]}</h4>
                        </div>
                      </div>
                    ))}

                    {/* Rows */}
                    {Y_AXES.map((y, yIdx) => (
                      <React.Fragment key={y}>
                        {/* Y Header */}
                        <div className="bg-white p-5 rounded-[32px] border-2 border-gray-50 shadow-sm flex flex-col justify-center items-center">
                          <p className="text-[9px] font-black text-pink-200 uppercase tracking-widest mb-2">Style</p>
                          <h4 className="font-black text-gray-500 text-[11px] leading-tight text-center uppercase">{y}</h4>
                        </div>

                        {/* Data Cells */}
                        {X_AXES.map((x, xIdx) => {
                          const id = `${x.toLowerCase()}-${y.toLowerCase()}`;
                          const type = personalityTypes[id];
                          const visual = (type as any).visual;

                          return (
                            <motion.div
                              key={id}
                              whileHover={{ y: -8, scale: 1.03 }}
                              className="bg-white rounded-[32px] border border-gray-100 p-3 flex flex-col items-center shadow-sm hover:shadow-2xl hover:border-pink-200 transition-all cursor-pointer group"
                            >
                              <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden mb-3 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
                                <CharacterPortrait
                                  typeId={id}
                                  design={visual}
                                  primaryColor={type.color}
                                  size="small"
                                  className="w-full h-full"
                                />
                                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-md w-7 h-7 rounded-xl flex items-center justify-center text-sm shadow-sm ring-1 ring-white/50 z-20">
                                  {type.emoji}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                              </div>
                              <h5 className="text-[11px] font-black text-gray-800 text-center leading-tight mb-1 group-hover:text-pink-500 transition-colors">
                                {type.characterName}
                              </h5>
                              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.1em]">
                                {type.name.split('の')[1]}
                              </p>
                            </motion.div>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-10 bg-gray-50/80 backdrop-blur-sm py-6 rounded-[40px] border border-white">
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-black text-gray-700">36</p>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Profiles</p>
                </div>
                <div className="w-[1px] h-10 bg-gray-200" />
                <p className="text-[12px] text-gray-500 font-bold tracking-widest leading-loose max-w-sm text-center px-4">
                  深層心理の交差が生む、36通りの詳細な分析。<br />
                  あなたは、どの星の下に生まれ、誰と惹かれ合うのか。
                </p>
              </div>
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
