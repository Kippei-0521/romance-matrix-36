"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CharacterDesign {
    archetype: string;
    animeStyle: "one-piece" | "kingdom" | "jujutsu-kaisen" | "mixed";
    hairStyle: string;
    hairColor: string;
    eyeColor: string;
    skinTone: string;
    outfit: string;
    outfitColors: string[];
    accessories: string[];
    weapon?: string;
    pose: string;
    aura: string;
    distinctiveFeature: string;
}

interface CharacterPortraitProps {
    typeId: string;
    design: CharacterDesign;
    primaryColor: string;
    size?: "small" | "medium" | "large";
    className?: string;
}

export default function CharacterPortrait({ typeId, design, primaryColor, size = "medium", className = "" }: CharacterPortraitProps) {
    const { hairColor, skinTone, outfitColors, archetype, accessories } = design;

    const sizeClasses = {
        small: "w-full h-full",
        medium: "w-full h-full",
        large: "w-full h-full"
    };

    // MBTI-style characters are often pill-shaped or have very soft, rounded bodies
    // with distinctive hair/hats that define their role.

    return (
        <div className={`relative ${sizeClasses[size]} ${className}`}>
            {/* 🌸 Romantic Pastel Glow Background */}
            <div
                className="absolute inset-0 rounded-[40px] opacity-25 blur-3xl"
                style={{
                    background: `linear-gradient(135deg, ${primaryColor}80, #ffb7b280, #e0b0ff80)`
                }}
            />

            {/* ✨ Floating Decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[40px]">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-2xl"
                        style={{
                            left: `${20 + i * 30}%`,
                            top: `${15 + (i % 2) * 50}%`,
                            opacity: 0.4
                        }}
                        animate={{
                            y: [0, -15, 0],
                            opacity: [0.2, 0.5, 0.2],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {i % 2 === 0 ? '✨' : '🌸'}
                    </motion.div>
                ))}
            </div>

            {/* 3D Modern Human Icon (MBTI Inspiration) */}
            <motion.svg
                viewBox="0 0 200 240"
                className="w-full h-full relative z-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <defs>
                    {/* 3D Lighting Gradients */}
                    <linearGradient id={`bodyGrad-${typeId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={outfitColors[0] || primaryColor} />
                        <stop offset="100%" stopColor={outfitColors[1] || primaryColor} stopOpacity="0.8" />
                    </linearGradient>

                    <linearGradient id={`skinGrad-${typeId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                        <stop offset="100%" stopColor={skinTone} />
                    </linearGradient>

                    <filter id={`shadow-${typeId}`}>
                        <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.1" />
                    </filter>

                    <filter id={`glow-${typeId}`}>
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Shadow */}
                <ellipse cx="100" cy="225" rx="50" ry="8" fill="#000" opacity="0.05" />

                {/* 🧘 Body (Smooth pill shape / Minimalist 3D) */}
                <motion.path
                    d="M 60 140 Q 60 110 100 110 Q 140 110 140 140 L 145 200 Q 145 220 100 220 Q 55 220 55 200 Z"
                    fill={`url(#bodyGrad-${typeId})`}
                    filter={`url(#shadow-${typeId})`}
                    stroke="#ffffff30"
                    strokeWidth="1"
                />

                {/* Arms (Simplified) */}
                <g>
                    <path d="M 65 145 Q 45 155 45 180" fill="none" stroke={`url(#bodyGrad-${typeId})`} strokeWidth="18" strokeLinecap="round" opacity="0.9" />
                    <path d="M 135 145 Q 155 155 155 180" fill="none" stroke={`url(#bodyGrad-${typeId})`} strokeWidth="18" strokeLinecap="round" opacity="0.9" />
                </g>

                {/* 👤 Head (Perfectly round iconic head) */}
                <g filter={`url(#shadow-${typeId})`}>
                    <circle cx="100" cy="75" r="45" fill={`url(#skinGrad-${typeId})`} />

                    {/* Hair / Hat (Characteristic Silhouette) */}
                    <path
                        d="M 55 75 Q 55 30 100 30 Q 145 30 145 75 L 140 85 L 60 85 Z"
                        fill={hairColor}
                        opacity="0.9"
                    />

                    {/* Eyes (Simple iconic dots) */}
                    <circle cx="85" cy="78" r="3.5" fill="#333" opacity="0.7" />
                    <circle cx="115" cy="78" r="3.5" fill="#333" opacity="0.7" />

                    {/* Cheeks */}
                    <circle cx="78" cy="85" r="5" fill="#ff9aa2" opacity="0.3" />
                    <circle cx="122" cy="85" r="5" fill="#ff9aa2" opacity="0.3" />

                    {/* Subtle Smile */}
                    <path d="M 92 92 Q 100 96 108 92" fill="none" stroke="#333" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* 🎩 Accessories (Based on Archetype) */}
                {accessories.includes("Crown") && (
                    <path d="M 85 35 L 90 25 L 100 35 L 110 25 L 115 35 Z" fill="#ffd700" stroke="#ffaa00" strokeWidth="1" />
                )}

                {accessories.includes("Glasses") && (
                    <g transform="translate(0, 78)">
                        <circle cx="85" cy="0" r="10" fill="none" stroke="#333" strokeWidth="1.5" opacity="0.5" />
                        <circle cx="115" cy="0" r="10" fill="none" stroke="#333" strokeWidth="1.5" opacity="0.5" />
                        <line x1="95" y1="0" x2="105" y2="0" stroke="#333" strokeWidth="1.5" opacity="0.5" />
                    </g>
                )}

                {/* 🎨 Outfit Detail / Symbol */}
                <g opacity="0.4">
                    <circle cx="100" cy="150" r="12" fill="white" />
                    <path d="M 100 144 L 100 156 M 94 150 L 106 150" stroke={primaryColor} strokeWidth="2" />
                </g>

                {/* Character Label Background */}
                <g transform="translate(20, 205)">
                    <rect x="0" y="0" width="160" height="28" rx="14" fill="white" opacity="0.9" />
                    <text
                        x="80"
                        y="18"
                        textAnchor="middle"
                        className="text-[10px] font-black uppercase tracking-[0.1em]"
                        fill="#555"
                    >
                        {archetype}
                    </text>
                </g>
            </motion.svg>

            {/* 🎇 Sparkle particles */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-30" />
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-10" />
            </motion.div>
        </div>
    );
}
