import React from 'react';
import LoadingAnimation from './LoadingAnimation';

const GeneratedReview = ({ review, onRegenerate, onCopy, isLoading }) => {
  const buttonBaseClass = "flex-1 px-4 py-3 rounded-md text-lg font-semibold transition duration-300";
  const buttonActiveClass = "bg-gray-600 text-white hover:bg-gray-700";
  const buttonDisabledClass = "bg-gray-400 text-gray-200 cursor-not-allowed";
  const reviewContent = review || '口コミはまだ生成されていません。';
  const isPlaceholder = !review;

  return (
    <div className="mt-8">
      <div className="p-4 bg-gray-100 rounded-md mb-6 min-h-[150px]">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">生成された口コミ</h3>
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <LoadingAnimation />
          </div>
        ) : (
          <p className={`whitespace-pre-wrap text-gray-700 font-sans text-base ${isPlaceholder ? 'text-center' : 'text-left'}`}>
            {reviewContent}
          </p>
        )}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={onRegenerate}
          className={`${buttonBaseClass} ${review && !isLoading ? buttonActiveClass : buttonDisabledClass}`}
          disabled={!review || isLoading}
        >
          {isLoading ? '生成中...' : '再生成'}
        </button>
        <button
          onClick={onCopy}
          className={`${buttonBaseClass} ${review && !isLoading ? buttonActiveClass : buttonDisabledClass}`}
          disabled={!review || isLoading}
        >
          コピー
        </button>
      </div>
    </div>
  );
};

export default GeneratedReview;