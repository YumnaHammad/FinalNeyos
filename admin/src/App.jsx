import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Vendors from './pages/Vendors';
import Products from './pages/Products';
import CategoriesSettings from './pages/CategoriesSettings';
import SuccessStoriesSettings from './pages/SuccessStoriesSettings';
import DynamicSectionPage from './pages/DynamicSectionPage';
import SolutionsSettings from './pages/SolutionsSettings';
import Login from './pages/Login';
import SpecificationsPage from './pages/SpecificationsPage';
import SubSubCategoryManager from './pages/SubSubCategoryManager';

// Protected Route — admin or vendor
const ProtectedRoute = ({ children, vendorOnly = false }) => {
  const isLoggedIn =
    localStorage.getItem('isLoggedIn') === 'true' ||
    localStorage.getItem('isAdmin') === 'true';
  const role = localStorage.getItem('userRole') || 'admin';

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (vendorOnly && role !== 'vendor') {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Vendor cannot access admin-only routes
const AdminOnlyRoute = ({ children }) => {
  const role = localStorage.getItem('userRole') || 'admin';
  if (role === 'vendor') {
    return <Navigate to="/products" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            localStorage.getItem('isLoggedIn') === 'true' ||
            localStorage.getItem('isAdmin') === 'true' ? (
              <Navigate
                to={
                  localStorage.getItem('userRole') === 'vendor' ? '/products' : '/'
                }
                replace
              />
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
                    <Route
                      path="/"
                      element={
                        <AdminOnlyRoute>
                          <Dashboard />
                        </AdminOnlyRoute>
                      }
                    />
                    <Route
                      path="/section/:num"
                      element={
                        <AdminOnlyRoute>
                          <DynamicSectionPage />
                        </AdminOnlyRoute>
                      }
                    />
                    <Route
                      path="/vendors"
                      element={
                        <AdminOnlyRoute>
                          <Vendors />
                        </AdminOnlyRoute>
                      }
                    />
                    <Route path="/products" element={<Products />} />
                    <Route
                      path="/categories-settings"
                      element={
                        <AdminOnlyRoute>
                          <CategoriesSettings />
                        </AdminOnlyRoute>
                      }
                    />
                    <Route
                      path="/success-settings"
                      element={
                        <AdminOnlyRoute>
                          <SuccessStoriesSettings />
                        </AdminOnlyRoute>
                      }
                    />
                    <Route
                      path="/solutions-settings"
                      element={
                        <AdminOnlyRoute>
                          <SolutionsSettings />
                        </AdminOnlyRoute>
                      }
                    />
                    <Route
                      path="/specifications"
                      element={
                        <AdminOnlyRoute>
                          <SpecificationsPage />
                        </AdminOnlyRoute>
                      }
                    />
                    <Route
                      path="/specifications/:sscName"
                      element={
                        <AdminOnlyRoute>
                          <SubSubCategoryManager />
                        </AdminOnlyRoute>
                      }
                    />
                    <Route
                      path="*"
                      element={
                        <Navigate
                          to={
                            localStorage.getItem('userRole') === 'vendor'
                              ? '/products'
                              : '/'
                          }
                          replace
                        />
                      }
                    />
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
