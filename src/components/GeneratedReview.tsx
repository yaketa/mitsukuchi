import React from 'react';

interface GeneratedReviewProps {
  review: string;
  onRegenerate: () => void;
  onCopy: () => void;
}

const GeneratedReview: React.FC<GeneratedReviewProps> = ({ review, onRegenerate, onCopy }) => {
  return (
    <div className="mt-8">
      <div className="p-4 bg-gray-100 rounded-md mb-6">
        <h3 className="text-lg font-semibold text-teal-800 mb-2">生成された口コミ
        </h3>
        <p className="text-gray-700">{review || '口コミはまだ生成されていません。'}</p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={onRegenerate}
          className="flex-1 px-4 py-3 bg-teal-600 text-white rounded-md text-lg font-semibold hover:bg-teal-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!review}
        >
          再生成
        </button>
        <button
          onClick={onCopy}
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!review}
        >
          コピー
        </button>
      </div>
    </div>
  );
};

export default GeneratedReview;