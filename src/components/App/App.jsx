import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from '../../contexts/AuthContext';
import { ToastProvider } from '../../contexts/ToastContext';
import { FavoritesProvider } from '../../contexts/FavoritesContext';
import { ThemeProvider } from '../../contexts/ThemeContext';

import Layout from '../Layout/Layout';
import Loader from '../Loader/Loader';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));

const TeachersPage = lazy(() =>
  import('../../pages/TeachersPage/TeachersPage')
);

const FavoritesPage = lazy(() =>
  import('../../pages/FavoritesPage/FavoritesPage')
);

const App = () => {
  return (
    <ToastProvider>
      <ThemeProvider>
        <AuthProvider>
          <FavoritesProvider>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Layout>
                      <HomePage />
                    </Layout>
                  }
                />
                <Route
                  path="/teachers"
                  element={
                    <Layout>
                      <TeachersPage />
                    </Layout>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <Layout>
                      <PrivateRoute>
                        <FavoritesPage />
                      </PrivateRoute>
                    </Layout>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </ToastProvider>
  );
};

export default App;
