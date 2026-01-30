"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Camera,
    Upload,
    X,
    ArrowRight,
    Image as ImageIcon,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock API function for image solving
async function solveImageProblem(file: File) {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    return {
        success: true,
        question: "次の行列 A の固有値を求めよ。\n\\[ A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix} \\]",
        answer: "固有値 λ = 1, 3",
        explanation: `
### 解説
1. **特性方程式を立てる**
   固有値を $\\lambda$ とすると、特性方程式は $|A - \\lambda E| = 0$ である。
   \\[
   \\left| \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix} - \\begin{pmatrix} \\lambda & 0 \\\\ 0 & \\lambda \\end{pmatrix} \\right| = 0
   \\]
   \\[
   \\begin{vmatrix} 2-\\lambda & 1 \\\\ 1 & 2-\\lambda \\end{vmatrix} = 0
   \\]

2. **行列式を計算する**
   \\[
   (2-\\lambda)(2-\\lambda) - 1 \\cdot 1 = 0
   \\]
   \\[
   (2-\\lambda)^2 - 1 = 0
   \\]

3. **方程式を解く**
   \\[
   ((2-\\lambda) - 1)((2-\\lambda) + 1) = 0
   \\]
   \\[
   (1-\\lambda)(3-\\lambda) = 0
   \\]
   よって、$\\lambda = 1, 3$

### 補足
文系選択科目（社会科学のための数学など）でも頻出の基礎問題です。
行列式 $(ad-bc)$ の計算ミスに注意しましょう。
    `.trim()
    };
}

export default function SnapPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isSolving, setIsSolving] = useState(false);
    const [result, setResult] = useState<{ question: string; answer: string; explanation: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const selectedFile = e.dataTransfer.files[0];
            if (selectedFile.type.startsWith("image/")) {
                setFile(selectedFile);
                setPreview(URL.createObjectURL(selectedFile));
                setResult(null);
            }
        }
    };

    const handlePaste = async () => {
        try {
            const items = await navigator.clipboard.read();
            for (const item of items) {
                if (item.types && item.types.some(type => type.startsWith("image/"))) {
                    const blob = await item.getType(item.types.find(type => type.startsWith("image/"))!);
                    const pastedFile = new File([blob], "pasted-image.png", { type: blob.type });
                    setFile(pastedFile);
                    setPreview(URL.createObjectURL(pastedFile));
                    setResult(null);
                    break;
                }
            }
        } catch (err) {
            console.error("Failed to paste image:", err);
            alert("画像の貼り付けに失敗しました。ブラウザの権限を確認してください。");
        }
    };

    const handleSolve = async () => {
        if (!file) return;
        setIsSolving(true);
        try {
            const res = await solveImageProblem(file);
            setResult(res);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSolving(false);
        }
    };

    const clearFile = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <main className="min-h-screen bg-slate-900 text-white relative overflow-hidden flex flex-col items-center py-10 px-4">
            {/* Background */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-5xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link href="/dashboard" className="inline-flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium group">
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        ダッシュボードへ戻る
                    </Link>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold uppercase tracking-wider">
                        <Camera size={14} />
                        <span>Snap & Solve Beta</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Upload Area */}
                    <div className="space-y-6">
                        <div className="text-center lg:text-left">
                            <h1 className="text-3xl font-bold text-white mb-2">問題を撮影・アップロード</h1>
                            <p className="text-slate-400">画像から問題を自動認識し、解答と解説を生成します。<br />クリップボードからの貼り付け(Ctrl+V)も可能です。</p>
                        </div>

                        {!preview ? (
                            <div
                                className={`border-2 border-dashed rounded-2xl h-80 flex flex-col items-center justify-center transition-all cursor-pointer relative group overflow-hidden ${isDragging
                                        ? "border-purple-500 bg-purple-500/10"
                                        : "border-slate-700 bg-slate-800/30 hover:border-slate-500 hover:bg-slate-800/50"
                                    }`}
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />

                                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xl border border-white/5">
                                    <Upload className="text-purple-400" size={28} />
                                </div>
                                <p className="text-slate-300 font-medium mb-1">クリックして画像をアップロード</p>
                                <p className="text-slate-500 text-sm">またはファイルをドラッグ＆ドロップ</p>

                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handlePaste(); }}
                                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:bg-white/10 transition-colors z-10"
                                    >
                                        📋 クリップボードから貼り付け
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl group">
                                <img src={preview} alt="Problem Preview" className="w-full h-auto max-h-[500px] object-contain mx-auto" />

                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        onClick={clearFile}
                                        className="p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-red-500/80 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                {!result && !isSolving && (
                                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-center pb-8 pt-12">
                                        <button
                                            onClick={handleSolve}
                                            className="btn-primary w-full max-w-sm shadow-purple-500/25 from-purple-600 to-blue-600"
                                        >
                                            <Camera className="mr-2" size={20} />
                                            この問題を解く
                                        </button>
                                    </div>
                                )}

                                {isSolving && (
                                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                                        <Loader2 className="animate-spin text-purple-400 mb-4" size={40} />
                                        <p className="font-bold text-white text-lg animate-pulse">解析中...</p>
                                        <p className="text-slate-400 text-sm mt-2">文字認識と数式処理を行っています</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right: Result Area */}
                    <div className="flex flex-col h-full min-h-[400px]">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <ImageIcon size={20} className="text-slate-400" />
                            解析結果
                        </h2>

                        <div className="flex-1 glass rounded-2xl p-1 border border-white/5 relative overflow-hidden flex flex-col">
                            {!result ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-dashed border-white/10">
                                        <ArrowLeft size={24} className="opacity-50" />
                                    </div>
                                    <p>左側の画像を解析すると<br />ここに解答が表示されます</p>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex-1 flex flex-col h-full bg-slate-900/40"
                                >
                                    <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
                                        {/* Recognized Text */}
                                        <section>
                                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <CheckCircle2 size={14} className="text-emerald-500" />
                                                認識された問題
                                            </h3>
                                            <div className="p-4 rounded-lg bg-white/5 border border-white/5 text-slate-200 font-mono text-sm whitespace-pre-wrap">
                                                {result.question}
                                            </div>
                                        </section>

                                        {/* Answer */}
                                        <section>
                                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <CheckCircle2 size={14} className="text-emerald-500" />
                                                解答
                                            </h3>
                                            <div className="p-5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-white font-bold text-lg shadow-inner shadow-purple-500/5">
                                                {result.answer}
                                            </div>
                                        </section>

                                        {/* Explanation */}
                                        <section>
                                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <AlertCircle size={14} className="text-blue-500" />
                                                解説
                                            </h3>
                                            <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed">
                                                <div className="whitespace-pre-wrap">{result.explanation}</div>
                                            </div>
                                        </section>
                                    </div>

                                    {/* Action Bar */}
                                    <div className="p-4 border-t border-white/5 bg-slate-900/50 backdrop-blur flex justify-between items-center">
                                        <button className="text-sm text-slate-400 hover:text-white transition-colors">
                                            問題を修正する
                                        </button>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium transition-colors">
                                                コピー
                                            </button>
                                            <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-lg shadow-blue-600/20">
                                                ノートに保存
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
