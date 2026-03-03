import React, { useMemo, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Feedback } from '../../types';
import Card from '../ui/Card';
import StarRating from '../ui/StarRating';

const FeedbackViewer: React.FC = () => {
  const { feedback, students, menu } = useAppContext();
  const [filterDate, setFilterDate] = useState('');

  const getStudentName = (studentId: string) => students.find(s => s.id === studentId)?.name || 'Unknown';

  const getMenuItemName = (menuItemId: string): string => {
    for (const day of Object.values(menu)) {
      for (const meal of Object.values(day)) {
        const item = meal.find(i => i.id === menuItemId);
        if (item) return item.name;
      }
    }
    return 'Unknown Item';
  };
  
  const sortedFeedback = useMemo(() => {
    return [...feedback].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [feedback]);
  
  const filteredFeedback = useMemo(() => {
    if (!filterDate) return sortedFeedback;
    return sortedFeedback.filter(f => f.date === filterDate);
  }, [filterDate, sortedFeedback]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">All Feedback</h2>
        <div className="flex items-center gap-2">
            <label htmlFor="date-filter" className="text-sm font-medium">Filter by date:</label>
            <input 
                type="date"
                id="date-filter"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-1 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {filterDate && <button onClick={() => setFilterDate('')} className="text-sm text-indigo-600 hover:underline">Clear</button>}
        </div>
      </div>
      <div className="space-y-4">
        {filteredFeedback.length > 0 ? filteredFeedback.map((fb: Feedback) => (
          <Card key={fb.id}>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-lg">{getStudentName(fb.studentId)}</p>
                <p className="text-sm text-gray-500">{new Date(fb.date).toLocaleDateString('en-CA')} - <span className="capitalize">{fb.meal}</span></p>
              </div>
              <p className="text-sm text-gray-500">ID: {fb.id}</p>
            </div>
            <div className="mt-4 space-y-2">
              {fb.items.map(item => (
                <div key={item.menuItemId} className="flex justify-between items-center">
                  <p className="text-gray-700">{getMenuItemName(item.menuItemId)}</p>
                  <StarRating value={item.rating} onChange={() => {}} />
                </div>
              ))}
            </div>
            {fb.comment && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-semibold text-gray-800">Comment:</p>
                <p className="text-sm text-gray-600 italic">"{fb.comment}"</p>
              </div>
            )}
          </Card>
        )) : (
            <Card>
                <p className="text-center text-gray-500 py-8">No feedback found for the selected criteria.</p>
            </Card>
        )}
      </div>
    </div>
  );
};

export default FeedbackViewer;