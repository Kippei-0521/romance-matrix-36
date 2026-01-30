"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MinecraftAvatarProps {
    typeId: string;
    visual: {
        mobType: string;
        skinColor: string;
        eyeColor: string;
        item: string;
        accessory: string;
    };
    primaryColor: string;
    size?: number | string;
    className?: string;
}

const PixelBox = ({ x, y, w, h, color, className = "" }: { x: number; y: number; w: number; h: number; color: string; className?: string }) => (
    <rect x={x} y={y} width={w} height={h} fill={color} className={className} rx={1} ry={1} />
);

const MinecraftItem = ({ type, color }: { type: string; color: string }) => {
    // Simple pixel icons
    switch (type) {
        case "DiamondSword":
            return (
                <g transform="translate(10, 10) scale(0.8)">
                    <rect x="14" y="0" width="4" height="4" fill="#5bc0eb" />
                    <rect x="10" y="4" width="4" height="4" fill="#5bc0eb" />
                    <rect x="6" y="8" width="4" height="4" fill="#5bc0eb" />
                    <rect x="2" y="12" width="4" height="4" fill="#2c3e50" />
                    <rect x="0" y="16" width="4" height="4" fill="#2c3e50" />
                </g>
            );
        case "Rose":
            return (
                <g transform="translate(12, 12)">
                    <rect x="0" y="0" width="4" height="4" fill="#e63946" />
                    <rect x="4" y="0" width="4" height="4" fill="#e63946" />
                    <rect x="2" y="4" width="2" height="6" fill="#2a9d8f" />
                </g>
            );
        case "Book":
            return (
                <g transform="translate(10, 10)">
                    <rect x="0" y="0" width="10" height="12" fill="#bc4749" />
                    <rect x="2" y="2" width="6" height="1" fill="#f1faee" />
                    <rect x="2" y="5" width="6" height="1" fill="#f1faee" />
                </g>
            );
        case "Heart":
            return (
                <g transform="translate(10, 10)">
                    <path d="M5 2 L7 0 L10 0 L12 2 L12 5 L6 11 L0 5 L0 2 L3 0 L5 2" fill="#ff4d6d" />
                </g>
            );
        // Add more cases as needed or use a fallback
        default:
            return (
                <circle cx="20" cy="20" r="5" fill={color} />
            );
    }
};

