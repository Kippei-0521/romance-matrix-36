"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateReport(formData: FormData) {
    const topic = formData.get("topic") as string;
    const wordCount = formData.get("wordCount") as string;
    const tone = formData.get("tone") as string;
    const keywords = formData.get("keywords") as string;

    const apiKey = process.env.GOOGLE_API_KEY;
    console.log("API Key present:", !!apiKey);


    // --- Real API Call (if API Key exists) ---
    if (apiKey) {
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const tonePrompt =
                tone === "desu-masu" ? "「です・ます調（敬体）」で親しみやすく" :
                    tone === "academic" ? "「だ・である調」かつ学術的・専門的な硬い表現で" :
                        "「だ・である調（常体）」で論理的に";

            const prompt = `
あなたは優秀な大学生または研究者になりきって、以下の条件に基づいて大学の課題レポートを作成してください。
出力は有効なJSON形式で行い、Markdownのコードブロックは含めないでください。

【条件】
- テーマ: ${topic}
- 必須キーワード: ${keywords || "特になし"}
- 文字数目安: ${wordCount}文字程度
- 文体: ${tonePrompt}

【構成案】
1. 序論 (Introduction): 背景、目的、問題提起
2. 本論 (Body): 現状分析、課題、考察、具体例（章番号を適切に振る）
3. 結論 (Conclusion): まとめ、今後の展望

【出力JSONスキーマ】
{
  "title": "レポートのタイトル",
  "content": "レポートの本文（Markdown形式。見出しは#を使用）"
}
      `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = response.text();

            // Clean up potential markdown formatting in JSON response
            text = text.replace(/```json\n|\n```/g, "").replace(/```/g, "").trim();

            try {
                const parsed = JSON.parse(text);
                return {
                    success: true,
                    title: parsed.title,
                    content: parsed.content,
                };
            } catch (e) {
                // Fallback if JSON parsing fails but text was generated
                console.warn("JSON Parse Error, falling back to raw text", e);
                return {
                    success: true,
                    title: `「${topic}」に関するレポート`,
                    content: text,
                };
            }
        } catch (error) {
            console.error("Gemini API Error:", error);
            // Fallback to mock data on error will happen below
        }
    } else {
        // Artificial delay only when using mock data to simulate processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // --- Mock Data Fallback (Default if no API key or Error) ---
    const toneStyle = tone === "desu-masu" ? "です・ます調" : "だ・である調";

    return {
        success: true,
        title: `[SAMPLE] 「${topic}」に関する考察レポート`,
        content: `
> ※ APIキーが設定されていません。環境変数 GOOGLE_API_KEY を設定すると、AIによる自動生成が有効になります。

# 1. 序論
${topic}は現代社会において重要な課題の一つである。その背景には、${keywords.split(',').slice(0, 1) || '様々な要因'}が挙げられる。本レポートでは、${topic}の現状と課題について分析し、今後の展望を考察する。（${toneStyle}）

# 2. 本論
## 2.1 現状の分析
現在、${topic}を取り巻く環境は急速に変化している。特に${keywords.split(',').slice(1, 2) || '技術的な進歩'}の影響は無視できない。

## 2.2 課題と問題点
しかしながら、いくつかの問題点も浮き彫りになってきている。
1. 第一の課題
2. 第二の課題

# 3. 結論
以上の分析から、${topic}に対する新たなアプローチが必要であると考えられる。持続可能な解決策を見出すためには、多角的な視点からの議論が不可欠である。
    `.trim(),
    };
}
