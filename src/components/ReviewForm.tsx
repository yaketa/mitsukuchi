import React from 'react';

interface ReviewFormProps {
  formData: {
    therapistName: string;
    industryType: string;
    technique: number;
    pressure: number;
    communication: number;
    overall: number;
    specialNote: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    therapistName: string;
    industryType: string;
    technique: number;
    pressure: number;
    communication: number;
    overall: number;
    specialNote: string;
  }>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (name: string, value: number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const StarRating = ({ name, value }: { name: string, value: number }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-8 h-8 cursor-pointer ${star <= value ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          onClick={() => handleRatingChange(name, star)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-base";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-1">
        <label htmlFor="therapistName" className={labelClass}>嬢のなまえ</label>
        <input
          type="text"
          id="therapistName"
          name="therapistName"
          value={formData.therapistName}
          onChange={handleInputChange}
          className={inputClass}
          required
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="industryType" className={labelClass}>業態</label>
        <div className="relative">
          <select
            id="industryType"
            name="industryType"
            value={formData.industryType}
            onChange={handleInputChange}
            className={`${inputClass} appearance-none pr-8`}
            required
          >
            <option value="">業態を選択してください</option>
            <option value="デリヘル">デリヘル</option>
            <option value="ソープ">ソープ</option>
            <option value="抜きありのエステ">風エス</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="space-y-4">
      <label htmlFor="StarRate" className={labelClass}>評価</label>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>ルックス・スタイル</label>
            <StarRating name="technique" value={formData.technique} />
          </div>
          <div>
            <label className={labelClass}>サービス</label>
            <StarRating name="pressure" value={formData.pressure} />
          </div>
          <div>
            <label className={labelClass}>コミュニケーション</label>
            <StarRating name="communication" value={formData.communication} />
          </div>
          <div>
            <label className={labelClass}>コスパ</label>
            <StarRating name="overall" value={formData.overall} />
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <label htmlFor="specialNote" className={labelClass}>特に良かったところ（自由記入）</label>
        <textarea
          id="specialNote"
          name="specialNote"
          value={formData.specialNote}
          onChange={handleInputChange}
          className={inputClass}
          rows={2}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gray-600 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 transition duration-150 ease-in-out"
        disabled={isLoading}
      >
        {isLoading ? '口コミ生成中...' : '口コミを生成'}
      </button>
    </form>
  );
};

export default ReviewForm;