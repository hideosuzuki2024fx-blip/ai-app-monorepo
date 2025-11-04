import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// .env.localからAPIキーを読み込む
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    // ユーザーからの入力 (元の動画タイトル) を取得
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // AIへのプロンプト設定 (佐藤葵さんを顧客とするためのプロンプト)
    const prompt = \あなたはプロのYouTube収益化コンサルタントです。
以下の動画タイトルを、クリック率が最大化するよう具体的に修正してください。
特に、ターゲットである「チャンネル登録者1万人以下のクリエイター」に響くように調整してください。

元のタイトル: "\"

出力形式は、修正後のタイトルのみを返してください。不要な説明や挨拶は含めないでください。\;

    // Gemini APIの呼び出し
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // 高速なモデルを選択
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // 修正されたタイトルを抽出してクライアントに返す
    const revisedTitle = response.text.trim();

    return NextResponse.json({ revisedTitle });
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json({ error: "Failed to generate title" }, { status: 500 });
  }
}
