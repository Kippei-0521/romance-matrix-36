"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText, Send, Sparkles, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { generateReport } from "@/app/actions/generate-report";

export default function ReportPage() {
    const [topic, setTopic] = useState("");
    const [keywords, setKeywords] = useState("");
    const [wordCount, setWordCount] = useState("1000");
    const [tone, setTone] = useState("da-dearu");
    const [result, setResult] = useState<{ title: string; content: string } | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        setResult(null);

        const formData = new FormData();
        formData.append("topic", topic);
        formData.append("wordCount", wordCount);
        formData.append("tone", tone);
        formData.append("keywords", keywords);

        try {
            const res = await generateReport(formData);
            if (res.success) {
                setResult({ title: res.title, content: res.content });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <main className="min-h-screen relative flex flex-col md:flex-row">
            {/* Background */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 bg-slate-900">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[150px]" />
            </div>

            {/* Sidebar / Form Panel */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-[400px] lg:w-[480px] p-6 md:p-8 md:h-screen overflow-y-auto glass border-r border-white/5 flex flex-col relative z-10"
            >
                <Link href="/" className="mb-8 inline-flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium group">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    ホームに戻る
                </Link>

                <div className="mb-8">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                        <BookOpen size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Report Generator</h1>
                    <p className="text-slate-400 text-sm">テーマを入力するだけで、構成案から本文まで執筆。2000字レポートも数分で。</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                    <div className="space-y-2">
                        <label htmlFor="topic" className="text-sm font-medium text-slate-300">
                            課題テーマ <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="topic"
                            type="text"
                            required
                            placeholder="例: 日本における少子高齢化の影響"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="keywords" className="text-sm font-medium text-slate-300">
                            必須キーワード (カンマ区切り)
                        </label>
                        <textarea
                            id="keywords"
                            rows={3}
                            placeholder="例: 年金制度, 労働力不足, 地域コミュニティ"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="wordCount" className="text-sm font-medium text-slate-300">
                                文字数目安
                            </label>
                            <select
                                id="wordCount"
                                value={wordCount}
                                onChange={(e) => setWordCount(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none"
                            >
                                <option value="1000">1000文字</option>
                                <option value="2000">2000文字</option>
                                <option value="3000">3000文字</option>
                                <option value="5000">5000文字以上</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="tone" className="text-sm font-medium text-slate-300">
                                文体
                            </label>
                            <select
                                id="tone"
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none"
                            >
                                <option value="da-dearu">だ・である調</option>
                                <option value="desu-masu">です・ます調</option>
                                <option value="academic">アカデミック (硬め)</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isGenerating || !topic}
                        className={`w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] ${isGenerating ? "opacity-80 cursor-wait" : "hover:shadow-blue-500/40 hover:-translate-y-0.5"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        <span className="flex items-center justify-center gap-2 relative z-10">
                            {isGenerating ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>生成中...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    <span>レポートを生成する</span>
                                </>
                            )}
                        </span>
                    </button>
                </form>
            </motion.div>

            {/* Main Content / Preview Area */}
            <div className="flex-1 p-6 md:p-8 h-screen overflow-hidden flex flex-col relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

                {result ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="h-full flex flex-col max-w-4xl mx-auto w-full glass rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                    >
                        {/* Toolbar */}
                        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/40 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <FileText className="text-blue-400" size={20} />
                                <span className="font-semibold text-white truncate max-w-[200px] md:max-w-md">{result.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
                                    Draft saved
                                </button>
                                <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/20 transition-colors">
                                    Export PDF
                                </button>
                            </div>
                        </div>

                        {/* Editor Area */}
                        <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-slate-900/20 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <article className="prose prose-invert prose-lg max-w-none">
                                <h1 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">{result.title}</h1>
                                <div className="whitespace-pre-wrap text-slate-300 leading-relaxed font-serif">
                                    {result.content}
                                </div>
                            </article>
                        </div>
                    </motion.div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto p-6">
                        {!isGenerating ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-6"
                            >
                                <div className="w-24 h-24 rounded-full bg-slate-800/50 border border-white/5 flex items-center justify-center mx-auto shadow-inner">
                                    <Sparkles className="text-slate-600" size={40} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-200 mb-2">準備完了</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        左側のフォームにテーマやキーワードを入力して、<br />
                                        「レポートを生成する」ボタンを押してください。<br />
                                        AIがあなたの代わりに執筆を開始します。
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="space-y-8 w-full">
                                <div className="relative w-24 h-24 mx-auto">
                                    <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-pulse"></div>
                                    <div className="absolute inset-0 rounded-full border-t-4 border-blue-500 animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Send className="text-blue-400 animate-bounce" size={24} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white animate-pulse">執筆中...</h3>
                                    <p className="text-slate-400 text-sm">構成案を作成し、本文を推敲しています</p>
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
