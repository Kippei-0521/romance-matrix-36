"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions, personalityTypes, X_AXES, Y_AXES } from '../lib/quizData';
import ResultComponent from './ResultComponent';
import { ArrowLeft } from 'lucide-react';

const LIKERT_OPTIONS = [
    { value: -2, label: "全くそう思わない", size: 48 },
    { value: -1, label: "あまり思わない", size: 36 },
    { value: 0, label: "どちらでもない", size: 28 },
    { value: 1, label: "少しそう思う", size: 36 },
    { value: 2, label: "非常にそう思う", size: 48 },
];

export default function QuizComponent() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [history, setHistory] = useState<{ traitX: Record<string, number>; traitY: Record<string, number> }[]>([]);
    const [scoresX, setScoresX] = useState<Record<string, number>>({});
    const [scoresY, setScoresY] = useState<Record<string, number>>({});
    const [showResult, setShowResult] = useState(false);
    const [isFinishing, setIsFinishing] = useState(false);

    const handleLevelSelect = (value: number) => {
        const currentQuestion = questions[currentQuestionIndex];

        // Save current scores to history
        setHistory([...history, { traitX: { ...scoresX }, traitY: { ...scoresY } }]);

        const newScoresX = { ...scoresX };
        const newScoresY = { ...scoresY };

        // Update X-axis scores
        Object.entries(currentQuestion.traitX).forEach(([trait, weight]) => {
            newScoresX[trait] = (newScoresX[trait] || 0) + weight * value;
        });

        // Update Y-axis scores
        Object.entries(currentQuestion.traitY).forEach(([trait, weight]) => {
            newScoresY[trait] = (newScoresY[trait] || 0) + weight * value;
        });

        setScoresX(newScoresX);
        setScoresY(newScoresY);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsFinishing(true);
            setTimeout(() => setShowResult(true), 2000);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            const prevScores = history[history.length - 1];
            setScoresX(prevScores.traitX);
            setScoresY(prevScores.traitY);
            setHistory(history.slice(0, -1));
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const getResultType = () => {
        // Find highest score on X-axis
        let maxX = -Infinity;
        let selectedX = X_AXES[0];
        X_AXES.forEach(x => {
            const score = scoresX[x] || 0;
            if (score > maxX) {
                maxX = score;
                selectedX = x;
            }
        });

        // Find highest score on Y-axis
        let maxY = -Infinity;
        let selectedY = Y_AXES[0];
        Y_AXES.forEach(y => {
            const score = scoresY[y] || 0;
            if (score > maxY) {
                maxY = score;
                selectedY = y;
            }
        });

        const resultId = `${selectedX.toLowerCase()}-${selectedY.toLowerCase()}`;
        return personalityTypes[resultId] || personalityTypes["romantic-traditional"];
    };

    if (showResult) {
        return <ResultComponent result={getResultType()} onRestart={() => window.location.reload()} />;
    }

    if (isFinishing) {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-6">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full"
                />
                <p className="text-xl font-bold text-gray-700">36マトリックス分析中...</p>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="w-full max-w-sm px-4 flex flex-col items-center min-h-[600px] relative">
            {/* Progress */}
            <div className="w-full mb-10 px-2">
                <div className="flex justify-between items-end mb-3">
                    <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest">36 Types Matrix Analysis</p>
                    <p className="text-[10px] font-bold text-gray-300">{currentQuestionIndex + 1} / {questions.length}</p>
                </div>
                <div className="progress-bar-container">
                    <motion.div
                        className="progress-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="w-full"
                >
                    <div className="glass-card p-8 mb-12 shadow-sm min-h-[160px] flex items-center justify-center">
                        <h2 className="text-2xl font-black text-center text-gray-800 leading-tight">
                            {currentQuestion.text}
                        </h2>
                    </div>

                    <div className="likert-container px-2">
                        {LIKERT_OPTIONS.map((opt) => (
                            <div
                                key={opt.value}
                                className="likert-option"
                                onClick={() => handleLevelSelect(opt.value)}
                            >
                                <div
                                    className="likert-circle"
                                    style={{ width: opt.size, height: opt.size }}
                                />
                                <span className="likert-label h-4 leading-tight">{opt.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Back Button */}
            {currentQuestionIndex > 0 && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleBack}
                    className="absolute -bottom-16 left-4 flex items-center gap-2 text-gray-400 font-bold text-sm hover:text-pink-400 transition-colors p-4"
                >
                    <ArrowLeft size={16} />
                    戻る
                </motion.button>
            )}
        </div>
    );
}
