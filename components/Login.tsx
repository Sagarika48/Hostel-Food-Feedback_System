
import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Input from './ui/Input';
import Button from './ui/Button';
import Card from './ui/Card';
import { ADMIN_EMAIL } from '../constants';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/student');
    }
  }, [user, navigate]);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => { // Simulate network delay
      const success = login(email, password);
      if (success) {
        if (email === ADMIN_EMAIL) {
          navigate('/admin');
        } else {
          navigate('/student');
        }
      } else {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">Hostel Food Feedback</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              id="email"
              label="Email Address"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g., john@student.com"
            />
            <Input 
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Use 'password123'"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
          </form>
        </Card>
         <p className="text-center text-sm text-gray-500 mt-4">
          Hint: Use 'admin@hostel.com' for admin access.
        </p>
      </div>
    </div>
  );
};

export default Login;