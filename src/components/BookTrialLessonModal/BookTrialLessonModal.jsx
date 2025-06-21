import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

import Modal from '../Modal/Modal';
import { bookLessonSchema } from '../../utils/validationSchemas';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import { bookTrialLesson } from '../../api/firebase';
import styles from './BookTrialLessonModal.module.css';

const BookTrialLessonModal = ({
  onClose,
  teacherName,
  teacherId,
  teacherAvatar,
}) => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookLessonSchema),
    defaultValues: {
      email: currentUser?.email || '',
    },
  });

  const onSubmit = async data => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const bookingData = {
        ...data,
        teacherId,
        teacherName,
        userId: currentUser?.uid,
        userEmail: currentUser?.email,
      };

      await bookTrialLesson(bookingData);

      showToast('Trial lesson booked successfully!', 'success');
      onClose();
    } catch (error) {
      showToast('Failed to book lesson. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal onClose={onClose} className={styles.bookingModal}>
      <h2 className={styles.title}>Book trial lesson</h2>
      <p className={styles.subtitle}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div className={styles.teacherInfo}>
        <img
          src={
            teacherAvatar || 'https://via.placeholder.com/44x44?text=Teacher'
          }
          alt={teacherName}
          className={styles.teacherAvatar}
        />
        <div className={styles.teacherInfoWrapper}>
          <p className={styles.teacherName}>Your teacher: </p>
          <span className={styles.teacherNameHighlight}>{teacherName}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h3 className={styles.formQuestion}>
          What is your main reason for learning English?
        </h3>

        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="reason"
              value="Career and business"
              {...register('reason')}
            />
            <span className={styles.customRadio}></span>
            <span className="radio-text">Career and business</span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="reason"
              value="Lesson for kids"
              {...register('reason')}
            />
            <span className={styles.customRadio}></span>
            <span className="radio-text">Lesson for kids</span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="reason"
              value="Living abroad"
              {...register('reason')}
            />
            <span className={styles.customRadio}></span>
            <span className="radio-text">Living abroad</span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="reason"
              value="Exams and coursework"
              {...register('reason')}
            />
            <span className={styles.customRadio}></span>
            <span className="radio-text">Exams and coursework</span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="reason"
              value="Culture, travel or hobby"
              {...register('reason')}
            />
            <span className={styles.customRadio}></span>
            <span className="radio-text">Culture, travel or hobby</span>
          </label>

          {errors.reason && (
            <p className={styles.error}>{errors.reason.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            id="fullName"
            type="text"
            placeholder="Full Name"
            aria-label="fullName"
            autoComplete="fullName"
            {...register('fullName')}
            className={styles.input}
            disabled={isSubmitting}
          />
          {errors.fullName && (
            <p className={styles.error}>{errors.fullName.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            id="email"
            type="email"
            placeholder="Email"
            aria-label="email"
            autoComplete="email"
            {...register('email')}
            className={styles.input}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            id="phone"
            type="tel"
            placeholder="Phone number"
            aria-label="phone"
            autoComplete="tel"
            {...register('phone')}
            className={styles.input}
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className={styles.error}>{errors.phone.message}</p>
          )}
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Booking...' : 'Book'}
        </button>
      </form>
    </Modal>
  );
};

export default BookTrialLessonModal;
