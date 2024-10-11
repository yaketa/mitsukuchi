import React, { useState } from 'react';
import ReviewForm from './components/ReviewForm';
import GeneratedReview from './components/GeneratedReview';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [review, setReview] = useState<string>('');

  const handleRegenerate = () => {
    setReview('');
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
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-teal-800">風俗口コミジェネレーター</h2>
          <ReviewForm setReview={setReview} />
          <GeneratedReview 
            review={review} 
            onRegenerate={handleRegenerate}
            onCopy={handleCopy}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;