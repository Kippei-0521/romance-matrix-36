"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AnimalCrossingAvatarProps {
    typeId: string;
    visual: {
        animalType: string;
        furColor: string;
        eyeColor: string;
        personality: string;
        accessory: string;
    };
    primaryColor: string;
    size?: number | string;
    className?: string;
}

export default function AnimalCrossingAvatar({ typeId, visual, primaryColor, size = "100%", className = "" }: AnimalCrossingAvatarProps) {
    const { animalType, furColor, eyeColor, personality, accessory } = visual;

    // Determine ear shape based on animal type
    const getEarShape = () => {
        switch (animalType) {
            case "cat":
            case "fox":
                return <g><path d="M15 10 L10 0 L20 5 Z" fill={furColor} stroke="#00000020" strokeWidth="1" /><path d="M49 10 L54 0 L44 5 Z" fill={furColor} stroke="#00000020" strokeWidth="1" /></g>;
            case "rabbit":
                return <g><ellipse cx="12" cy="5" rx="4" ry="12" fill={furColor} stroke="#00000020" strokeWidth="1" /><ellipse cx="52" cy="5" rx="4" ry="12" fill={furColor} stroke="#00000020" strokeWidth="1" /></g>;
            case "dog":
                return <g><ellipse cx="14" cy="18" rx="6" ry="10" fill={furColor} stroke="#00000020" strokeWidth="1" /><ellipse cx="50" cy="18" rx="6" ry="10" fill={furColor} stroke="#00000020" strokeWidth="1" /></g>;
            case "bear":
            case "lion":
                return <g><circle cx="12" cy="12" r="7" fill={furColor} stroke="#00000020" strokeWidth="1" /><circle cx="52" cy="12" r="7" fill={furColor} stroke="#00000020" strokeWidth="1" /></g>;
            case "deer":
                return <g><path d="M12 8 L8 0 L10 2 L12 0 L14 2 L16 0 L18 8" fill="#8b7355" stroke="#00000020" strokeWidth="1" /><path d="M52 8 L48 0 L50 2 L52 0 L54 2 L56 0 L58 8" fill="#8b7355" stroke="#00000020" strokeWidth="1" /></g>;
            case "bird":
            case "owl":
            case "eagle":
            case "peacock":
                return <g><path d="M10 15 L8 10 L15 12 Z" fill={furColor} stroke="#00000020" strokeWidth="1" /><path d="M54 15 L56 10 L49 12 Z" fill={furColor} stroke="#00000020" strokeWidth="1" /></g>;
            default:
                return <g><ellipse cx="14" cy="15" rx="5" ry="8" fill={furColor} stroke="#00000020" strokeWidth="1" /><ellipse cx="50" cy="15" rx="5" ry="8" fill={furColor} stroke="#00000020" strokeWidth="1" /></g>;
        }
    };

    // Determine nose/snout based on animal
    const getNose = () => {
        if (["cat", "fox", "dog", "wolf"].includes(animalType)) {
            return <ellipse cx="32" cy="40" rx="4" ry="3" fill="#000000" opacity="0.8" />;
        } else if (["rabbit", "deer", "sheep"].includes(animalType)) {
            return <ellipse cx="32" cy="38" rx="3" ry="2" fill="#ffb3ba" />;
        } else if (["bird", "owl", "eagle", "peacock"].includes(animalType)) {
            return <path d="M32 35 L28 42 L36 42 Z" fill="#ffa500" />;
        }
        return <ellipse cx="32" cy="40" rx="3" ry="2" fill="#000000" opacity="0.6" />;
    };

    return (
        <div
            className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 to-blue-50 ${className}`}
            style={{
                width: typeof size === 'number' ? `${size}px` : size,
                height: typeof size === 'number' ? `${size}px` : size,
            }}
        >
            {/* Soft background pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id={`dots-${typeId}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="10" r="2" fill={primaryColor} />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#dots-${typeId})`} />
                </svg>
            </div>

            {/* Main character */}
            <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
            >
                <svg viewBox="0 0 64 64" className="w-[90%] h-[90%] drop-shadow-xl">
                    {/* Shadow */}
                    <ellipse cx="32" cy="58" rx="18" ry="5" fill="black" opacity="0.15" />

                    {/* Body */}
                    <motion.g
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 10 }}
                    >
                        {/* Head */}
                        <ellipse cx="32" cy="28" rx="20" ry="22" fill={furColor} stroke="#00000015" strokeWidth="2" />
                        <defs>
                            <radialGradient id={`shine-${typeId}`}>
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <ellipse cx="32" cy="28" rx="20" ry="22" fill={`url(#shine-${typeId})`} />

                        {/* Ears */}
                        {getEarShape()}

                        {/* Eyes */}
                        <g>
                            {/* Left eye */}
                            <ellipse cx="24" cy="26" rx="5" ry="6" fill="white" />
                            <ellipse cx="24" cy="27" rx="3" ry="4" fill={eyeColor} />
                            <circle cx="23" cy="25" r="1.5" fill="white" opacity="0.8" />

                            {/* Right eye */}
                            <ellipse cx="40" cy="26" rx="5" ry="6" fill="white" />
                            <ellipse cx="40" cy="27" rx="3" ry="4" fill={eyeColor} />
                            <circle cx="39" cy="25" r="1.5" fill="white" opacity="0.8" />
                        </g>

                        {/* Nose/Beak */}
                        {getNose()}

                        {/* Mouth */}
                        {personality === "peppy" && <path d="M28 42 Q32 45 36 42" stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round" />}
                        {personality === "lazy" && <ellipse cx="32" cy="43" rx="3" ry="2" fill="#000000" opacity="0.3" />}
                        {personality === "cranky" && <path d="M28 44 L36 44" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />}
                        {personality === "snooty" && <path d="M28 43 Q32 41 36 43" stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round" />}
                        {personality === "normal" && <path d="M28 43 Q32 44 36 43" stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round" />}
                        {personality === "smug" && <path d="M28 42 Q32 44 36 42" stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round" />}
                        {personality === "jock" && <path d="M28 43 Q32 46 36 43" stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round" />}

                        {/* Blush */}
                        <ellipse cx="16" cy="32" rx="4" ry="3" fill="#ffb3ba" opacity="0.4" />
                        <ellipse cx="48" cy="32" rx="4" ry="3" fill="#ffb3ba" opacity="0.4" />

                        {/* Body (simplified) */}
                        <ellipse cx="32" cy="52" rx="16" ry="10" fill={furColor} opacity="0.9" />

                        {/* Accessory rendering */}
                        {accessory === "rose" && (
                            <g transform="translate(42, 18)">
                                <circle cx="0" cy="0" r="3" fill="#ff6b9d" />
                                <circle cx="-2" cy="1" r="2" fill="#ff6b9d" />
                                <circle cx="2" cy="1" r="2" fill="#ff6b9d" />
                            </g>
                        )}
                        {accessory === "bow" && (
                            <g transform="translate(32, 8)">
                                <path d="M-6 0 L-3 -2 L0 0 L-3 2 Z" fill="#ff69b4" />
                                <path d="M6 0 L3 -2 L0 0 L3 2 Z" fill="#ff69b4" />
                                <circle cx="0" cy="0" r="2" fill="#ff1493" />
                            </g>
                        )}
                        {accessory === "glasses" && (
                            <g>
                                <circle cx="24" cy="26" r="6" fill="none" stroke="#333" strokeWidth="1.5" />
                                <circle cx="40" cy="26" r="6" fill="none" stroke="#333" strokeWidth="1.5" />
                                <line x1="30" y1="26" x2="34" y2="26" stroke="#333" strokeWidth="1.5" />
                            </g>
                        )}
                        {accessory === "crown" && (
                            <g transform="translate(32, 6)">
                                <path d="M-8 0 L-6 -5 L-3 -2 L0 -6 L3 -2 L6 -5 L8 0 Z" fill="#ffd700" stroke="#ffaa00" strokeWidth="1" />
                                <circle cx="-6" cy="-5" r="1.5" fill="#ff0000" />
                                <circle cx="0" cy="-6" r="1.5" fill="#ff0000" />
                                <circle cx="6" cy="-5" r="1.5" fill="#ff0000" />
                            </g>
                        )}
                        {accessory === "flower" && (
                            <g transform="translate(45, 20)">
                                <circle cx="0" cy="0" r="2" fill="#ffeb3b" />
                                <circle cx="-2" cy="-1" r="2" fill="#ffeb3b" />
                                <circle cx="2" cy="-1" r="2" fill="#ffeb3b" />
                                <circle cx="-1" cy="2" r="2" fill="#ffeb3b" />
                                <circle cx="1" cy="2" r="2" fill="#ffeb3b" />
                                <circle cx="0" cy="0" r="1" fill="#ff9800" />
                            </g>
                        )}
                        {accessory === "halo" && (
                            <ellipse cx="32" cy="4" rx="12" ry="3" fill="none" stroke="#ffd700" strokeWidth="2" opacity="0.8" />
                        )}
                    </motion.g>
                </svg>
            </motion.div>

            {/* Floating leaves/petals */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full z-5"
                    style={{
                        backgroundColor: i % 2 === 0 ? '#ffb3ba' : '#bae1ff',
                        opacity: 0.4
                    }}
                    animate={{
                        x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                        y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                        rotate: [0, 360],
                        opacity: [0.2, 0.6, 0.2]
                    }}
                    transition={{
                        duration: 6 + Math.random() * 4,
                        repeat: Infinity,
                        delay: i * 1.5
                    }}
                />
            ))}
        </div>
    );
}
