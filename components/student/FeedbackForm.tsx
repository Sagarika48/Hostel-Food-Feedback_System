import React, { useState } from 'react';
import { MenuItem, FeedbackItem } from '../../types';
import StarRating from '../ui/StarRating';
import Button from '../ui/Button';

interface FeedbackFormProps {
  meal: 'breakfast' | 'lunch' | 'dinner';
  menuItems: MenuItem[];
  onSubmit: (feedback: { meal: 'breakfast' | 'lunch' | 'dinner'; items: FeedbackItem[]; comment: string }) => void;
  isSubmitted: boolean;
}

const MealIcon: React.FC<{meal: 'breakfast' | 'lunch' | 'dinner'}> = ({ meal }) => {
    const iconStyles = "h-8 w-8 text-indigo-500";
    if (meal === 'breakfast') {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconStyles} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm-.707 9.193a1 1 0 011.414 0l.707-.707a1 1 0 01-1.414-1.414l-.707.707zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" />
        </svg>
    }
    if (meal === 'lunch') {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconStyles} viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 5.05a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zM10 16a6 6 0 110-12 6 6 0 010 12zM10 14a4 4 0 100-8 4 4 0 000 8z" /></svg>
    }
    return <svg xmlns="http://www.w3.org/2000/svg" className={iconStyles} viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
};

const FeedbackForm: React.FC<FeedbackFormProps> = ({ meal, menuItems, onSubmit, isSubmitted }) => {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comment, setComment] = useState('');

  const handleRatingChange = (itemId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [itemId]: rating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const feedbackItems: FeedbackItem[] = Object.entries(ratings).map(([menuItemId, rating]) => ({
      menuItemId,
      rating,
    }));
    if (feedbackItems.length === 0 && menuItems.length > 0) {
        alert("Please rate at least one item before submitting.");
        return;
    }
    onSubmit({ meal, items: feedbackItems, comment });
  };
  
  if (isSubmitted) {
    return (
        <div className="text-center p-8 bg-green-50 rounded-lg h-full flex flex-col justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold capitalize mt-4">{meal}</h3>
            <p className="text-gray-600 mt-2">Feedback submitted. Thank you!</p>
        </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <MealIcon meal={meal} />
        <h3 className="text-2xl font-bold capitalize text-gray-800">{meal}</h3>
      </div>
      {menuItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No items on the menu for {meal}.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
            {menuItems.map(item => (
            <div key={item.id}>
                <p className="text-lg font-medium text-gray-800">{item.name}</p>
                <StarRating value={ratings[item.id] || 0} onChange={(rating) => handleRatingChange(item.id, rating)} />
            </div>
            ))}
            <div>
            <label htmlFor={`${meal}-comment`} className="block text-sm font-medium text-gray-700">Additional Comments (Optional)</label>
            <textarea
                id={`${meal}-comment`}
                rows={3}
                className="mt-1 w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Any other thoughts?"
            />
            </div>
            <Button type="submit" className="w-full">Submit {meal} Feedback</Button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;