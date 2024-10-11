import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ReviewForm from './ReviewForm';
import axios from 'axios';

vi.mock('axios');

describe('ReviewForm', () => {
  it('submits the form and generates a review', async () => {
    const mockSetReview = vi.fn();
    const { getByLabelText, getByText } = render(<ReviewForm setReview={mockSetReview} />);

    fireEvent.change(getByLabelText('セラピスト名'), { target: { value: 'テスト太郎' } });
    fireEvent.click(getByText('口コミを生成'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(mockSetReview).toHaveBeenCalled();
    });
  });
});