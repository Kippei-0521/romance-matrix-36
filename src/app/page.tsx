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

              <div className="flex flex-wrap justify-center gap-4 mb-10 text-[11px] font-black uppercase tracking-widest text-gray-400">
                <span className="bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">🕒 所要時間: 約3分</span>
                <span className="bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">📊 精度: 36タイプ分析</span>
                <span className="bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">💎 無料診断</span>
              </div>

              <p className="text-gray-500 mb-12 max-w-md mx-auto leading-loose text-[15px]">
                あなたの「魂の価値観」と「愛の表現方法」をマトリックスで分析。<br />
                自分でも気づかなかった「本当の自分」を、36の類型から可視化します。
              </p>

              <button
                onClick={() => setStarted(true)}
                className="btn-primary text-xl px-16 group relative overflow-hidden"
              >
                <span className="relative z-10">診断をスタートする</span>
                <motion.div
                  className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
                />
              </button>
            </div>

            {/* How it works */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 w-full px-4">
              {[
                { icon: <Heart className="text-pink-400" />, title: "25の深層質問", desc: "科学的なアプローチで、あなたの潜在的な恋愛傾向を抽出します。" },
                { icon: <Grid className="text-blue-400" />, title: "36マトリックス", desc: "価値軸と行動軸の掛け合わせで、類を見ない詳細な分析を行います。" },
                { icon: <span className="text-2xl">✨</span>, title: "真実のカルテ", desc: "あなたの強み、注意点、そして運命の相性を詳細に解説します。" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * i }}
                  className="bg-white/60 p-6 rounded-[32px] border border-white/80 shadow-sm text-center"
                >
                  <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-pink-50">
                    {item.icon}
                  </div>
                  <h4 className="font-black text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
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
