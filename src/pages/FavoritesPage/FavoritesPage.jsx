import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import TeacherCard from '../../components/TeacherCard/TeacherCard';
import Loader from '../../components/Loader/Loader';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header/Header';
import styles from './FavoritesPage.module.css';

const TEACHERS_PER_LOAD = 4;

const FavoritesPage = () => {
  const { favoriteTeachers, loadingFavorites, fetchUserFavorites } =
    useFavorites();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/teachers');
    } else if (isAuthenticated) {
      fetchUserFavorites();
    }
  }, [isAuthenticated, authLoading, navigate, fetchUserFavorites]);

  const paginatedDisplayedTeachers = useMemo(() => {
    const startIndex = 0;
    const endIndex = page * TEACHERS_PER_LOAD;
    const currentDisplay = favoriteTeachers.slice(startIndex, endIndex);

    setHasMorePages(favoriteTeachers.length > currentDisplay.length);

    return currentDisplay;
  }, [favoriteTeachers, page]);

  const handleLoadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [favoriteTeachers]);

  if (authLoading || !isAuthenticated) {
    return <Loader />;
  }

  if (loadingFavorites) {
    return <Loader />;
  }

  return (
    <div className="container">
      <Header />
      <section className={styles.favoritesSection}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Your Favorite Tutors</h2>
          {favoriteTeachers.length === 0 ? (
            <p className={styles.emptyFavorites}>
              You have not added any teachers to your favorites yet.
            </p>
          ) : (
            <>
              <ul className={styles.favoritesList}>
                {paginatedDisplayedTeachers.map(teacher => (
                  <TeacherCard key={teacher.id} teacher={teacher} />
                ))}
              </ul>

              {hasMorePages &&
                !loadingFavorites &&
                paginatedDisplayedTeachers.length > 0 && (
                  <div>
                    <button
                      onClick={handleLoadMore}
                      className={styles.loadMoreButton}
                    >
                      Load more
                    </button>
                  </div>
                )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default FavoritesPage;
