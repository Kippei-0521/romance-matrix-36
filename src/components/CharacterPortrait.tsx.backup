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
    const { hairColor, eyeColor, skinTone, outfitColors, aura, archetype } = design;

    const sizeClasses = {
        small: "w-24 h-32",
        medium: "w-48 h-64",
        large: "w-64 h-80"
    };

    return (
        <div className={`relative ${sizeClasses[size]} ${className}`}>
            {/* Background with aura */}
            <div
                className="absolute inset-0 rounded-2xl opacity-20 blur-2xl"
                style={{ backgroundColor: outfitColors[0] || primaryColor }}
            />

            {/* Main character SVG */}
            <motion.svg
                viewBox="0 0 200 300"
                className="w-full h-full drop-shadow-2xl relative z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <defs>
                    {/* Gradient for dramatic lighting */}
                    <linearGradient id={`grad-${typeId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                        <stop offset="100%" stopColor={outfitColors[0]} stopOpacity="0.3" />
                    </linearGradient>

                    {/* Anime-style sparkle */}
                    <filter id={`glow-${typeId}`}>
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Shadow */}
                <ellipse cx="100" cy="280" rx="60" ry="15" fill="#000000" opacity="0.2" />

                {/* Body silhouette (simplified anime style) */}
                <g>
                    {/* Torso */}
                    <path
                        d="M 75 140 Q 70 180 75 220 L 125 220 Q 130 180 125 140 Z"
                        fill={outfitColors[0] || primaryColor}
                        stroke="#000000"
                        strokeWidth="2"
                    />

                    {/* Arms */}
                    <path
                        d="M 70 150 Q 50 170 55 200"
                        fill="none"
                        stroke={outfitColors[0] || primaryColor}
                        strokeWidth="12"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 130 150 Q 150 170 145 200"
                        fill="none"
                        stroke={outfitColors[0] || primaryColor}
                        strokeWidth="12"
                        strokeLinecap="round"
                    />

                    {/* Legs */}
                    <path
                        d="M 85 220 L 80 275"
                        fill="none"
                        stroke={outfitColors[1] || "#2d3748"}
                        strokeWidth="15"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 115 220 L 120 275"
                        fill="none"
                        stroke={outfitColors[1] || "#2d3748"}
                        strokeWidth="15"
                        strokeLinecap="round"
                    />
                </g>

                {/* Head */}
                <circle cx="100" cy="90" r="50" fill={skinTone} stroke="#000000" strokeWidth="2" />

                {/* Hair (anime-style) */}
                <g>
                    {/* Main hair mass */}
                    <path
                        d="M 50 70 Q 45 50 55 40 Q 70 30 100 35 Q 130 30 145 40 Q 155 50 150 70 Q 145 85 140 95 L 60 95 Q 55 85 50 70"
                        fill={hairColor}
                        stroke="#000000"
                        strokeWidth="2"
                    />
                    {/* Hair spikes/strands */}
                    <path d="M 70 40 Q 65 25 72 35" fill={hairColor} stroke="#000000" strokeWidth="1.5" />
                    <path d="M 100 35 Q 100 20 103 32" fill={hairColor} stroke="#000000" strokeWidth="1.5" />
                    <path d="M 130 40 Q 135 25 128 35" fill={hairColor} stroke="#000000" strokeWidth="1.5" />
                </g>

                {/* Eyes (large anime eyes) */}
                <g>
                    {/* Left eye */}
                    <ellipse cx="80" cy="85" rx="12" ry="15" fill="white" stroke="#000000" strokeWidth="2" />
                    <ellipse cx="80" cy="87" rx="8" ry="10" fill={eyeColor} />
                    <circle cx="78" cy="83" r="4" fill="#000000" />
                    <circle cx="82" cy="82" r="3" fill="white" /> {/* Highlight */}

                    {/* Right eye */}
                    <ellipse cx="120" cy="85" rx="12" ry="15" fill="white" stroke="#000000" strokeWidth="2" />
                    <ellipse cx="120" cy="87" rx="8" ry="10" fill={eyeColor} />
                    <circle cx="118" cy="83" r="4" fill="#000000" />
                    <circle cx="122" cy="82" r="3" fill="white" /> {/* Highlight */}
                </g>

                {/* Mouth (anime smile) */}
                <path
                    d="M 85 105 Q 100 110 115 105"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                />

                {/* Optional weapon/accessory */}
                {design.weapon && (
                    <g>
                        {/* Simple sword representation */}
                        <rect x="140" y="180" width="8" height="80" fill="#666" stroke="#000" strokeWidth="1.5" rx="1" />
                        <rect x="135" y="175" width="18" height="10" fill="#8b7355" stroke="#000" strokeWidth="1" />
                        <polygon points="144,165 152,175 136,175" fill="#c0c0c0" stroke="#000" strokeWidth="1.5" />
                    </g>
                )}

                {/* Aura effects */}
                <motion.g
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [0.95, 1.05, 0.95]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ transformOrigin: "100px 150px" }}
                >
                    {/* Energy aura circles */}
                    <circle cx="100" cy="150" r="90" fill="none" stroke={outfitColors[0] || primaryColor} strokeWidth="2" opacity="0.3" />
                    <circle cx="100" cy="150" r="100" fill="none" stroke={outfitColors[0] || primaryColor} strokeWidth="1" opacity="0.2" />
                </motion.g>

                {/* Anime speed lines or action effects */}
                {design.animeStyle === "one-piece" && (
                    <g opacity="0.2">
                        <line x1="10" y1="100" x2="40" y2="100" stroke="#000" strokeWidth="2" />
                        <line x1="15" y1="120" x2="45" y2="120" stroke="#000" strokeWidth="2" />
                        <line x1="160" y1="100" x2="190" y2="100" stroke="#000" strokeWidth="2" />
                        <line x1="155" y1="120" x2="185" y2="120" stroke="#000" strokeWidth="2" />
                    </g>
                )}

                {/* Mystical effects for jujutsu-kaisen style */}
                {design.animeStyle === "jujutsu-kaisen" && (
                    <motion.g
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        style={{ transformOrigin: "100px 150px" }}
                    >
                        <circle cx="100" cy="150" r="85" fill="none" stroke={eyeColor} strokeWidth="1" strokeDasharray="5 10" opacity="0.4" />
                    </motion.g>
                )}
            </motion.svg>

            {/* Character name/archetype label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 rounded-b-2xl">
                <p className="text-white text-xs font-bold text-center truncate">
                    {archetype}
                </p>
            </div>
        </div>
    );
}
