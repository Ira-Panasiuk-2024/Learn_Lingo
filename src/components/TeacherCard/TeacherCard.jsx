import { useState } from 'react';
import clsx from 'clsx';
import { Heart, Star, BookOpen } from 'lucide-react';

import { useFavorites } from '../../contexts/FavoritesContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { useModal } from '../../hooks/useModal';
import AuthModal from '../AuthModal/AuthModal';
import BookTrialLessonModal from '../BookTrialLessonModal/BookTrialLessonModal';
import styles from './TeacherCard.module.css';

const TeacherCard = ({ teacher }) => {
  const {
    id,
    name,
    surname,
    languages,
    levels,
    rating,
    reviews,
    price_per_hour,
    lessons_done,
    avatar_url,
    lesson_info,
    conditions,
    experience,
  } = teacher;

  const [showFullInfo, setShowFullInfo] = useState(false);

  const [activeLevel, setActiveLevel] = useState(() => {
    const beginnerLevel = levels.find(
      level => level.includes('A1') && level.includes('Beginner')
    );
    return beginnerLevel || levels[0];
  });

  const { isFavorite, toggleFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const {
    isModalOpen: isAuthModalOpen,
    openModal: openAuthModal,
    closeModal: closeAuthModal,
  } = useModal();
  const {
    isModalOpen: isBookModalOpen,
    openModal: openBookModal,
    closeModal: closeBookModal,
  } = useModal();

  const handleFavoriteClick = async () => {
    const wasFavorite = isFavorite(id);
    const actionPerformed = await toggleFavorite(id);
    if (!actionPerformed) {
      showToast('Please log in to add teachers to favorites.', 'info');
      openAuthModal();
    } else {
      showToast(
        wasFavorite ? 'Removed from favorites!' : 'Added to favorites!',
        'success'
      );
    }
  };

  const handleBookLessonClick = () => {
    if (!isAuthenticated) {
      showToast('Please log in to book a trial lesson.', 'info');
      openAuthModal();
    } else {
      openBookModal();
    }
  };

  return (
    <li className={styles.card}>
      <div className={styles.avatarWrapper}>
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          className={styles.avatar}
        />
        <div className={styles.onlineIndicator}></div>
      </div>
      <div className={styles.info}>
        <div className={styles.meta}>
          <p className={styles.languageText}>Languages</p>

          <div className={styles.stats}>
            <p>
              <span className={styles.iconWrapper}>
                <BookOpen size={16} stroke="var(--text-color)" />
              </span>
              Lessons online
            </p>
            <span className={styles.divider}>|</span>
            <p>Lessons done: {lessons_done}</p>
            <span className={styles.divider}>|</span>
            <p>
              <span className={styles.iconWrapper}>
                <Star size={16} fill="var(--svg)" stroke="var(--svg)" />
              </span>
              Rating: {rating}
            </p>
            <span className={styles.divider}>|</span>
            <p>
              Price / hour:{' '}
              <span className={styles.price}>{price_per_hour}$</span>
            </p>
          </div>
          <button
            className={clsx(styles.favoriteButton, {
              [styles.favorited]: isFavorite(id),
            })}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite(id) ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            <Heart
              size={24}
              fill={isFavorite(id) ? 'var(--heart-active)' : 'none'}
              stroke={isFavorite(id) ? 'var(--heart-active)' : 'currentColor'}
            />
          </button>
        </div>
        <h3 className={styles.name}>
          {name} {surname}
        </h3>
        <div className={styles.details}>
          <p className={styles.languages}>
            <span className={styles.detailLabel}>Speaks:</span>{' '}
            <span className={styles.languageList}>{languages.join(', ')}</span>
          </p>
          <p className={styles.lessonInfo}>
            <span className={styles.detailLabel}>Lesson Info:</span>{' '}
            {lesson_info}
          </p>
          <p>
            <span className={styles.detailLabel}>Conditions:</span> {conditions}
          </p>
        </div>

        {!showFullInfo && (
          <button
            className={styles.readMoreButton}
            onClick={() => setShowFullInfo(true)}
          >
            Read more
          </button>
        )}

        {showFullInfo && (
          <div className={styles.fullInfo}>
            <p className={styles.experience}>{experience}</p>
            <ul className={styles.reviewsList}>
              {reviews.map((review, index) => (
                <li key={index} className={styles.reviewItem}>
                  <div className={styles.reviewerMeta}>
                    <img
                      src={`https://ui-avatars.com/api/?name=${review.reviewer_name.replace(
                        ' ',
                        '+'
                      )}&background=random&color=fff`}
                      alt={review.reviewer_name}
                      className={styles.reviewerAvatar}
                    />
                    <div>
                      <p className={styles.reviewerName}>
                        {review.reviewer_name}
                      </p>
                      <p className={styles.reviewRating}>
                        <Star size={16} fill="var(--svg)" stroke="var(--svg)" />{' '}
                        {review.reviewer_rating}
                      </p>
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className={styles.levelList}>
          {levels.map(level => (
            <li
              key={level}
              className={clsx(styles.levelItem, {
                [styles.levelItemActive]: activeLevel === level,
              })}
              onClick={() => setActiveLevel(level)}
            >
              #{level}
            </li>
          ))}
        </ul>

        {showFullInfo && (
          <button onClick={handleBookLessonClick} className={styles.bookButton}>
            Book trial lesson
          </button>
        )}
      </div>
      {isAuthModalOpen && <AuthModal onClose={closeAuthModal} />}
      {isBookModalOpen && (
        <BookTrialLessonModal
          onClose={closeBookModal}
          teacherName={`${name} ${surname}`}
          teacherId={id}
          teacherAvatar={avatar_url}
        />
      )}
    </li>
  );
};

export default TeacherCard;
