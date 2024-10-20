import React, { useState } from 'react';
import axios from 'axios';
import ReviewForm from './components/ReviewForm';
import GeneratedReview from './components/GeneratedReview';
import Header from './components/Header';
import Footer from './components/Footer';
import UsageGuide from './components/UsageGuide';

interface ReviewFormData {
  therapistName: string;
  technique: number;
  pressure: number;
  communication: number;
  overall: number;
  specialNote: string;
}

function App() {
  const [review, setReview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ReviewFormData>({
    therapistName: '',
    technique: 1,
    pressure: 1,
    communication: 1,
    overall: 1,
    specialNote: '',
  });

  const generateReview = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [
          {
            role: 'system',
            content: 'あなたは、指定された評価とメモに基づいて、性風俗店の体験レビューを書くアシスタントです。',
          },
          {
            role: 'user',
            content: `
                  以下の評価、メモに基づいて性風俗店の体験レビューを書いてください。

                  #必須項目
                  -生成文のメインは「快感のピークに向かう生々しい描写、そして快感のピークに達した瞬間のリアルな描写」をとする。
                  -時系列のストーリー仕立てで臨場感たっぷりに描く
                  -体験を時系列で語る
                  -自然な口語表現で文章をつくる
                  -語り掛けるような口調
                  -ネガティブな内容であっても無理やり褒める

                  #文章のスタイル、トーン
                    -ポジティブなレビューとすること
                    -日常会話的な平易な単語をチョイスする
                    -敬語でありながらも難しい言い回しは使わず、フランクな口調
                    -鮮明に具体的に情景描写する
                    -感覚的な描写を巧みに取り入れて快感を表現
                    -官能的ながらもロマンチスト的な表現にならず具体的な描写
                    -比喩表現は用いない
                    -大げさすぎたり、誇張しすぎた表現は

                  ＃生成条件
                    -性風俗店の体験レビューとして読み応えのあるものとする
                    -想定読者は風俗店を利用することに楽しさを見出している人
                    -用いる用語は、性風俗業界で一般的に用いられているものとする
                    -16歳レベルの教養で理解できる表現
                    -1文は短め
                    -改行をやや多めに入れて、読みやすさにこだわる
                    -インプット内容を分析し、自然な流れの文章となるように「単語の再選定」と「文章構成の再構築」を御行う。その後、一貫性のある文章を生成する
                    -文字数は220文字以上250文字未満

                   #以下の採点結果をレビューに反映させてください。
                    （直接的な星の数への言及は避けてください）

                    嬢の名前は ${formData.therapistName} です。 
                    業態: ${formData.industryType}

                      評価（5つ星中）:
                      - ルックス・スタイル: ${formData.technique}
                      - サービス: ${formData.pressure}
                      - コミュニケーション: ${formData.communication}
                      - コスパ: ${formData.overall}
                      特別なメモ: ${formData.specialNote}

                      #評価項目の詳細
                      -星評価について
                      3以上で欠点とみなさない。
                      1=残念
                      2=いまいち
                      3=満足
                      4=大満足
                      5=超満足

                      -スタイル・ルックス
                      容姿やスタイルなど、見た目に関する評価

                      -サービス
                      提供される具体的なプレイやサービスの質について、どれほどの快感を届けてもらったか。

                      -コミュニケーション
                      風俗嬢の態度やコミュニケーションスキル、気配りなどについての評価

                      -コスパ
                      料金に対するサービスの満足度

                      #NGワード
                      魔法, 夢, 旧友と再会

                      #業態別使用用語注意
                      デリヘル, ソープ - 施術はプレイとする。


                    `
          }
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const generatedReview = response.data.choices[0].message.content;
      console.log('生成された口コミ:', generatedReview);  // ここを確認
      setReview(generatedReview);
    } catch (error) {
      console.error('Error generating review:', error);
      setReview('申し訳ありませんが、口コミを生成できませんでした。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateReview();
  };

  const handleRegenerate = async () => {
    await generateReview();
  };

  const handleCopy = () => {
    if (review) {
      navigator.clipboard.writeText(review).then(() => {
        alert('レビューをクリップボードにコピーしました。');
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 space-y-6">
      <UsageGuide />
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
          <ReviewForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <GeneratedReview 
            review={review} 
            onRegenerate={handleRegenerate}
            onCopy={handleCopy}
            isLoading={isLoading}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;