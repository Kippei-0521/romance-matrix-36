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
    const { hairColor, eyeColor, outfitColors, archetype } = design;

    // Determine animal type based on personality group
    const group = typeId.split('-')[0];
    const species = {
        romantic: 'cat',
        analytical: 'fox',
        independent: 'wolf',
        altruistic: 'dog',
        enigmatic: 'rabbit',
        vibrant: 'bear'
    }[group] || 'cat';

    const sizeClasses = {
        small: "w-full h-full",
        medium: "w-full h-full",
        large: "w-full h-full"
    };

    // Ear shapes for different Animal Crossing species
    const getEars = () => {
        switch (species) {
            case 'cat':
            case 'fox':
            case 'wolf':
                return (
                    <g>
                        <path d="M 50 60 L 40 20 L 75 35 Z" fill={hairColor} stroke="#00000010" strokeWidth="2" />
                        <path d="M 170 60 L 180 20 L 145 35 Z" fill={hairColor} stroke="#00000010" strokeWidth="2" />
                        <path d="M 55 55 L 48 35 L 70 42 Z" fill="#ffb7b2" opacity="0.6" />
                        <path d="M 165 55 L 172 35 L 150 42 Z" fill="#ffb7b2" opacity="0.6" />
                    </g>
                );
            case 'rabbit':
                return (
                    <g>
                        <ellipse cx="60" cy="30" rx="12" ry="35" fill={hairColor} stroke="#00000010" strokeWidth="2" transform="rotate(-10 60 30)" />
                        <ellipse cx="160" cy="30" rx="12" ry="35" fill={hairColor} stroke="#00000010" strokeWidth="2" transform="rotate(10 160 30)" />
                        <ellipse cx="60" cy="30" rx="6" ry="25" fill="#ffb7b2" opacity="0.5" transform="rotate(-10 60 30)" />
                        <ellipse cx="160" cy="30" rx="6" ry="25" fill="#ffb7b2" opacity="0.5" transform="rotate(10 160 30)" />
                    </g>
                );
            case 'bear':
                return (
                    <g>
                        <circle cx="55" cy="45" r="22" fill={hairColor} stroke="#00000010" strokeWidth="2" />
                        <circle cx="165" cy="45" r="22" fill={hairColor} stroke="#00000010" strokeWidth="2" />
                        <circle cx="55" cy="45" r="12" fill="#ffb7b2" opacity="0.5" />
                        <circle cx="165" cy="45" r="12" fill="#ffb7b2" opacity="0.5" />
                    </g>
                );
            case 'dog':
            default:
                return (
                    <g>
                        <ellipse cx="50" cy="70" rx="18" ry="30" fill={hairColor} stroke="#00000010" strokeWidth="2" />
                        <ellipse cx="170" cy="70" rx="18" ry="30" fill={hairColor} stroke="#00000010" strokeWidth="2" />
                    </g>
                );
        }
    };

    return (
        <div className={`relative ${sizeClasses[size]} ${className}`}>
            {/* 🌸 Romantic Pastel Background */}
            <div
                className="absolute inset-0 rounded-3xl opacity-30 blur-2xl"
                style={{
                    background: `linear-gradient(135deg, ${primaryColor}70, #ffb7b260, #ffdac160)`
                }}
            />

            {/* ✨ Floating Hearts & Sparkles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-xl"
                        style={{
                            left: `${15 + i * 25}%`,
                            top: `${15 + (i % 2) * 40}%`,
                            opacity: 0.5
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.7, 0.3],
                            scale: [0.9, 1.2, 0.9]
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                    >
                        {i % 2 === 0 ? '💗' : '✨'}
                    </motion.div>
                ))}
            </div>

            {/* Animal Crossing Style SVG */}
            <motion.svg
                viewBox="0 0 220 300"
                className="w-full h-full relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                <defs>
                    <filter id={`softGlow-${typeId}`}>
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Shadow */}
                <ellipse cx="110" cy="280" rx="70" ry="12" fill="#000000" opacity="0.1" />

                {/* Ears */}
                {getEars()}

                {/* Body (Classic Animal Crossing pear shape) */}
                <path
                    d="M 85 160 Q 75 220 70 240 Q 75 270 110 270 Q 145 270 150 240 Q 145 220 135 160 Z"
                    fill={outfitColors[0] || primaryColor}
                    stroke="#00000010" strokeWidth="2"
                />

                {/* Tiny Rounded Paws */}
                <ellipse cx="65" cy="180" rx="15" ry="12" fill={hairColor} transform="rotate(20 65 180)" />
                <ellipse cx="155" cy="180" rx="15" ry="12" fill={hairColor} transform="rotate(-20 155 180)" />

                {/* Head (Large and Rounded) */}
                <g>
                    {/* Main Head Shape */}
                    <ellipse cx="110" cy="100" rx="75" ry="70" fill={hairColor} stroke="#00000010" strokeWidth="2" />

                    {/* Face Inset (White area typical of AC villagers) */}
                    <ellipse cx="110" cy="115" rx="55" ry="45" fill="white" opacity="0.15" />

                    {/* Blush */}
                    <ellipse cx="65" cy="120" rx="14" ry="10" fill="#ff9aa2" opacity="0.4" />
                    <ellipse cx="155" cy="120" rx="14" ry="10" fill="#ff9aa2" opacity="0.4" />

                    {/* Eyes (Simple and expressive AC eyes) */}
                    <g>
                        <circle cx="80" cy="105" r="14" fill="white" />
                        <circle cx="80" cy="105" r="10" fill={eyeColor} />
                        <circle cx="76" cy="100" r="4" fill="white" />

                        <circle cx="140" cy="105" r="14" fill="white" />
                        <circle cx="140" cy="105" r="10" fill={eyeColor} />
                        <circle cx="136" cy="100" r="4" fill="white" />
                    </g>

                    {/* Nose (Animal snout) */}
                    <ellipse cx="110" cy="130" rx="8" ry="6" fill="#333" opacity="0.8" />

                    {/* Mouth (AC Cat smile/vibe) */}
                    <path d="M 100 145 Q 110 152 120 145" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Character Name Tag */}
                <g transform="translate(0, 260)">
                    <foreignObject x="0" y="0" width="220" height="40">
                        <div className="flex justify-center items-center h-full">
                            <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-black text-gray-700 shadow-sm border-2 border-pink-100 uppercase tracking-widest">
                                {archetype}
                            </span>
                        </div>
                    </foreignObject>
                </g>
            </motion.svg>
        </div>
    );
}
