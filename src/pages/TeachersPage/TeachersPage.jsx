import { useState, useEffect, useCallback, useMemo } from 'react';

import Header from '../../components/Header/Header';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import Filter from '../../components/Filter/Filter';
import Loader from '../../components/Loader/Loader';
import { getTeachers, seedTeachers } from '../../api/firebase';
import teachersData from '../../teachers.json';
import styles from './TeachersPage.module.css';

const TEACHERS_PER_LOAD = 4;

const TeachersPage = () => {
  const [allTeachers, setAllTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    language: '',
    level: '',
    price: '',
  });

  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);

  useEffect(() => {
    const initializeTeachers = async () => {
      setLoading(true);
      try {
        const checkResult = await getTeachers(1);
        if (
          !checkResult ||
          !checkResult.teachers ||
          checkResult.teachers.length === 0
        ) {
          await seedTeachers(teachersData);
        }
        const { teachers: allFetchedTeachers = [] } = await getTeachers(null);
        setAllTeachers(allFetchedTeachers);
        setHasMorePages(allFetchedTeachers.length > TEACHERS_PER_LOAD);
      } catch (error) {
        setAllTeachers([]);
        setHasMorePages(false);
      } finally {
        setLoading(false);
      }
    };
    initializeTeachers();
  }, []);

  const filteredTeachers = useMemo(() => {
    let currentFiltered = [...allTeachers];

    if (filters.language) {
      currentFiltered = currentFiltered.filter(
        teacher =>
          teacher.languages &&
          Array.isArray(teacher.languages) &&
          teacher.languages.includes(filters.language)
      );
    }

    if (filters.level) {
      currentFiltered = currentFiltered.filter(
        teacher =>
          teacher.levels &&
          Array.isArray(teacher.levels) &&
          teacher.levels.includes(filters.level)
      );
    }

    if (filters.price) {
      const priceLimit = parseInt(filters.price);
      if (!isNaN(priceLimit)) {
        currentFiltered = currentFiltered.filter(
          teacher =>
            teacher.price_per_hour &&
            !isNaN(teacher.price_per_hour) &&
            teacher.price_per_hour <= priceLimit
        );
      }
    }
    return currentFiltered;
  }, [allTeachers, filters]);

  const paginatedDisplayedTeachers = useMemo(() => {
    const startIndex = 0;
    const endIndex = page * TEACHERS_PER_LOAD;
    const currentDisplay = filteredTeachers.slice(startIndex, endIndex);

    setHasMorePages(filteredTeachers.length > currentDisplay.length);

    return currentDisplay;
  }, [filteredTeachers, page]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const handleLoadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const handleFilterChange = useCallback(newFilters => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="container">
      <Header />

      <section className={styles.teachersSection}>
        <div className={styles.wrapper}>
          <Filter
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />

          {loading && <Loader />}

          {!loading && paginatedDisplayedTeachers.length === 0 && (
            <p className={styles.noTeachers}>
              No teachers found with the current filters.
            </p>
          )}

          <ul className={styles.teachersList}>
            {paginatedDisplayedTeachers.map(teacher => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </ul>

          {hasMorePages &&
            !loading &&
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
        </div>
      </section>
    </div>
  );
};

export default TeachersPage;
