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
    const { hairColor, eyeColor, skinTone, outfitColors, archetype, hairStyle } = design;

    // Determine animal type based on personality group
    const group = typeId.split('-')[0];

    const sizeClasses = {
        small: "w-full h-full",
        medium: "w-full h-full",
        large: "w-full h-full"
    };

    // Cute Chibi Hair Path
    const getChibiHairPath = () => {
        const lower = hairStyle.toLowerCase();
        if (lower.includes("long") || lower.includes("flowing")) {
            return "M 40 60 Q 30 40 50 30 Q 80 20 120 20 Q 150 20 170 30 Q 190 40 180 60 Q 175 90 170 120 L 160 140 Q 150 120 110 120 L 60 120 Q 50 120 40 140 Q 35 90 40 60";
        } else if (lower.includes("short")) {
            return "M 50 65 Q 40 45 60 35 Q 90 25 110 25 Q 150 25 170 35 Q 180 45 170 65 Q 165 80 160 95 L 60 95 Q 55 80 50 65";
        }
        // Default soft cute hair
        return "M 45 65 Q 35 45 55 35 Q 85 25 110 27 Q 145 25 175 35 Q 185 45 175 65 Q 170 85 165 100 L 55 100 Q 50 85 45 65";
    };

    return (
        <div className={`relative ${sizeClasses[size]} ${className}`}>
            {/* 🌸 Pastel Background */}
            <div
                className="absolute inset-0 rounded-3xl opacity-30 blur-2xl"
                style={{
                    background: `linear-gradient(135deg, ${primaryColor}60, #ffb7b250, #ffdac150)`
                }}
            />

            {/* ✨ Floating Sparkles & Hearts */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-xl opacity-60"
                        style={{
                            left: `${10 + i * 20}%`,
                            top: `${10 + (i % 3) * 30}%`,
                            color: i % 2 === 0 ? '#ff9aa2' : '#ffd700'
                        }}
                        animate={{
                            y: [0, -15, 0],
                            opacity: [0.4, 0.8, 0.4],
                            scale: [0.8, 1.1, 0.8]
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                    >
                        {i % 2 === 0 ? '💗' : '✨'}
                    </motion.div>
                ))}
            </div>

            {/* Main SVG Composition */}
            <motion.svg
                viewBox="0 0 220 300"
                className="w-full h-full relative z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <defs>
                    <radialGradient id={`skin-${typeId}`} cx="50%" cy="40%">
                        <stop offset="0%" stopColor="#fff5f5" />
                        <stop offset="100%" stopColor={skinTone} />
                    </radialGradient>
                    <filter id={`softGlow-${typeId}`}>
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* 🧛 Animal Ears (Kemonomimi) - Behind Head */}
                <g transform="translate(0, 5)">
                    {/* Left Ear */}
                    <path
                        d="M 55 60 Q 40 20 75 30 L 85 55 Z"
                        fill={hairColor} stroke="#00000010" strokeWidth="2"
                    />
                    {/* Right Ear */}
                    <path
                        d="M 165 60 Q 180 20 145 30 L 135 55 Z"
                        fill={hairColor} stroke="#00000010" strokeWidth="2"
                    />
                    {/* Inner Ear Pink */}
                    <path d="M 60 55 Q 50 35 70 40 Z" fill="#ffb7b2" opacity="0.6" />
                    <path d="M 160 55 Q 170 35 150 40 Z" fill="#ffb7b2" opacity="0.6" />
                </g>

                {/* 👤 Chibi Body */}
                <g transform="translate(0, 20)">
                    {/* Small Cute Body */}
                    <path
                        d="M 80 140 Q 75 180 70 200 L 80 250 L 140 250 L 150 200 Q 145 180 140 140"
                        fill={outfitColors[0] || primaryColor}
                        stroke="#00000020" strokeWidth="2"
                    />
                    {/* Tiny Arms */}
                    <ellipse cx="65" cy="165" rx="15" ry="10" fill={outfitColors[0] || primaryColor} transform="rotate(20 65 165)" />
                    <ellipse cx="155" cy="165" rx="15" ry="10" fill={outfitColors[0] || primaryColor} transform="rotate(-20 155 165)" />

                    {/* Hands */}
                    <circle cx="55" cy="170" r="8" fill={skinTone} />
                    <circle cx="165" cy="170" r="8" fill={skinTone} />

                    {/* Legs/Feet */}
                    <ellipse cx="90" cy="255" rx="12" ry="8" fill="#333" />
                    <ellipse cx="130" cy="255" rx="12" ry="8" fill="#333" />
                </g>

                {/* 👩 Head (Large Chibi Head) */}
                <g>
                    {/* Face Shape */}
                    <ellipse cx="110" cy="95" rx="65" ry="60" fill={`url(#skin-${typeId})`} stroke="#00000015" strokeWidth="2" />

                    {/* Blush */}
                    <ellipse cx="70" cy="110" rx="12" ry="8" fill="#ff9aa2" opacity="0.4" />
                    <ellipse cx="150" cy="110" rx="12" ry="8" fill="#ff9aa2" opacity="0.4" />

                    {/* Hair */}
                    <path
                        d={getChibiHairPath()}
                        fill={hairColor}
                        stroke="#00000020" strokeWidth="2"
                        filter={`url(#softGlow-${typeId})`}
                    />
                    {/* Bangs */}
                    <path d="M 70 50 Q 110 80 150 50" fill="none" stroke={hairColor} strokeWidth="20" strokeLinecap="round" />

                    {/* Big Cute Eyes */}
                    <g>
                        {/* Left Eye */}
                        <ellipse cx="80" cy="95" rx="14" ry="18" fill="white" stroke="#333" strokeWidth="2" />
                        <ellipse cx="80" cy="95" rx="10" ry="14" fill={eyeColor} />
                        <circle cx="75" cy="90" r="5" fill="white" /> {/* Highlight 1 */}
                        <circle cx="83" cy="100" r="3" fill="white" opacity="0.7" /> {/* Highlight 2 */}

                        {/* Right Eye */}
                        <ellipse cx="140" cy="95" rx="14" ry="18" fill="white" stroke="#333" strokeWidth="2" />
                        <ellipse cx="140" cy="95" rx="10" ry="14" fill={eyeColor} />
                        <circle cx="135" cy="90" r="5" fill="white" /> {/* Highlight 1 */}
                        <circle cx="143" cy="100" r="3" fill="white" opacity="0.7" /> {/* Highlight 2 */}
                    </g>

                    {/* Tiny Smile */}
                    <path d="M 100 120 Q 110 125 120 120" fill="none" stroke="#d5869d" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* 🐾 Pet Companion (Small Animal Friend) */}
                <motion.g
                    initial={{ y: 0 }}
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    transform="translate(140, 180)"
                >
                    {/* Animal Blob Body */}
                    <ellipse cx="30" cy="30" rx="25" ry="22" fill={primaryColor} stroke="#00000010" strokeWidth="2" />

                    {/* Animal Ears */}
                    <path d="M 10 15 L 15 5 L 25 12 Z" fill={primaryColor} stroke="#00000010" strokeWidth="1" />
                    <path d="M 50 12 L 45 5 L 35 15 Z" fill={primaryColor} stroke="#00000010" strokeWidth="1" />

                    {/* Animal Face */}
                    <circle cx="22" cy="28" r="2" fill="#333" />
                    <circle cx="38" cy="28" r="2" fill="#333" />
                    <path d="M 28 32 Q 30 35 32 32" fill="none" stroke="#333" strokeWidth="1.5" />

                    {/* Cheeks */}
                    <circle cx="18" cy="32" r="3" fill="#ffb7b2" opacity="0.5" />
                    <circle cx="42" cy="32" r="3" fill="#ffb7b2" opacity="0.5" />
                </motion.g>

                {/* Character Label */}
                <g transform="translate(0, 260)">
                    <foreignObject x="0" y="0" width="220" height="40">
                        <div className="flex justify-center items-center h-full">
                            <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm border border-pink-100">
                                {design.archetype}
                            </span>
                        </div>
                    </foreignObject>
                </g>
            </motion.svg>
        </div>
    );
}
