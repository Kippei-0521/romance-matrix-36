"use client";

import { motion } from "framer-motion";
import {
    History,
    FileText,
    Settings,
    LogOut,
    Plus,
    Search,
    MoreHorizontal,
    Clock,
    Sparkles,
    Camera,
    Code2,
    Languages
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock Data
const MOCK_HISTORY = [
    { id: 1, type: "report", title: "日本文化における「わび・さび」の考察", date: "2026-01-30 14:20", status: "completed", summary: "茶道と禅宗の影響を中心に、現代デザインへの応用可能性について論述。" },
    { id: 2, type: "snap", title: "線形代数学 II - 第3回課題", date: "2026-01-29 09:15", status: "completed", summary: "行列の固有値・固有ベクトルの計算問題（全4問）の解答解説。" },
    { id: 3, type: "code", title: "Python データ分析スクリプト", date: "2026-01-28 22:40", status: "draft", summary: "Pandasを用いたCSVデータの読み込みと可視化処理の実装。" },
    { id: 4, type: "trans", title: "Cognitive Science Review (en->ja)", date: "2026-01-25 11:00", status: "completed", summary: "認知科学論文の要約翻訳（2000words -> 800字）。" },
];

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("all");

    return (
        <main className="min-h-screen bg-slate-900 text-white flex relative overflow-hidden">
            {/* Background */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[30%] left-[10%] w-[30%] h-[30%] bg-blue-600/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-violet-600/5 rounded-full blur-[100px]" />
            </div>

            {/* Sidebar Navigation */}
            <aside className="w-64 border-r border-white/5 bg-slate-900/50 backdrop-blur-xl hidden md:flex flex-col p-6 sticky top-0 h-screen">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                        <Sparkles size={16} />
                    </div>
                    <span className="font-bold text-xl tracking-tight">UniAuto</span>
                </div>

                <nav className="space-y-1 flex-1">
                    <NavItem icon={<History size={18} />} label="履歴・保存済み" active />
                    <NavItem icon={<Settings size={18} />} label="設定" />
                </nav>

                <div className="pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 border border-white/10" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Kippei Student</p>
                            <p className="text-xs text-slate-500 truncate">Free Plan</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-3 px-2 py-2 text-slate-400 hover:text-white text-sm transition-colors w-full text-left rounded-lg hover:bg-white/5">
                        <LogOut size={16} />
                        ログアウト
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 md:px-10 bg-slate-900/50 backdrop-blur-md z-10">
                    <h1 className="text-lg font-semibold text-slate-200">ダッシュボード</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                            <input
                                type="text"
                                placeholder="履歴を検索..."
                                className="bg-slate-800/50 border border-white/5 rounded-full pl-9 pr-4 py-1.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 placeholder-slate-600 w-64 transition-all"
                            />
                        </div>
                        <Link href="/report" className="btn-primary text-sm px-4 py-2 rounded-lg gap-2 shadow-blue-500/20">
                            <Plus size={16} />
                            新規作成
                        </Link>
                    </div>
                </header>

                {/* Content Body */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-thin scrollbar-thumb-white/10">
                    <div className="max-w-6xl mx-auto">

                        {/* Stats / Quick Access */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                            <StatCard label="今月の生成数" value="12" sub="件" trend="+4" />
                            <StatCard label="節約できた時間" value="8.5" sub="時間" trend="+2.1h" />
                            <StatCard label="API利用トークン" value="45k" sub="/ 100k" trend="45%" isProgress />
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-1 overflow-x-auto">
                            <TabButton active={activeTab === "all"} onClick={() => setActiveTab("all")} label="すべて" />
                            <TabButton active={activeTab === "report"} onClick={() => setActiveTab("report")} label="レポート" />
                            <TabButton active={activeTab === "snap"} onClick={() => setActiveTab("snap")} label="問題解決" />
                            <TabButton active={activeTab === "code"} onClick={() => setActiveTab("code")} label="コード" />
                        </div>

                        {/* History List */}
                        <div className="space-y-4">
                            {MOCK_HISTORY.filter(h => activeTab === "all" || h.type === activeTab).map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group relative flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer"
                                >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-white/5 ${item.type === 'report' ? 'bg-blue-500/10 text-blue-400' :
                                            item.type === 'snap' ? 'bg-purple-500/10 text-purple-400' :
                                                item.type === 'code' ? 'bg-cyan-500/10 text-cyan-400' :
                                                    'bg-pink-500/10 text-pink-400'
                                        }`}>
                                        {item.type === 'report' && <FileText size={20} />}
                                        {item.type === 'snap' && <Camera size={20} />}
                                        {item.type === 'code' && <Code2 size={20} />}
                                        {item.type === 'trans' && <Languages size={20} />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-medium text-slate-200 truncate">{item.title}</h3>
                                            {item.status === 'draft' && (
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">Draft</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-500 truncate">{item.summary}</p>
                                    </div>

                                    <div className="flex items-center gap-6 text-sm text-slate-500 shrink-0">
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={14} />
                                            <span>{item.date}</span>
                                        </div>
                                        <button className="p-2 -mr-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active
                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}>
            {icon}
            {label}
        </button>
    );
}

function StatCard({ label, value, sub, trend, isProgress = false }: { label: string, value: string, sub?: string, trend: string, isProgress?: boolean }) {
    return (
        <div className="glass-card p-5 !bg-slate-800/40 border border-white/5">
            <p className="text-sm font-medium text-slate-400 mb-2">{label}</p>
            <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold text-white">{value}</span>
                {sub && <span className="text-sm text-slate-500">{sub}</span>}
            </div>

            {isProgress ? (
                <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden mt-1">
                    <div className="h-full bg-blue-500 w-[45%]" />
                </div>
            ) : (
                <span className="inline-flex items-center text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                    {trend}
                </span>
            )}
        </div>
    );
}

function TabButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${active
                    ? "bg-white text-slate-900 shadow-lg shadow-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
        >
            {label}
        </button>
    );
}
