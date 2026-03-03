
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Login from './components/Login';
import StudentDashboard from './components/student/StudentDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import StudentManager from './components/admin/StudentManager';
import MenuManager from './components/admin/MenuManager';
import FeedbackViewer from './components/admin/FeedbackViewer';
import ReportsDashboard from './components/admin/ReportsDashboard';
import BadFoodReports from './components/admin/BadFoodReports';

const PrivateRoute: React.FC<{ children: React.ReactNode; role: 'student' | 'admin' }> = ({ children, role }) => {
  const { user } = useAppContext();
  if (!user || user.role !== role) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAppContext();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/student"
        element={
          <PrivateRoute role="student">
            <StudentDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="reports" />} />
        <Route path="students" element={<StudentManager />} />
        <Route path="menu" element={<MenuManager />} />
        <Route path="feedback" element={<FeedbackViewer />} />
        <Route path="reports" element={<ReportsDashboard />} />
        <Route path="issues" element={<BadFoodReports />} />
      </Route>
      <Route path="/" element={<Navigate to={user ? (user.role === 'admin' ? '/admin' : '/student') : '/login'} />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <div className="min-h-screen bg-gray-50 text-gray-800">
          <AppRoutes />
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
