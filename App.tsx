import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Dashboard from './src/pages/Dashboard';
import PostDonationPage from './src/pages/PostDonationPage';
import ProtectedRoute from './src/routes/ProtectedRoute';
import { subscribeToAuthChanges, UserProfile } from './services/authService';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Safety timeout: If auth doesn't respond in 2 seconds, assume not logged in.
    const timeoutId = setTimeout(() => {
      if (isAuthenticated === null) {
        console.warn("Auth check timed out. Defaulting to unauthenticated.");
        setIsAuthenticated(false);
      }
    }, 2000);

    const unsubscribe = subscribeToAuthChanges((user) => {
      clearTimeout(timeoutId);
      setIsAuthenticated(!!user);
    });
    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage onLogin={() => { }} />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignIn />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/post" element={<PostDonationPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;