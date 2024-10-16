import React, { useState } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import GeneratedReview from './GeneratedReview';
import Header from './Header';
import Footer from './Footer';

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
    technique: 0,
    pressure: 0,
    communication: 0,
    overall: 0,
    specialNote: '',
  });

  const generateReview = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that generates realistic and positive massage therapy reviews based on given ratings and notes.',
            },
            {
              role: 'user',
              content: `Generate a positive review for a massage therapist named ${formData.therapistName}. 
              Ratings (out of 5 stars):
              - Technique: ${formData.technique}
              - Pressure: ${formData.pressure}
              - Communication: ${formData.communication}
              - Overall: ${formData.overall}
              Special note: ${formData.specialNote}
              Please write the review in Japanese, about 3-4 sentences long.`,
            },
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setReview(response.data.choices[0].message.content);
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
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-teal-800">風俗口コミジェネレーター</h2>
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