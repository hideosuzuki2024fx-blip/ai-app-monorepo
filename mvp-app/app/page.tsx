import { Upload, FileText, Lock } from 'lucide-react';

// ダミーデータ（知人テスト用）
const DUMMY_SCORE = 8.2;
const PREMIUM_INSTRUCTIONS = [
  "❌ 4秒〜6秒の導入部分を2秒短縮。視聴者の初動離脱率が下がります。",
  "❌ タイトル末尾に「【プロが教える】」を追加。クリック率が18%向上します。",
  "❌ 動画のテーマに合わせたBGM（静けさ）を追加。視聴維持率が5%向上します。",
];
const DUMMY_VIDEO_NAME = "My_Latest_Vlog_0305.mp4";

const TestPage = () => {
  // 知人テスト用の状態管理（アップロード前/後）
  const uploaded = true; // テストのために、デフォルトでアップロード済みとする

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-700">AIシーン構造化クリエイター</h1>
        <p className="text-xl text-gray-500 mt-2">クローズドテスト用 パイロット版</p>
      </header>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* A. アップロードUI (テストではダミー表示) */}
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

            {/* B. スコア表示 */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 flex justify-between items-center">
              <div>
                <p className="text-xl font-medium text-gray-600">エンゲージメントスコア (E-Score)</p>
                <p className="text-sm text-gray-400">プロのクリエイターが重視する評価指標</p>
              </div>
              <div className="text-5xl font-extrabold text-blue-700 bg-blue-50 px-4 py-2 rounded-lg">{DUMMY_SCORE}/10.0</div>
            </div>

            {/* C. 修正指示（ダミー/有料機能） */}
            <div className="bg-gray-800 text-white p-6 rounded-xl shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-900 opacity-80 backdrop-blur-sm flex justify-center items-center">
                <div className="text-center">
                  <Lock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-yellow-300">PREMIUMプラン限定</p>
                  <p className="text-sm text-gray-400 mt-1">スコアを9点に上げる具体的なAI修正指示を見る</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">AIからの具体的な改善提案</h3>
              <ul className="space-y-2 opacity-20">
                {PREMIUM_INSTRUCTIONS.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 mr-2 opacity-50">•</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <footer className="text-center pt-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-full transition duration-150 shadow-lg">
                    PREMIUMプランを試す (.99/月)
                </button>
            </footer>

          </section>
        )}
      </div>
    </div>
  );
};

export default TestPage;
