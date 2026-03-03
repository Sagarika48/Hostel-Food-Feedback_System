import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { DayOfWeek, DailyMenu, Feedback, BadFoodReport } from '../../types';
import { DAYS_OF_WEEK } from '../../constants';
import FeedbackForm from './FeedbackForm';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

const StudentDashboard: React.FC = () => {
  const { user, menu, logout, submitFeedback, submitBadFoodReport, feedback, setFeedback } = useAppContext();
  const [todayMenu, setTodayMenu] = useState<DailyMenu | null>(null);
  const [isIssueModalOpen, setIssueModalOpen] = useState(false);
  const [issueMessage, setIssueMessage] = useState('');
  const [submittedMeals, setSubmittedMeals] = useState<string[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = DAYS_OF_WEEK[today.getDay()] as DayOfWeek;
    setTodayMenu(menu[dayOfWeek]);
    
    if(user) {
        const todayStr = today.toISOString().split('T')[0];
        const todaysSubmissions = feedback
            .filter(f => f.studentId === user.id && f.date === todayStr)
            .map(f => f.meal);
        setSubmittedMeals(todaysSubmissions);
    }

  }, [menu, user, feedback]);

  const showNotification = (message: string, duration = 3000) => {
    setNotification(message);
    setTimeout(() => setNotification(''), duration);
  };

  const handleFeedbackSubmit = (submittedFeedback: Omit<Feedback, 'id' | 'studentId' | 'date'>) => {
    if (!user) return;
    const todayStr = new Date().toISOString().split('T')[0];
    submitFeedback({ ...submittedFeedback, studentId: user.id, date: todayStr });
    showNotification(`Thanks for your feedback on ${submittedFeedback.meal}!`);
  };
  
  const handleIssueSubmit = () => {
      if (!user || !issueMessage) return;
      const todayStr = new Date().toISOString().split('T')[0];
      submitBadFoodReport({ studentId: user.id, date: todayStr, message: issueMessage });
      setIssueModalOpen(false);
      setIssueMessage('');
      showNotification('Your issue has been reported to the admin. Thank you!', 4000);
  };

  const handleResetMyFeedback = () => {
    if (!user) return;
    setFeedback((prev: Feedback[]) => prev.filter((f: Feedback) => f.studentId !== user.id));
    setSubmittedMeals([]);
    showNotification('All your feedback has been reset.');
  };

  if (!user || !todayMenu) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-lg text-gray-600">Loading your dashboard...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                 <div>
                    <h1 className="text-xl font-bold text-gray-900">Welcome, {user.name}!</h1>
                    <p className="text-sm text-gray-500">Menu for {new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Button onClick={() => setIssueModalOpen(true)} variant="danger" size="sm" className="flex items-center gap-1.5">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                       </svg>
                        Report Issue
                    </Button>
                    <Button onClick={logout} variant="secondary" size="sm">Logout</Button>
                </div>
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {notification && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
            <p className="font-semibold">{notification}</p>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
            <FeedbackForm meal="breakfast" menuItems={todayMenu.breakfast} onSubmit={handleFeedbackSubmit} isSubmitted={submittedMeals.includes('breakfast')} />
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
            <FeedbackForm meal="lunch" menuItems={todayMenu.lunch} onSubmit={handleFeedbackSubmit} isSubmitted={submittedMeals.includes('lunch')} />
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
            <FeedbackForm meal="dinner" menuItems={todayMenu.dinner} onSubmit={handleFeedbackSubmit} isSubmitted={submittedMeals.includes('dinner')} />
            </Card>
        </div>
        <div className="flex justify-center mt-8">
          <Button variant="danger" onClick={handleResetMyFeedback}>Reset My Feedback</Button>
        </div>
      </main>

       <Modal isOpen={isIssueModalOpen} onClose={() => setIssueModalOpen(false)} title="Report a Food Issue">
           <div className="space-y-4">
                <p className="text-gray-600">Please describe the issue you faced. This will be sent directly to the admin.</p>
                <textarea
                    value={issueMessage}
                    onChange={(e) => setIssueMessage(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., 'The rice served at lunch was undercooked.'"
                />
                <div className="flex justify-end space-x-2">
                    <Button variant="secondary" onClick={() => setIssueModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleIssueSubmit} disabled={!issueMessage.trim()}>Submit Report</Button>
                </div>
           </div>
       </Modal>

    </div>
  );
};

export default StudentDashboard;