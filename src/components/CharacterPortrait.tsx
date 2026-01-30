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
    const { hairColor, skinTone, outfitColors, archetype, weapon, accessories } = design;

    // Derived group colors based on archetype or typeId
    const getGroupColor = () => {
        const id = typeId.toLowerCase();
        if (id.includes('analytical') || id.includes('enigmatic')) return { base: '#a685e2', light: '#d1c4e9', dark: '#7e57c2' }; // Analyst Purple
        if (id.includes('romantic') || id.includes('altruistic')) return { base: '#a4d4ae', light: '#c8e6c9', dark: '#66bb6a' }; // Diplomat Green
        if (id.includes('formal') || id.includes('traditional')) return { base: '#7eb5d6', light: '#bbdefb', dark: '#42a5f5' }; // Sentinel Blue
        return { base: '#f2d06b', light: '#fff9c4', dark: '#fbc02d' }; // Explorer Yellow
    };

    const colors = getGroupColor();

    return (
        <div className={`relative w-full h-full flex items-center justify-center p-4 bg-gray-50/50 rounded-3xl overflow-hidden ${className}`}>
            {/* Background Block */}
            <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundColor: colors.base }}
            />

            {/* Geometric Character SVG */}
            <motion.svg
                viewBox="0 0 200 240"
                className="w-full h-full relative z-10 filter drop-shadow-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Ground Shadow */}
                <ellipse cx="100" cy="220" rx="40" ry="8" fill="#000" opacity="0.1" />

                {/* --- Body Structure --- */}

                {/* Legs (Simple Rectangles) */}
                <g fill={outfitColors[1] || '#444'}>
                    <rect x="85" y="180" width="12" height="35" rx="2" />
                    <rect x="103" y="180" width="12" height="35" rx="2" />
                    {/* Leg Shadow */}
                    <path d="M 85 180 L 92 180 L 92 215 L 85 215 Z" fill="#000" opacity="0.1" />
                </g>

                {/* Torso (Geometric Trapezoid) */}
                <path
                    d="M 70 115 L 130 115 L 135 185 L 65 185 Z"
                    fill={outfitColors[0] || colors.base}
                />
                {/* Torso Shadow */}
                <path d="M 70 115 L 85 115 L 85 185 L 65 185 Z" fill="#000" opacity="0.1" />

                {/* --- Head & Face --- */}

                {/* Face Shape (MBTI Angular) */}
                <path
                    d="M 65 50 L 135 50 L 135 105 Q 135 115 100 115 Q 65 115 65 105 Z"
                    fill={skinTone}
                />
                {/* Face Shadow */}
                <path d="M 65 50 L 80 50 L 80 110 Q 65 110 65 105 Z" fill="#000" opacity="0.05" />

                {/* Eyes (Simple Dots) */}
                <circle cx="90" cy="85" r="3" fill="#333" />
                <circle cx="120" cy="85" r="3" fill="#333" />

                {/* Mouth (Geometric Line) */}
                <path d="M 100 100 L 110 100" stroke="#333" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />

                {/* --- Hair (Layered Polygons) --- */}
                <g fill={hairColor}>
                    {/* Main Mass (Simplified) */}
                    <path d="M 60 55 L 140 55 L 135 40 L 115 25 L 85 25 L 65 40 Z" />
                    {/* Side Bangs */}
                    <path d="M 60 55 L 75 80 L 65 90 Z" />
                    <path d="M 140 55 L 125 80 L 135 90 Z" />
                    {/* Hair Highlights/Shadows as Geometric Planes */}
                    <path d="M 60 55 L 80 55 L 85 25 L 65 40 Z" fill="#fff" opacity="0.15" />
                </g>

                {/* --- Arms --- */}
                <g fill={outfitColors[0] || colors.base}>
                    <rect x="55" y="125" width="15" height="40" rx="4" transform="rotate(10 55 125)" />
                    <rect x="130" y="125" width="15" height="40" rx="4" transform="rotate(-10 130 125)" />
                    <circle cx="58" cy="170" r="7" fill={skinTone} />
                    <circle cx="142" cy="170" r="7" fill={skinTone} />
                </g>

                {/* --- Props (Representative geometric items) --- */}
                <g transform="translate(45, 160)">
                    {weapon === "Longsword" && (
                        <path d="M 0 0 L 0 -60 L 5 -65 L 10 -60 L 10 0 Z" fill="#ccc" stroke="#888" strokeWidth="1" />
                    )}
                    {weapon === "Magic staff" && (
                        <g>
                            <rect x="3" y="-50" width="4" height="60" fill="#8d6e63" />
                            <circle cx="5" cy="-55" r="8" fill="#4fc3f7" opacity="0.8" />
                        </g>
                    )}
                    {accessories.includes("Scrolls") && (
                        <rect x="-5" y="-10" width="20" height="15" fill="#f5f5f5" rx="2" stroke="#ddd" />
                    )}
                    {accessories.includes("Pen") && (
                        <path d="M 5 0 L 5 -20 L 7 -22 L 9 -20 L 9 0 Z" fill="#333" />
                    )}
                </g>

                {/* Overlays for Character Name */}
                <g transform="translate(20, 195)">
                    <rect x="0" y="0" width="160" height="24" rx="12" fill="white" opacity="0.95" />
                    <text
                        x="80"
                        y="16"
                        textAnchor="middle"
                        className="text-[10px] font-bold tracking-wider"
                        fill={colors.dark}
                    >
                        {archetype}
                    </text>
                </g>
            </motion.svg>
        </div>
    );
}
