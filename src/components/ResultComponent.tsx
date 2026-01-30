"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PersonalityType, personalityTypes, X_AXES, Y_AXES } from '../lib/quizData';
import { RefreshCw, Share2, Heart, Star, Sparkles, Wand2, ShieldAlert, HeartHandshake, Map } from 'lucide-react';
import Image from 'next/image';

interface ResultProps {
    result: PersonalityType;
    onRestart: () => void;
}

export default function ResultComponent({ result, onRestart }: ResultProps) {
    // Simple compatibility logic for 36 types based on coordinates
    const findCompatibility = () => {
        const xIndex = X_AXES.indexOf(result.coordinate.x as any);
        const yIndex = Y_AXES.indexOf(result.coordinate.y as any);

        // Best: Inverse or nearby (just logic for demo)
        const bestX = X_AXES[(xIndex + 3) % X_AXES.length];
        const bestY = Y_AXES[(yIndex + 2) % Y_AXES.length];

        // Worst: Too similar or completely opposite
        const worstX = X_AXES[(xIndex + 1) % X_AXES.length];
        const worstY = Y_AXES[(yIndex + 4) % Y_AXES.length];

        return {
            best: personalityTypes[`${bestX.toLowerCase()}-${bestY.toLowerCase()}`],
            worst: personalityTypes[`${worstX.toLowerCase()}-${worstY.toLowerCase()}`]
        };
    };

    const { best, worst } = findCompatibility();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-md px-4 py-6 overflow-y-auto max-h-[90vh] custom-scrollbar"
        >
            <div className="space-y-6 pb-20">
                {/* Character Card */}
                <div className="glass-card overflow-hidden shadow-xl border-none">
                    <div
                        className="pt-10 pb-6 flex flex-col items-center justify-center relative overflow-hidden"
                        style={{ backgroundColor: `${result.color}22` }}
                    >
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#fff_20%,_transparent_20%)] bg-[length:30px_30px]"></div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative w-64 h-64 mb-4 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white"
                        >
                            <Image
                                src={result.imagePath}
                                alt={result.characterName}
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        <div className="flex gap-2 z-10">
                            <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-pink-500 uppercase tracking-widest border border-white">
                                Matrix: {result.coordinate.x} / {result.coordinate.y}
                            </span>
                        </div>
                    </div>

                    <div className="p-8 text-center bg-white">
                        <p className="text-pink-500 font-bold text-xs mb-2 tracking-widest uppercase">あなたの恋愛診断結果は...</p>
                        <h1 className="text-3xl font-black mb-8 text-gray-800 leading-tight">
                            {result.name}
                        </h1>

                        <div className="space-y-12 text-left mt-8">
                            {/* Main Description */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-3 border-b-2 border-pink-100 pb-3">
                                    <div className="bg-pink-500 p-2 rounded-xl text-white">
                                        <Star size={20} />
                                    </div>
                                    <h3 className="font-black text-xl text-gray-800 tracking-tight">
                                        あなたの深層プロファイル
                                    </h3>
                                </div>
                                <p className="text-gray-600 leading-loose text-[15px] first-letter:text-3xl first-letter:font-black first-letter:text-pink-500 first-letter:mr-1">
                                    {result.description}
                                </p>
                            </section>

                            {/* Inner Psychology - NEW */}
                            <section className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-[40px] border border-white shadow-inner space-y-4">
                                <h3 className="font-black text-indigo-800 flex items-center gap-2 text-lg">
                                    <Sparkles size={20} className="text-indigo-500" />
                                    魂の渇望と深層心理
                                </h3>
                                <p className="text-indigo-900/70 text-[14px] leading-loose italic">
                                    {result.innerPsychology}
                                </p>
                            </section>

                            {/* Shadow Side - NEW */}
                            <section className="bg-gray-900 p-8 rounded-[40px] text-white space-y-4 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <ShieldAlert size={80} />
                                </div>
                                <h3 className="font-black text-gray-400 flex items-center gap-2 text-xs uppercase tracking-widest">
                                    Shadow Analysis : 陥りやすい罠
                                </h3>
                                <p className="text-gray-300 text-[14px] leading-relaxed relative z-10">
                                    {result.shadowSide}
                                </p>
                            </section>

                            {/* Compatibility */}
                            <section className="grid grid-cols-2 gap-4">
                                <div className="bg-pink-50 p-6 rounded-[32px] border border-pink-100 text-center shadow-sm">
                                    <div className="flex justify-center mb-3 text-pink-500"><HeartHandshake size={28} /></div>
                                    <p className="text-[10px] font-black text-pink-300 mb-2 uppercase tracking-tighter">Ultimate Compatibility</p>
                                    <p className="text-sm font-black text-gray-700 leading-tight mb-2">{best.name}</p>
                                    <p className="text-2xl">{best.emoji}</p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-[32px] border border-gray-100 text-center shadow-sm">
                                    <div className="flex justify-center mb-3 text-gray-400"><ShieldAlert size={28} /></div>
                                    <p className="text-[10px] font-black text-gray-300 mb-2 uppercase tracking-tighter">Caution Alert</p>
                                    <p className="text-sm font-black text-gray-700 leading-tight mb-2">{worst.name}</p>
                                    <p className="text-2xl">{worst.emoji}</p>
                                </div>
                            </section>

                            {/* Behavior Patterns */}
                            <section className="space-y-6">
                                <h3 className="font-black text-gray-800 flex items-center gap-3">
                                    <Map size={20} className="text-blue-400" />
                                    具体的な行動特性
                                </h3>
                                <div className="space-y-4">
                                    {result.behavior.split('\n').map((line, i) => (
                                        <motion.div
                                            initial={{ x: -10, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 * i }}
                                            key={i}
                                            className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-50 shadow-sm"
                                        >
                                            <span className="text-pink-400 font-black">0{i + 1}</span>
                                            <p className="text-gray-600 text-sm leading-relaxed">{line.replace('・', '')}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>

                            {/* Ideal Partner */}
                            <section className="result-section bg-gradient-to-r from-pink-50/50 to-blue-50/50 border-none p-8 space-y-4">
                                <h3 className="font-black text-gray-800 flex items-center gap-3">
                                    <Heart size={20} className="text-red-400" />
                                    運命の相手
                                </h3>
                                <p className="text-gray-700 text-[14px] leading-loose">
                                    {result.idealPartner}
                                </p>
                            </section>

                            {/* Advice */}
                            <section className="space-y-6 text-center">
                                <div className="inline-block bg-green-50 px-4 py-1 rounded-full text-green-600 text-[10px] font-black uppercase tracking-widest">
                                    Divine Advice
                                </div>
                                <p className="text-gray-700 text-[15px] leading-loose px-8 py-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-white rounded-[40px] border-2 border-gray-50 shadow-xl italic relative">
                                    <span className="absolute top-0 left-6 text-6xl text-gray-100 font-serif">“</span>
                                    {result.advice}
                                    <span className="absolute bottom-0 right-6 text-6xl text-gray-100 font-serif rotate-180">“</span>
                                </p>
                            </section>
                        </div>

                        {/* Actions */}
                        <div className="mt-12 space-y-4">
                            <div className="text-center px-4">
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">Share your truth</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => {
                                            const text = encodeURIComponent(`【恋愛36タイプ診断】私の結果は「${result.name}」でした！💖\nあなたの愛の深淵はどこに位置する？\n#恋愛性格診断 #36タイプ診断`);
                                            const url = encodeURIComponent(window.location.href);
                                            window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
                                        }}
                                        className="bg-black text-white px-4 py-4 rounded-2xl font-black text-[11px] flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg"
                                    >
                                        <Share2 size={16} />
                                        Xでシェア
                                    </button>
                                    <button
                                        onClick={() => {
                                            const text = encodeURIComponent(`【恋愛36タイプ診断】私の結果は「${result.name}」でした！💖\n${window.location.href}`);
                                            window.open(`https://social-plugins.line.me/lineit/share?url=${text}`, '_blank');
                                        }}
                                        className="bg-[#06C755] text-white px-4 py-4 rounded-2xl font-black text-[11px] flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg"
                                    >
                                        <Share2 size={16} />
                                        LINEで送る
                                    </button>
                                </div>
                            </div>

                            <div className="pt-6 space-y-3">
                                <button
                                    onClick={onRestart}
                                    className="w-full bg-white border-2 border-pink-100 text-pink-500 font-black py-5 rounded-[32px] hover:bg-pink-50 transition-colors flex items-center justify-center gap-3 group"
                                >
                                    <RefreshCw className="group-hover:rotate-180 transition-transform duration-500" />
                                    もう一度診断する
                                </button>

                                <button
                                    onClick={() => window.location.reload()}
                                    className="w-full text-gray-400 font-bold text-[10px] py-4 flex items-center justify-center gap-2 uppercase tracking-widest"
                                >
                                    <Grid size={12} />
                                    全36タイプのマトリックスを見る
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
