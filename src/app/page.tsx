"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizComponent from '../components/QuizComponent';
import { Heart, Grid, Sparkles } from 'lucide-react';
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
            className="w-full max-w-4xl flex flex-col items-center z-10 py-12 md:py-20"
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

            {/* Matrix Preview */}
            <div className="w-full bg-white p-10 rounded-[60px] shadow-2xl border-4 border-white mb-20">
              <div className="flex flex-col items-center mb-10 text-center">
                <div className="bg-pink-50 px-4 py-1 rounded-full mb-4">
                  <p className="text-[10px] font-black text-pink-500 uppercase tracking-[0.3em]">Full Comparison Matrix</p>
                </div>
                <h3 className="text-2xl font-black text-gray-800">全36タイプの類型的分類</h3>
                <p className="text-gray-400 text-xs mt-2">横軸：深層価値観 × 縦軸：恋愛スタイル</p>
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
