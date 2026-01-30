---
description: How to deploy this personality quiz to the web
---

# Deployment Guide

This project is built with Next.js and is optimized for deployment on **Vercel**, **Netlify**, or any other modern hosting platform.

## 🚀 Option 1: Vercel (Recommended)

Vercel is the creator of Next.js and provides the easiest "one-click" deployment experience.

1. **Push your code to GitHub/GitLab/Bitbucket**
   - Create a new repository.
   - Run:
     ```bash
     git init
     git add .
     git commit -m "feat: complete 36-type personality quiz"
     git remote add origin YOUR_REPO_URL
     git push -u origin main
     ```
2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign up (free for personal use).
   - Click "Add New" -> "Project".
   - Import your GitHub repository.
3. **Deploy**
   - Vercel will automatically detect Next.js settings.
   - Click "Deploy". Your site will be live at `https://your-project-name.vercel.app`!

## 🌐 Option 2: Netlify

1. Sign up at [netlify.com](https://netlify.com).
2. Click "Add new site" -> "Import an existing project".
3. Connect your GitHub account and select this repository.
4. Netlify will detect the Next.js build settings. Click "Deploy".

## 🛠 Pre-deployment Check

Before deploying, ensure your build command works locally:
```bash
npm run build
```
This ensures there are no TypeScript or Linting errors that would break the production build.

## 🔑 Environment Variables

If you added any API keys (like Google Gemini) in `.env.local`, make sure to add them in your hosting provider's "Environment Variables" settings!
