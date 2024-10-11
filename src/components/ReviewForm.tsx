import React, { useState } from 'react';
import axios from 'axios';

interface ReviewFormProps {
  setReview: (review: string) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ setReview }) => {
  const [therapistName, setTherapistName] = useState('');
  const [technique, setTechnique] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [overall, setOverall] = useState(0);
  const [specialNote, setSpecialNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
              content: `Generate a positive review for a massage therapist named ${therapistName}. 
              Ratings (out of 5 stars):
              - Technique: ${technique}
              - Pressure: ${pressure}
              - Communication: ${communication}
              - Overall: ${overall}
              Special note: ${specialNote}
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

  const StarRating = ({ value, onChange }: { value: number, onChange: (value: number) => void }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-8 h-8 cursor-pointer ${star <= value ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          onClick={() => onChange(star)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="therapistName" className="block text-sm font-medium text-gray-700 mb-1">セラピスト名</label>
        <input
          type="text"
          id="therapistName"
          value={therapistName}
          onChange={(e) => setTherapistName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">テクニック</label>
          <StarRating value={technique} onChange={setTechnique} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">圧の強さ</label>
          <StarRating value={pressure} onChange={setPressure} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">コミュニケーション</label>
          <StarRating value={communication} onChange={setCommunication} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">総合評価</label>
          <StarRating value={overall} onChange={setOverall} />
        </div>
      </div>
      <div>
        <label htmlFor="specialNote" className="block text-sm font-medium text-gray-700 mb-1">特筆すべき点</label>
        <textarea
          id="specialNote"
          value={specialNote}
          onChange={(e) => setSpecialNote(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        disabled={isLoading}
      >
        {isLoading ? '口コミ生成中...' : '口コミを生成'}
      </button>
    </form>
  );
};

export default ReviewForm;