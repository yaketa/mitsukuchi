import React, { useState } from 'react';
import ReviewForm from './components/ReviewForm';
import GeneratedReview from './components/GeneratedReview';
import Header from './components/Header';
import Footer from './components/Footer';
import UsageGuide from './components/UsageGuide';

interface ReviewFormData {
  therapistName: string;
  industryType: string;
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
    industryType: '',
    technique: 1,
    pressure: 1,
    communication: 1,
    overall: 1,
    specialNote: '',
  });

  const generateReview = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/.netlify/functions/generate-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate review');
      }

      const data = await response.json();
      setReview(data.review);
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