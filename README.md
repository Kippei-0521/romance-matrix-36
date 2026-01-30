# UniAuto | 大学生のための課題自動化AI

![UniAuto Banner](https://via.placeholder.com/1200x600/0f172a/3b82f6?text=UniAuto)

**UniAuto** は、大学生が直面するレポート、演習問題、プログラミング、翻訳などのあらゆる課題を「魔法のように」解決するAIアシスタントプラットフォームです。
"Futuristic Academia" をテーマにした没入感のあるデザインと、Google Gemini Pro を活用した高度な生成能力を備えています。

## ✨ 主な機能

### 1. 📝 Report Generator (レポート生成)
テーマとキーワードを入力するだけで、構成案から本文までを自動執筆します。
- **文体指定**: 「だ・である調」「です・ます調」「アカデミック」から選択可能。
- **長文対応**: 1000文字〜5000文字以上のレポートに対応。

### 2. 📸 Snap & Solve (画像問題解決)
プリントや教科書、PC画面の問題を撮影してアップロードするだけで、AIが解答と解説を生成します。
- **クリップボード連携**: スクリーンショットを `Ctrl+V` で直接貼り付け可能。
- **数式・文系対応**: 数学の行列計算から、歴史の史料問題まで幅広く解析。

### 3. 📊 Dashboard (ダッシュボード)
学習の進捗と生成履歴を一元管理します。
- **統計表示**: 節約できた時間や生成数を可視化。
- **履歴管理**: 過去の課題にすぐにアクセス可能。

---

## 🛠 技術スタック

- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion (Animations)
- **AI**: Google Gemini API (gemini-1.5-flash)
- **Backend**: Server Actions

---

## 🚀 セットアップガイド

### 前提条件
- Node.js v18 以上
- Google Gemini API Key (オプション: AI生成を有効にする場合)

### インストール

```bash
# 依存関係のインストール
npm install
```

### 環境変数の設定 (AI機能を使う場合)

プロジェクトルートに `.env.local` ファイルを作成し、APIキーを設定してください。
※ 設定しない場合は、モック（サンプル）データモードで動作します。

```bash
GOOGLE_API_KEY=your_gemini_api_key_here
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

---

## 🎨 プロジェクト構造

```
src/
├── app/
│   ├── actions/      # Server Actions (API連携ロジック)
│   ├── dashboard/    # マイページ・履歴画面
│   ├── report/       # レポート生成画面
│   ├── snap/         # 画像問題解決画面
│   ├── layout.tsx    # 全体レイアウト・フォント設定
│   ├── page.tsx      # ランディングページ
│   └── globals.css   # Tailwind v4 テーマ設定
```

---

## 🔮 Future Roadmap

- [ ] **LMS連携 (Companion Mode)**: 大学ポータルサイト上での直接解答支援（Chrome拡張）。
- [ ] **Code Assistant**: プログラミング課題のコード実行環境の統合。
- [ ] **PDF要約**: 論文PDFの解説・翻訳機能。
- [ ] **ユーザー認証**: Supabase を用いたログイン・データ保存。

---

© 2026 UniAuto Project.
