import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const UsageGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
      <button
        onClick={toggleOpen}
        className="w-full px-4 py-3 text-center font-semibold bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
      >
        <span className="text-base text-gray-800 flex-grow text-center">使い方ガイド</span>
        {isOpen ? <ChevronUp className="text-gray-500 flex-shrink-0" /> : <ChevronDown className="text-gray-500 flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className="p-4 text-gray-700 space-y-4">
          <div>
            <p className="text-sm font-semibold text-center">風俗体験の口コミをAIが自動生成！</p>
            <p className="text-sm mt-2">『見つめあうと素直に口コミできない』は、文章を書くのが苦手でも、簡単に200文字以上の口コミが作成できるサービスです。</p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-700 mb-2 text-center">口コミ投稿でお得に！</h3>
            <p className="text-sm">
              多くの店舗では、口コミ投稿で割引券やポイントがもらえる特典が用意されています。
              このサービスを使えば、手間なく簡単に口コミを作成し、風俗体験をよりお得に楽しめる可能性が広がります！
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-700 mb-2 text-center">使い方は簡単4ステップ！</h3>
            <ol className="list-decimal list-inside space-y-2 pl-2 text-sm">
              <li className="pb-1 border-b border-gray-100">嬢の名前を入力</li>
              <li className="pb-1 border-b border-gray-100">満足度を採点</li>
              <li className="pb-1 border-b border-gray-100">AIが200文字以上の口コミを生成</li>
              <li>コピーして投稿サイトに貼り付けるだけ！</li>
            </ol>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-700 text-sm">
              このサービスを活用して、簡単に口コミを作成しましょう。店舗の特典制度によっては、すぐに割引が適用されたり、次回の利用時にお得になったりするかもしれません。風俗体験をより楽しく、お得にするチャンスです！
            </p>
            <p className="text-gray-700 text-sm mt-2 font-semibold">
              このページをブックマークに追加して、いつでも簡単に口コミを作成できるようにしておきましょう！
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsageGuide;