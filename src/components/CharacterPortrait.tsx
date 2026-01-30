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

    // --- Color Quadrants (MBTI Official) ---
    const getGroupColors = () => {
        const id = typeId.toLowerCase();
        // Analysts (Purple)
        if (id.includes('analytical') || id.includes('enigmatic')) {
            return { base: '#a685e2', light: '#c9b7eb', dark: '#8a65cd', bg: '#f3efff' };
        }
        // Diplomats (Green)
        if (id.includes('romantic') || id.includes('altruistic')) {
            return { base: '#a4d4ae', light: '#c9e6ce', dark: '#7cb387', bg: '#f1f9f2' };
        }
        // Sentinels (Blue)
        if (id.includes('formal') || id.includes('traditional')) {
            return { base: '#7eb5d6', light: '#b0d4eb', dark: '#5c94b5', bg: '#f0f7fb' };
        }
        // Explorers (Yellow)
        return { base: '#f2d06b', light: '#f7e1a0', dark: '#d4b44a', bg: '#fffbf0' };
    };

    const colors = getGroupColors();

    // Helper for shaded facets
    const ShadedPath = ({ d, color, shade = 0.1 }: { d: string; color: string; shade?: number }) => (
        <g>
            <path d={d} fill={color} />
            <path d={d} fill="#000" opacity={shade} />
        </g>
    );

    return (
        <div className={`relative w-full h-full flex items-center justify-center p-4 rounded-[40px] overflow-hidden ${className}`} style={{ backgroundColor: colors.bg }}>
            {/* Background Accent */}
            <div
                className="absolute inset-x-0 bottom-0 top-1/2 opacity-20"
                style={{ backgroundColor: colors.base }}
            />

            {/* Geometric MBTI Character SVG */}
            <motion.svg
                viewBox="0 0 200 240"
                className="w-full h-full relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Ground Shadow */}
                <ellipse cx="100" cy="225" rx="45" ry="10" fill="#000" opacity="0.05" />

                {/* --- Legs --- */}
                <g>
                    {/* Left Leg */}
                    <path d="M 85 185 L 95 185 L 95 220 L 85 220 Z" fill={outfitColors[1] || '#444'} />
                    <path d="M 85 185 L 90 185 L 90 220 L 85 220 Z" fill="#000" opacity="0.1" />
                    {/* Right Leg */}
                    <path d="M 105 185 L 115 185 L 115 220 L 105 220 Z" fill={outfitColors[1] || '#444'} />
                    <path d="M 105 185 L 110 185 L 110 220 L 105 220 Z" fill="#000" opacity="0.1" />
                </g>

                {/* --- Torso (Facet Shaded) --- */}
                <g>
                    {/* Main Torso */}
                    <path d="M 70 115 L 130 115 L 140 185 L 60 185 Z" fill={outfitColors[0] || colors.base} />
                    {/* Side Facet (Shaded) */}
                    <path d="M 70 115 L 85 115 L 80 185 L 60 185 Z" fill="#000" opacity="0.1" />
                    {/* Clothing Detail (Tie/Center) */}
                    <path d="M 98 115 L 102 115 L 105 150 L 95 150 Z" fill="#fff" opacity="0.2" />
                </g>

                {/* --- Arms --- */}
                <g>
                    {/* Left Arm */}
                    <path d="M 70 120 L 50 140 L 55 180 L 70 170 Z" fill={outfitColors[0] || colors.base} />
                    <path d="M 70 120 L 60 130 L 65 175 L 70 170 Z" fill="#000" opacity="0.15" />
                    <circle cx="53" cy="180" r="8" fill={skinTone} />

                    {/* Right Arm */}
                    <path d="M 130 120 L 150 140 L 145 180 L 130 170 Z" fill={outfitColors[0] || colors.base} />
                    <path d="M 130 120 L 140 130 L 135 175 L 130 170 Z" fill="#000" opacity="0.15" />
                    <circle cx="147" cy="180" r="8" fill={skinTone} />
                </g>

                {/* --- Head (Facet Shaded Cubic) --- */}
                <g transform="translate(0, -5)">
                    {/* Main Face Shape */}
                    <path d="M 65 50 L 135 50 L 135 105 Q 135 115 100 115 Q 65 115 65 105 Z" fill={skinTone} />
                    {/* Side Shading */}
                    <path d="M 65 50 L 80 50 L 80 110 Q 65 110 65 105 Z" fill="#000" opacity="0.08" />

                    {/* Eyes (Characteristic Slits/Dots) */}
                    <g>
                        <circle cx="92" cy="85" r="3.5" fill="#333" />
                        <circle cx="122" cy="85" r="3.5" fill="#333" />
                        {/* Eyebrows (Determined/Calm based on archetype) */}
                        <path d="M 85 78 L 98 80" stroke="#333" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                        <path d="M 115 80 L 128 78" stroke="#333" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                    </g>

                    {/* Mouth */}
                    <path d="M 102 102 L 112 102" stroke="#333" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                </g>

                {/* --- Hair (Low-Poly / Geometric Volume) --- */}
                <g fill={hairColor} transform="translate(0, -5)">
                    {/* Main Hair Mass */}
                    <path d="M 60 55 L 140 55 L 135 30 L 115 15 L 85 15 L 65 30 Z" />
                    {/* Hair Facets (Depth) */}
                    <path d="M 60 55 L 85 55 L 85 15 L 65 30 Z" fill="#000" opacity="0.1" />
                    <path d="M 140 55 L 115 55 L 115 15 L 135 30 Z" fill="#fff" opacity="0.1" />

                    {/* Curls/Spikes (Type specific) */}
                    {design.hairStyle.includes("spiky") && (
                        <path d="M 80 15 L 100 0 L 120 15 Z" fill={hairColor} />
                    )}
                </g>

                {/* --- Props (Matching MBTI official motifs) --- */}
                <g>
                    {/* Cake (Consul / Altruistic-Formal motif) */}
                    {accessories.includes("Cake") && (
                        <g transform="translate(145, 175)">
                            <path d="M -15 0 L 15 0 L 12 10 L -12 10 Z" fill="#fff" stroke="#eee" />
                            <path d="M -15 0 L -15 -10 L 15 -10 L 15 0 Z" fill="#ffb7b2" />
                            <circle cx="0" cy="-12" r="3" fill="#ff4d6d" />
                        </g>
                    )}

                    {/* Umbrella (Consul / Altruistic-Formal motif) */}
                    {accessories.includes("Umbrella") && (
                        <g transform="translate(45, 120)">
                            <path d="M 0 0 L 0 -50" stroke="#8d6e63" strokeWidth="3" />
                            <path d="M -30 -40 Q 0 -60 30 -40 Z" fill="#b0d4eb" stroke="#5c94b5" />
                        </g>
                    )}

                    {/* Blueprint (Architect / Analytical-Modern) */}
                    {accessories.includes("Blueprints") && (
                        <g transform="translate(140, 160)">
                            <rect x="-10" y="0" width="25" height="40" fill="#2196f3" rx="2" stroke="#fff" strokeWidth="1" />
                            <line x1="-5" y1="10" x2="10" y2="10" stroke="#fff" strokeWidth="1" opacity="0.5" />
                            <line x1="-5" y1="20" x2="10" y2="20" stroke="#fff" strokeWidth="1" opacity="0.5" />
                        </g>
                    )}

                    {/* Tools (Virtuoso / Independent-Casual) */}
                    {accessories.includes("Wrench") && (
                        <path d="M 145 160 L 155 170 L 150 185 L 140 175 Z" fill="#9e9e9e" stroke="#616161" />
                    )}

                    {/* Standard Weapon Render */}
                    {!accessories.includes("Cake") && weapon === "Longsword" && (
                        <g transform="translate(150, 160)">
                            <path d="M 0 0 L 0 -60 L 6 -65 L 12 -60 L 12 0 Z" fill="#e0e0e0" stroke="#bdbdbd" />
                            <path d="M -5 -5 L 17 -5" stroke="#795548" strokeWidth="4" />
                        </g>
                    )}
                </g>

                {/* --- Archetype Label (Vercel Style) --- */}
                <g transform="translate(20, 200)">
                    <rect x="0" y="0" width="160" height="26" rx="13" fill="white" opacity="0.9" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.05))" />
                    <text
                        x="80"
                        y="17"
                        textAnchor="middle"
                        className="text-[10px] font-black tracking-widest uppercase"
                        fill={colors.dark}
                    >
                        {archetype}
                    </text>
                </g>
            </motion.svg>
        </div>
    );
}
