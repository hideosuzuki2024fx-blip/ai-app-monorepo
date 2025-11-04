import { Upload, FileText, Lock, Unlock, Zap } from 'lucide-react';
import React, { useState } from 'react';

// ダミーデータ（知人テスト用）
const DUMMY_SCORE = 8.2;
const PREMIUM_INSTRUCTIONS = [
  "❌ 4秒〜6秒の導入部分を2秒短縮。視聴者の初動離脱率が下がります。",
  "❌ タイトル末尾に「【プロが教える】」を追加。クリック率が18%向上します。",
  "❌ 動画のテーマに合わせたBGM（静けさ）を追加。視聴維持率が5%向上します。",
];
const DUMMY_VIDEO_NAME = "My_Latest_Vlog_0305.mp4";

// 状態管理（クライアントコンポーネントに変更が必要なため）
const TestPage = () => {
  const [uploaded, setUploaded] = useState(true); // テストのために、デフォルトでアップロード済み
  const [trialUsed, setTrialUsed] = useState(false); // トライアルボタンの状態管理

  const handleTrialClick = () => {
      setTrialUsed(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-700">AIシーン構造化クリエイター</h1>
        <p className="text-xl text-gray-500 mt-2">クローズドテスト用 パイロット版</p>
      </header>

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* A. ステップ表示 */}
        <div className="flex justify-around text-center">
            <div className="w-1/3 p-3 border-b-4 border-blue-500 text-blue-700 font-bold">1. ファイルアップロード</div>
            <div className="w-1/3 p-3 border-b-4 border-blue-200 text-gray-500">2. AI分析結果表示</div>
            <div className="w-1/3 p-3 border-b-4 border-blue-200 text-gray-500">3. 改善案適用</div>
        </div>

        {/* アップロードUI (変更なし) */}
        <div className="p-8 bg-white border-2 border-dashed border-gray-300 rounded-xl shadow-lg flex flex-col items-center">
          <Upload className="w-12 h-12 text-blue-500 mb-4" />
          <p className="text-lg font-semibold text-gray-700">動画ファイルをここにドラッグ＆ドロップ</p>
          <p className="text-sm text-gray-500 mt-1">またはクリックしてファイルを選択 (最大 1GB)</p>
          {uploaded && (
              <div className="mt-4 flex items-center bg-green-50 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-700">{DUMMY_VIDEO_NAME} がアップロードされました。</span>
              </div>
          )}
        </div>

        {uploaded && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">✅ AI分析結果 (無料機能)</h2>

            {/* スコア表示 (変更なし) */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 flex justify-between items-center">
              <div>
                <p className="text-xl font-medium text-gray-600">エンゲージメントスコア (E-Score)</p>
                <p className="text-sm text-gray-400">プロのクリエイターが重視する評価指標</p>
              </div>
              <div className="text-5xl font-extrabold text-blue-700 bg-blue-50 px-4 py-2 rounded-lg">{DUMMY_SCORE}/10.0</div>
            </div>

            {/* 修正指示（ダミー/有料機能） */}
            <div className="bg-gray-800 text-white p-6 rounded-xl shadow-2xl relative">
              <h3 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-2">AIからの具体的な改善提案</h3>
              
              <ul className="space-y-3">
                {/* 1. トライアルヒント (常に表示) */}
                <li className="flex items-start bg-gray-700 p-3 rounded-lg border-l-4 border-green-400">
                    <Zap className="w-5 h-5 text-green-400 mr-2 mt-1" />
                    <span className="text-sm font-medium">🔥 **トライアル公開** {PREMIUM_INSTRUCTIONS[0].replace('❌', '')}</span>
                </li>

                {/* 2. ロックされたヒント */}
                {PREMIUM_INSTRUCTIONS.slice(1).map((item, index) => (
                    <li key={index} className="flex items-start p-3 rounded-lg bg-gray-900 border-l-4 border-gray-600 relative">
                        {trialUsed ? (
                            // トライアル後: 通常のロック表示
                            <>
                                <Lock className="w-5 h-5 text-yellow-400 mr-2 mt-1" />
                                <span className="text-sm opacity-50">PREMIUM限定ヒント (ロック中)</span>
                            </>
                        ) : (
                            // トライアル前: ボタン表示
                            <>
                                <div className="absolute inset-0 bg-gray-900 opacity-80 backdrop-blur-sm flex justify-center items-center">
                                    <button
                                        onClick={handleTrialClick}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-5 rounded-full transition duration-150 shadow-lg flex items-center"
                                    >
                                        <Unlock className="w-4 h-4 mr-2" />
                                        残りのヒントを解除 (.99/月)
                                    </button>
                                </div>
                                <span className="text-sm opacity-20">{item.replace('❌', '')}</span>
                            </>
                        )}
                    </li>
                ))}
              </ul>
            </div>
            
            <footer className="text-center pt-4">
                <p className="text-sm text-gray-500 mb-2">トライアルでAIの精度を確認してください。</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-150 shadow-lg">
                    PREMIUMプランを試す (.99/月)
                </button>
            </footer>

          </section>
        )}
      </div>
    </div>
  );
};

// Next.js のサーバーコンポーネントをクライアントコンポーネントとして使用するための宣言
export default () => <TestPage />;
