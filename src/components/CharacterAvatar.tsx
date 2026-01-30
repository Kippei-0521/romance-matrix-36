"use client";

import React from 'react';
import {
    Sword, Shield, Crown, Sparkles, Flame,
    Library, Cpu, Eye, Gavel, Zap, Diamond,
    Mountain, Rocket, Compass, ScrollText, Palette, Book,
    Church, Users, Coffee, Key, Sun, ShieldCheck,
    Scroll, Wand2, Theater, Snowflake, Ghost, Moon,
    Trophy, Music, Gamepad2, GlassWater, Lightbulb, Footprints,
    User, Wind, Cloud, Heart, Star
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CharacterAvatarProps {
    typeId: string;
    visual: {
        symbol: string;
        pattern: string;
        colorSecondary: string;
    };
    primaryColor: string;
    size?: number | string;
    className?: string;
}

const SymbolIcon = ({ name, size }: { name: string; size: number }) => {
    const icons: Record<string, any> = {
        Sword, Shield, Crown, Sparkles, Flame,
        Library, Cpu, Eye, Gavel, Zap, Diamond,
        Mountain, Rocket, Compass, ScrollText, Palette, Book,
        Church, Users, Coffee, Key, Sun, ShieldCheck,
        Scroll, Wand: Wand2, Masks: Theater, Snowflake, Ghost, Moon,
        Trophy, Music, Gamepad: Gamepad2, GlassWater, Lightbulb, Footprints,
        User, Feather: Wind, Star
    };

    const Icon = icons[name] || User;
    return <Icon size={size} strokeWidth={2.5} />;
};

export default function CharacterAvatar({ typeId, visual, primaryColor, size = "100%", className = "" }: CharacterAvatarProps) {
    const { symbol, pattern, colorSecondary } = visual;

    return (
        <div
            className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-white ${className}`}
            style={{
                width: typeof size === 'number' ? `${size}px` : size,
                height: typeof size === 'number' ? `${size}px` : size,
            }}
        >
            {/* Dynamic Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id={`pattern-${typeId}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            {pattern === "Shield" && <path d="M20 5 L35 15 L35 30 L20 40 L5 30 L5 15 Z" fill="none" stroke={primaryColor} strokeWidth="1" />}
                            {pattern === "City" && <rect x="5" y="10" width="10" height="25" fill="none" stroke={primaryColor} strokeWidth="1" />}
                            {pattern === "Wind" && <path d="M5 20 Q15 10 25 20 T45 20" fill="none" stroke={primaryColor} strokeWidth="1" />}
                            {pattern === "Stars" && <circle cx="20" cy="20" r="2" fill={primaryColor} />}
                            {pattern === "Grid" && <rect x="0" y="0" width="40" height="40" fill="none" stroke={primaryColor} strokeWidth="0.5" />}
                            {pattern === "Pulse" && <path d="M0 20 L10 20 L15 10 L25 30 L30 20 L40 20" fill="none" stroke={primaryColor} strokeWidth="1" />}
                            {pattern === "Path" && <path d="M0 40 L40 0" fill="none" stroke={primaryColor} strokeWidth="2" strokeDasharray="4 4" />}
                            {pattern === "Rays" && <line x1="0" y1="0" x2="40" y2="40" stroke={primaryColor} strokeWidth="0.5" />}
                            {!["Shield", "City", "Wind", "Stars", "Grid", "Pulse", "Path", "Rays"].includes(pattern) && (
                                <circle cx="2" cy="2" r="1" fill={primaryColor} />
                            )}
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#pattern-${typeId})`} />
                </svg>
            </div>

            {/* Abstract Character Aura */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-4/5 h-4/5 rounded-full blur-3xl z-0"
                style={{ backgroundColor: `${primaryColor}44` }}
            />

            <motion.div
                animate={{
                    scale: [1.1, 1, 1.1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute w-3/5 h-3/5 rounded-full blur-2xl z-0"
                style={{ backgroundColor: `${colorSecondary}33` }}
            />

            {/* Main Symbol Container */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="relative z-10 flex flex-col items-center justify-center"
            >
                <div
                    className="p-8 rounded-[40px] shadow-2xl relative bg-white border-2 border-white"
                    style={{
                        color: primaryColor,
                        boxShadow: `0 20px 50px -12px ${primaryColor}44`
                    }}
                >
                    {/* Decorative Ring */}
                    <div
                        className="absolute inset-0 rounded-[38px] border-2 border-dashed opacity-20"
                        style={{ borderColor: primaryColor }}
                    />

                    <SymbolIcon name={symbol} size={64} />

                    {/* Accent Mini-symbol */}
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -top-3 -right-3 bg-white p-2 rounded-2xl shadow-lg border border-gray-50"
                    >
                        <Sparkles size={16} style={{ color: colorSecondary }} />
                    </motion.div>
                </div>
            </motion.div>

            {/* Glowing particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full z-10"
                    style={{ backgroundColor: colorSecondary }}
                    animate={{
                        x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                        y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1.5, 0]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                />
            ))}
        </div>
    );
}
