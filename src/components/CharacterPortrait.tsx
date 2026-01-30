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

    const sizeClasses = {
        small: "w-full h-full",
        medium: "w-full h-full",
        large: "w-full h-full"
    };

    // Determine hair based on style description
    const getHairPath = () => {
        const lower = hairStyle.toLowerCase();
        if (lower.includes("long") || lower.includes("flowing")) {
            return "M 35 65 Q 30 48 42 38 Q 60 28 100 30 Q 140 28 158 38 Q 170 48 165 65 Q 162 85 158 110 L 150 130 Q 145 115 140 108 L 60 108 Q 55 115 50 130 L 42 110 Q 38 85 35 65";
        } else if (lower.includes("short") || lower.includes("neat") || lower.includes("buzz")) {
            return "M 48 72 Q 42 58 52 46 Q 72 34 100 36 Q 128 34 148 46 Q 158 58 152 72 Q 150 82 147 92 L 53 92 Q 50 82 48 72";
        } else if (lower.includes("spiky") || lower.includes("wild") || lower.includes("messy")) {
            return "M 42 70 L 35 42 L 50 52 L 58 32 L 72 48 L 82 28 L 100 34 L 118 28 L 128 48 L 142 32 L 150 52 L 165 42 L 158 70 Q 152 88 147 98 L 53 98 Q 48 88 42 70";
        } else if (lower.includes("bob") || lower.includes("stylish")) {
            return "M 46 70 Q 41 55 51 43 Q 70 32 100 33 Q 130 32 149 43 Q 159 55 154 70 Q 151 84 148 100 L 140 108 Q 135 102 130 100 L 70 100 Q 65 102 60 108 L 52 100 Q 49 84 46 70";
        } else if (lower.includes("mohawk") || lower.includes("punk")) {
            return "M 85 75 L 80 30 L 95 45 L 100 20 L 105 45 L 120 30 L 115 75 Q 110 90 105 98 L 95 98 Q 90 90 85 75";
        } else {
            return "M 48 72 Q 42 58 52 46 Q 72 34 100 36 Q 128 34 148 46 Q 158 58 152 72 Q 150 84 147 96 L 53 96 Q 50 84 48 72";
        }
    };

    return (
        <div className={`relative ${sizeClasses[size]} ${className}`}>
            {/* Romantic pastel background gradient */}
            <div
                className="absolute inset-0 rounded-3xl opacity-25 blur-3xl"
                style={{
                    background: `linear-gradient(135deg, ${primaryColor}50, #ffc0cb40, #e0b0ff30)`
                }}
            />

            {/* Floating sparkles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-pink-300 opacity-60"
                        style={{
                            left: `${15 + i * 20}%`,
                            top: `${8 + i * 15}%`,
                            fontSize: size === "small" ? "8px" : "14px"
                        }}
                        animate={{
                            y: [0, -12, 0],
                            opacity: [0.3, 0.7, 0.3],
                            scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                            duration: 2 + i * 0.4,
                            repeat: Infinity,
                            delay: i * 0.25
                        }}
                    >
                        ✨
                    </motion.div>
                ))}
            </div>

            {/* Main SVG Character */}
            <motion.svg
                viewBox="0 0 200 300"
                className="w-full h-full relative z-10"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))" }}
            >
                <defs>
                    {/* Skin gradient for natural shading */}
                    <radialGradient id={`skin-${typeId}`} cx="50%" cy="35%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                        <stop offset="100%" stopColor={skinTone} />
                    </radialGradient>

                    {/* Hair gradient with shine */}
                    <linearGradient id={`hair-${typeId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff40" />
                        <stop offset="45%" stopColor={hairColor} />
                        <stop offset="100%" stopColor={hairColor} stopOpacity="0.85" />
                    </linearGradient>

                    {/* Soft glow filter */}
                    <filter id={`glow-${typeId}`}>
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Ground shadow */}
                <ellipse cx="100" cy="287" rx="65" ry="10" fill="#00000012" />

                {/* Body (anime proportions - head larger relative to body) */}
                <g>
                    {/* Neck */}
                    <rect x="90" y="116" width="20" height="22" fill={skinTone} rx="4" opacity="0.95" />

                    {/* Torso with outfit */}
                    <path
                        d="M 68 138 Q 65 160 68 190 Q 70 220 73 245 L 82 245 L 82 278 L 94 278 L 94 245 L 106 245 L 106 278 L 118 278 L 118 245 L 127 245 Q 130 220 132 190 Q 135 160 132 138 Q 130 128 122 127 L 78 127 Q 70 128 68 138"
                        fill={outfitColors[0] || primaryColor}
                        stroke="#00000025"
                        strokeWidth="1.5"
                    />

                    {/* Outfit details */}
                    <rect x="83" y="143" width="34" height="4" fill="#ffffff35" rx="2" />
                    <circle cx="100" cy="160" r="6" fill={outfitColors[1] || "#ffffff45"} stroke="#00000018" strokeWidth="1" />
                    <line x1="85" y1="170" x2="115" y2="170" stroke="#00000010" strokeWidth="2" />

                    {/* Arms */}
                    <path d="M 73 142 Q 48 155 45 185 Q 43 198 46 210" fill="none" stroke={skinTone} strokeWidth="15" strokeLinecap="round" />
                    <path d="M 73 142 Q 52 153 48 172" fill="none" stroke={outfitColors[0] || primaryColor} strokeWidth="17" strokeLinecap="round" opacity="0.88" />
                    <path d="M 127 142 Q 152 155 155 185 Q 157 198 154 210" fill="none" stroke={skinTone} strokeWidth="15" strokeLinecap="round" />
                    <path d="M 127 142 Q 148 153 152 172" fill="none" stroke={outfitColors[0] || primaryColor} strokeWidth="17" strokeLinecap="round" opacity="0.88" />

                    {/* Legs */}
                    <path d="M 86 245 L 83 280" fill="none" stroke={outfitColors[1] || "#4a5568"} strokeWidth="17" strokeLinecap="round" />
                    <path d="M 114 245 L 117 280" fill="none" stroke={outfitColors[1] || "#4a5568"} strokeWidth="17" strokeLinecap="round" />

                    {/* Feet/shoes */}
                    <ellipse cx="83" cy="284" rx="14" ry="7" fill="#2d3748" />
                    <ellipse cx="117" cy="284" rx="14" ry="7" fill="#2d3748" />
                </g>

                {/* Head and face */}
                <g>
                    {/* Face shape */}
                    <ellipse cx="100" cy="88" rx="48" ry="54" fill={`url(#skin-${typeId})`} stroke="#00000022" strokeWidth="2.2" />

                    {/* Ears */}
                    <ellipse cx="52" cy="92" rx="9" ry="13" fill={skinTone} stroke="#00000012" strokeWidth="1.2" />
                    <ellipse cx="148" cy="92" rx="9" ry="13" fill={skinTone} stroke="#00000012" strokeWidth="1.2" />
                    <ellipse cx="54" cy="92" rx="5" ry="8" fill={skinTone} opacity="0.6" />
                    <ellipse cx="146" cy="92" rx="5" ry="8" fill={skinTone} opacity="0.6" />

                    {/* Hair */}
                    <path
                        d={getHairPath()}
                        fill={`url(#hair-${typeId})`}
                        stroke="#00000035"
                        strokeWidth="2.8"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />

                    {/* Hair highlights */}
                    <ellipse cx="80" cy="52" rx="18" ry="10" fill="#ffffff" opacity="0.45" transform="rotate(-15 80 52)" />
                    <ellipse cx="120" cy="48" rx="14" ry="8" fill="#ffffff" opacity="0.35" transform="rotate(10 120 48)" />

                    {/* Eyebrows */}
                    <path d="M 67 76 Q 78 73 89 76" fill="none" stroke={hairColor} strokeWidth="3.5" strokeLinecap="round" opacity="0.75" />
                    <path d="M 111 76 Q 122 73 133 76" fill="none" stroke={hairColor} strokeWidth="3.5" strokeLinecap="round" opacity="0.75" />

                    {/* Eyes - expressive anime style */}
                    <g>
                        {/* Left eye */}
                        <ellipse cx="76" cy="87" rx="15" ry="19" fill="white" stroke="#00000045" strokeWidth="2.8" />
                        <ellipse cx="76" cy="89" rx="11" ry="15" fill={eyeColor} opacity="0.92" />
                        <circle cx="76" cy="87" r="7" fill="#1a1a1a" />
                        <circle cx="72" cy="82" r="5" fill="white" /> {/* Main highlight */}
                        <circle cx="79" cy="92" r="2.5" fill="white" opacity="0.85" /> {/* Secondary */}
                        <ellipse cx="76" cy="84" rx="3" ry="5" fill="white" opacity="0.3" /> {/* Gleam */}

                        {/* Right eye */}
                        <ellipse cx="124" cy="87" rx="15" ry="19" fill="white" stroke="#00000045" strokeWidth="2.8" />
                        <ellipse cx="124" cy="89" rx="11" ry="15" fill={eyeColor} opacity="0.92" />
                        <circle cx="124" cy="87" r="7" fill="#1a1a1a" />
                        <circle cx="120" cy="82" r="5" fill="white" />
                        <circle cx="127" cy="92" r="2.5" fill="white" opacity="0.85" />
                        <ellipse cx="124" cy="84" rx="3" ry="5" fill="white" opacity="0.3" />
                    </g>

                    {/* Blush - cute anime style */}
                    <ellipse cx="59" cy="100" rx="12" ry="7" fill="#ff9999" opacity="0.35" />
                    <ellipse cx="141" cy="100" rx="12" ry="7" fill="#ff9999" opacity="0.35" />
                    <ellipse cx="56" cy="99" rx="6" ry="4" fill="#ffcccc" opacity="0.4" />
                    <ellipse cx="144" cy="99" rx="6" ry="4" fill="#ffcccc" opacity="0.4" />

                    {/* Nose - minimal anime style */}
                    <line x1="100" y1="98" x2="100" y2="106" stroke="#00000018" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="102" cy="106" r="1.5" fill="#00000012" />

                    {/* Mouth - happy smile */}
                    <path d="M 86 114 Q 100 121 114 114" fill="none" stroke="#d85c7b" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 93 118 Q 100 120 107 118" fill="none" stroke="#ff99aa" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                </g>

                {/* Romantic aura effect */}
                <motion.g
                    animate={{
                        opacity: [0.15, 0.4, 0.15],
                        scale: [0.96, 1.04, 0.96]
                    }}
                    transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ transformOrigin: "100px 170px" }}
                >
                    <circle cx="100" cy="170" r="100" fill="none" stroke={primaryColor} strokeWidth="2.5" opacity="0.25" />
                    <circle cx="100" cy="170" r="110" fill="none" stroke="#ffc0cb" strokeWidth="1.5" opacity="0.18" />
                </motion.g>

                {/* Floating hearts */}
                {[...Array(3)].map((_, i) => (
                    <motion.g
                        key={i}
                        animate={{
                            y: [0, -15, 0],
                            opacity: [0, 0.6, 0],
                            scale: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 1
                        }}
                    >
                        <path
                            d={`M ${90 + i * 15} ${180 + i * 20} l 3 -3 q 3 -3 6 0 q 3 3 0 6 l -6 6 l -6 -6 q -3 -3 0 -6 q 3 -3 6 0 z`}
                            fill="#ff69b4"
                            opacity="0.5"
                        />
                    </motion.g>
                ))}
            </motion.svg>

            {/* Character label - cute style */}
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                <div className="bg-gradient-to-t from-pink-50/95 via-pink-50/70 to-transparent px-3 py-2 rounded-b-3xl backdrop-blur-sm">
                    <p className="text-gray-800 text-xs font-extrabold text-center truncate tracking-wide" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>
                        {archetype}
                    </p>
                </div>
            </div>
        </div>
    );
}
