import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const UsageGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
      <button
        onClick={toggleOpen}
        className="w-full px-4 py-3 text-base font-semibold bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center relative"
      >
        <span className="text-gray-800">使い方ガイド</span>
        <span className="absolute right-4">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      {isOpen && (
        <div className="p-4 text-gray-700 space-y-4">
          <GuideSection
            title="風俗体験の口コミをAIが自動生成！"
            content="『見つめあうと素直に口コミできない』は、文章を書くのが苦手でも、簡単に200文字以上の口コミが作成できるサービスです。"
          />

          <GuideSection
            title="口コミ投稿でお得に！"
            content="多くの店舗では、口コミ投稿で割引券やポイントがもらえる特典が用意されています。このサービスを使えば、手間なく簡単に口コミを作成し、風俗体験をよりお得に楽しめる可能性が広がります！"
          />

          <GuideSection title="使い方は簡単4ステップ！">
            <ol className="list-decimal list-inside space-y-2 pl-2 text-sm">
              <ListItem>嬢の名前を入力</ListItem>
              <ListItem>満足度を採点</ListItem>
              <ListItem>AIが200文字以上の口コミを生成</ListItem>
              <ListItem isLast>コピーして投稿サイトに貼り付けるだけ！</ListItem>
            </ol>
          </GuideSection>

          <div className="bg-gray-50 p-3 rounded-lg text-sm">
            <p>
              このサービスを活用して、簡単に口コミを作成しましょう。店舗の特典制度によっては、すぐに割引が適用されたり、次回の利用時にお得になったりするかもしれません。風俗体験をより楽しく、お得にするチャンスです！
            </p>
            <p className="mt-2 font-semibold">
              このページをブックマークに追加して、いつでも簡単に口コミを作成できるように備えておきましょう！
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const GuideSection: React.FC<{ title: string; content?: string; children?: React.ReactNode }> = ({ title, content, children }) => (
  <div>
    <h3 className="text-base font-semibold text-gray-700 mb-2 text-center">{title}</h3>
    {content && <p className="text-sm">{content}</p>}
    {children}
  </div>
);

const ListItem: React.FC<{ children: React.ReactNode; isLast?: boolean }> = ({ children, isLast }) => (
  <li className={`pb-1 ${!isLast ? 'border-b border-gray-100' : ''}`}>{children}</li>
);

export default UsageGuide;