'use client';

import { Upload, Zap, Send, RefreshCw, FileText } from 'lucide-react';
import React, { useState, useCallback } from 'react';

const TestPage = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [revisedTitle, setRevivedTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // テスト用のダミー値
  const DUMMY_VIDEO_NAME = "My_Latest_Vlog_0305.mp4";
  const DUMMY_SCORE = 8.2;

  const handleTitleSubmit = useCallback(async () => {
    if (!videoTitle.trim()) {
      setError('タイトルを入力してください。');
      return;
    }
    
    setLoading(true);
    setError('');
    setRevivedTitle(''); // 結果をリセット

    try {
      const response = await fetch('/api/title', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: videoTitle }),
      });

      const data = await response.json();

      if (response.ok) {
        setRevivedTitle(data.revisedTitle);
      } else {
        setError(data.error || 'AIタイトル生成に失敗しました。');
      }
    } catch (e) {
      console.error('Fetch error:', e);
      setError('ネットワークエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  }, [videoTitle]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-700">AIシーン構造化クリエイター</h1>
        <p className="text-xl text-gray-500 mt-2">AI機能検証プロトタイプ (タイトル最適化)</p>
      </header>

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* A. アップロードUIとタイトル入力 */}
        <div className="p-8 bg-white rounded-xl shadow-lg border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Upload className="w-6 h-6 mr-2 text-blue-600" />
            1. 動画タイトルを入力
          </h2>
          
          <div className="flex items-center bg-green-50 p-2 rounded-lg mb-4">
              <FileText className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-700">{DUMMY_VIDEO_NAME} がアップロード済みです。</span>
          </div>

          <textarea
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            rows={2}
            placeholder="例: VLOG：初めての富士山キャンプ！失敗だらけ..."
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
          />

          <button
            onClick={handleTitleSubmit}
            disabled={loading}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-150 shadow-md flex justify-center items-center disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                AIがタイトルを最適化中...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                AIにタイトル最適化を依頼
              </>
            )}
          </button>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </div>

        {/* B. AI分析結果と修正指示 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-yellow-500" />
            2. AI分析結果
          </h2>

          {/* E-Score表示（ダミー） */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 flex justify-between items-center">
            <div>
              <p className="text-xl font-medium text-gray-600">エンゲージメントスコア (E-Score)</p>
              <p className="text-sm text-gray-400">AIによる動画全体の潜在力評価</p>
            </div>
            <div className="text-5xl font-extrabold text-blue-700 bg-blue-50 px-4 py-2 rounded-lg">{DUMMY_SCORE}/10.0</div>
          </div>

          {/* 実際のAI修正タイトル表示 */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 min-h-[150px]">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              AIによるタイトル修正案 (PREMIUM機能)
            </h3>
            
            {revisedTitle ? (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                <p className="text-2xl font-bold text-yellow-700">{revisedTitle}</p>
              </div>
            ) : (
              <div className="text-center p-4 text-gray-500">
                <Lock className="w-6 h-6 mx-auto mb-2" />
                タイトルを最適化すると、ここにAIによる**プロ仕様のタイトル**が表示されます。
              </div>
            )}
          </div>
          
          <footer className="text-center pt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-150 shadow-lg">
                  PREMIUMプランを試す (.99/月)
              </button>
          </footer>

        </section>
      </div>
    </div>
  );
};

export default TestPage;
