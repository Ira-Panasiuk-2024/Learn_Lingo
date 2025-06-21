import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { useAuth } from './AuthContext';
import {
  addFavoriteTeacher,
  removeFavoriteTeacher,
  getUserFavorites,
  getTeacherById,
  getFavoriteTeachersWithData,
} from '../api/firebase';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const [favoriteTeacherIds, setFavoriteTeacherIds] = useState({});
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserFavorites = useCallback(async () => {
    if (!isAuthenticated || !currentUser) {
      setFavoriteTeacherIds({});
      setFavoriteTeachers([]);
      setLoadingFavorites(false);
      setError(null);
      return;
    }

    try {
      setLoadingFavorites(true);
      setError(null);

      const ids = await getUserFavorites(currentUser.uid);
      setFavoriteTeacherIds(ids);

      const teachers = await getFavoriteTeachersWithData(currentUser.uid);
      setFavoriteTeachers(teachers);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingFavorites(false);
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    fetchUserFavorites();
  }, [fetchUserFavorites]);

  const toggleFavorite = async teacherId => {
    if (!isAuthenticated || !currentUser) {
      setError('User not authenticated');
      return false;
    }

    if (!teacherId) {
      setError('Teacher ID not provided');
      return false;
    }

    try {
      setError(null);

      if (favoriteTeacherIds[teacherId]) {
        await removeFavoriteTeacher(currentUser.uid, teacherId);

        setFavoriteTeacherIds(prev => {
          const newState = { ...prev };
          delete newState[teacherId];
          return newState;
        });

        setFavoriteTeachers(prev => prev.filter(t => t.id !== teacherId));
      } else {
        await addFavoriteTeacher(currentUser.uid, teacherId);

        setFavoriteTeacherIds(prev => ({ ...prev, [teacherId]: true }));

        const teacher = await getTeacherById(teacherId);
        if (teacher) {
          setFavoriteTeachers(prev => [
            ...prev,
            { ...teacher, isFavorite: true },
          ]);
        }
      }

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  const isFavorite = teacherId => {
    return !!favoriteTeacherIds[teacherId];
  };

  const addToFavorites = async teacherId => {
    if (!isAuthenticated || !currentUser) {
      setError('User not authenticated');
      return false;
    }

    try {
      setError(null);
      await addFavoriteTeacher(currentUser.uid, teacherId);

      setFavoriteTeacherIds(prev => ({ ...prev, [teacherId]: true }));

      const teacher = await getTeacherById(teacherId);
      if (teacher) {
        setFavoriteTeachers(prev => [
          ...prev,
          { ...teacher, isFavorite: true },
        ]);
      }

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  const removeFromFavorites = async teacherId => {
    if (!isAuthenticated || !currentUser) {
      setError('User not authenticated');
      return false;
    }

    try {
      setError(null);
      await removeFavoriteTeacher(currentUser.uid, teacherId);

      setFavoriteTeacherIds(prev => {
        const newState = { ...prev };
        delete newState[teacherId];
        return newState;
      });

      setFavoriteTeachers(prev => prev.filter(t => t.id !== teacherId));

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const refreshFavorites = async () => {
    await fetchUserFavorites();
  };

  const value = {
    favoriteTeacherIds,
    favoriteTeachers,
    toggleFavorite,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    loadingFavorites,
    fetchUserFavorites,
    refreshFavorites,
    error,
    clearError,
    favoritesCount: Object.keys(favoriteTeacherIds).length,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