export default function MinecraftAvatar({ typeId, visual, primaryColor, size = "100%", className = "" }: MinecraftAvatarProps) {
    const { mobType, skinColor, eyeColor, item, accessory } = visual;

    return (
        <div
            className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#8b8b8b] border-4 border-[#555] shadow-inner ${className}`}
            style={{
                width: typeof size === 'number' ? `${size}px` : size,
                height: typeof size === 'number' ? `${size}px` : size,
                backgroundImage: 'repeating-conic-gradient(#777 0% 25%, #888 0% 50%)',
                backgroundSize: '20px 20px'
            }}
        >
            <svg viewBox="0 0 64 64" className="w-[85%] h-[85%] drop-shadow-2xl">
                {/* Shadow */}
                <ellipse cx="32" cy="58" rx="15" ry="4" fill="black" opacity="0.2" />

                {/* Character Rendering */}
                <motion.g
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    {mobType === "human" && (
                        <g>
                            {/* Legs */}
                            <PixelBox x={24} y={48} w={6} h={10} color="#2c3e50" />
                            <PixelBox x={34} y={48} w={6} h={10} color="#2c3e50" />
                            {/* Body */}
                            <PixelBox x={24} y={32} w={16} h={16} color={primaryColor} />
                            {/* Arms */}
                            <PixelBox x={16} y={32} w={6} h={12} color={skinColor} />
                            <PixelBox x={42} y={32} w={6} h={12} color={skinColor} />
                            {/* Head */}
                            <PixelBox x={20} y={12} w={24} h={20} color={skinColor} />
                            {/* Eyes */}
                            <PixelBox x={26} y={20} w={4} h={4} color="white" />
                            <PixelBox x={34} y={20} w={4} h={4} color="white" />
                            <PixelBox x={28} y={21} w={2} h={2} color={eyeColor} />
                            <PixelBox x={34} y={21} w={2} h={2} color={eyeColor} />
                            {/* Mouth */}
                            <PixelBox x={30} y={28} w={4} h={2} color="#000" />
                        </g>
                    )}

                    {mobType === "owl" && (
                        <g>
                            <PixelBox x={20} y={25} w={24} h={25} color={skinColor} />
                            <PixelBox x={24} y={32} w={6} h={6} color="white" />
                            <PixelBox x={34} y={32} w={6} h={6} color="white" />
                            <PixelBox x={26} y={34} w={3} h={3} color={eyeColor} />
                            <PixelBox x={35} y={34} w={3} h={3} color={eyeColor} />
                            <PixelBox x={30} y={40} w={4} h={4} color="#fca311" />
                        </g>
                    )}

                    {mobType === "robot" && (
                        <g>
                            <PixelBox x={20} y={30} w={24} h={24} color="#adb5bd" />
                            <PixelBox x={24} y={15} w={16} h={15} color="#6c757d" />
                            <PixelBox x={26} y={20} w={4} h={4} color={eyeColor} />
                            <PixelBox x={34} y={20} w={4} h={4} color={eyeColor} />
                            <rect x={31} y={10} width={2} height={5} fill="#f00" />
                        </g>
                    )}

                    {/* Ender-style (enigmatic) */}
                    {mobType === "enderman" && (
                        <g>
                            <PixelBox x={28} y={10} w={8} h={45} color={skinColor} />
                            <PixelBox x={24} y={5} w={16} h={16} color={skinColor} />
                            <PixelBox x={26} y={10} w={4} h={2} color={eyeColor} />
                            <PixelBox x={34} y={10} w={4} h={2} color={eyeColor} />
                        </g>
                    )}

                    {/* Animal Fallback (Wolf/Cat/Fox/Dog) */}
                    {["wolf", "cat", "fox", "dog", "eagle", "phoenix"].includes(mobType) && (
                        <g>
                            <PixelBox x={22} y={35} w={20} h={15} color={skinColor} />
                            <PixelBox x={24} y={25} w={16} h={12} color={skinColor} />
                            <PixelBox x={26} y={28} w={3} h={3} color={eyeColor} />
                            <PixelBox x={34} y={28} w={3} h={3} color={eyeColor} />
                            {/* Ears */}
                            <PixelBox x={24} y={22} w={4} h={4} color={skinColor} />
                            <PixelBox x={36} y={22} w={4} h={4} color={skinColor} />
                        </g>
                    )}

                    {/* Accessory Rendering */}
                    {accessory === "Helmet" && <PixelBox x={20} y={10} w={24} h={8} color="#999" />}
                    {accessory === "Crown" && <PixelBox x={24} y={8} w={16} h={6} color="#ffd700" />}
                    {accessory === "Headphones" && (
                        <g>
                            <PixelBox x={18} y={15} w={4} h={10} color="#333" />
                            <PixelBox x={42} y={15} w={4} h={10} color="#333" />
                            <PixelBox x={22} y={12} w={20} h={4} color="#333" />
                        </g>
                    )}
                    {accessory === "Halo" && (
                        <ellipse cx="32" cy="8" rx="10" ry="3" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="2 2" />
                    )}

                    {/* Held Item */}
                    <motion.g
                        animate={{ rotate: [-5, 5, -5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ transformOrigin: "45px 40px" }}
                    >
                        <MinecraftItem type={item} color={primaryColor} />
                    </motion.g>
                </motion.g>
            </svg>

            {/* Retro Pixel Particles */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 z-10 opacity-30"
                    style={{ backgroundColor: primaryColor }}
                    animate={{
                        x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                        y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: i }}
                />
            ))}
        </div>
    );
}
