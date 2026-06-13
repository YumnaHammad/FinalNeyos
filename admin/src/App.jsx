import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Vendors from './pages/Vendors';
import Products from './pages/Products';
import CategoriesSettings from './pages/CategoriesSettings';
import SuccessStoriesSettings from './pages/SuccessStoriesSettings';
import DynamicSectionPage from './pages/DynamicSectionPage';
import Login from './pages/Login';
import SearchListPage from './pages/SearchListPage';
import BlogsSettings from './pages/BlogsSettings';
import NewsSettings from './pages/NewsSettings';
import EventsSettings from './pages/EventsSettings';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn =
    localStorage.getItem('isLoggedIn') === 'true' ||
    localStorage.getItem('isAdmin') === 'true';

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Routes>
        <Route
          path="/login"
          element={
            localStorage.getItem('isLoggedIn') === 'true' ||
            localStorage.getItem('isAdmin') === 'true' ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex bg-gray-50 min-h-screen">
                <Sidebar />
                <div className="flex-1 overflow-x-hidden">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/section/:num" element={<DynamicSectionPage />} />
                    <Route path="/vendors" element={<Vendors />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/categories-settings" element={<CategoriesSettings />} />
                    <Route path="/success-settings" element={<SuccessStoriesSettings />} />
                    <Route path="/search-list" element={<SearchListPage />} />
                    <Route path="/blogs-settings" element={<BlogsSettings />} />
                    <Route path="/news-settings" element={<NewsSettings />} />
                    <Route path="/events-settings" element={<EventsSettings />} />
                    <Route path="/solutions-settings" element={<Navigate to="/" replace />} />
                    <Route path="/specifications" element={<Navigate to="/search-list" replace />} />
                    <Route path="/specifications/*" element={<Navigate to="/search-list" replace />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
