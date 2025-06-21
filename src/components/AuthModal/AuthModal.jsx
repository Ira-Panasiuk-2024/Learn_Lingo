import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff } from 'lucide-react';

import Modal from '../Modal/Modal';
import { loginSchema, registerSchema } from '../../utils/validationSchemas';
import { registerUser, loginUser } from '../../api/firebase';
import { useToast } from '../../contexts/ToastContext';
import styles from './AuthModal.module.css';

const AuthModal = ({ onClose, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const currentSchema = isLogin ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(currentSchema),
    mode: 'onChange',
  });

  const onSubmit = async data => {
    setIsLoading(true);

    try {
      if (isLogin) {
        await loginUser(data.email, data.password);
        showToast('Welcome back! You have successfully logged in.', 'success');
      } else {
        await registerUser(data.email, data.password, data.name);
        showToast(
          'Welcome! Your account has been created successfully.',
          'success'
        );
      }
      onClose();
    } catch (error) {
      let errorMessage = 'Authentication failed. Please try again.';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage =
          'This email is already registered. Please log in instead.';
        setIsLogin(true);
        reset();
      } else if (error.code === 'auth/weak-password') {
        errorMessage =
          'Password is too weak. Please use at least 6 characters.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage =
          'No account found with this email. Please register first.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage =
          'Invalid credentials. Please check your email and password.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (
        error.code === 'PERMISSION_DENIED' ||
        error.message?.includes('PERMISSION_DENIED') ||
        error.message?.includes('Permission denied')
      ) {
        errorMessage =
          'Unable to save user data. Please contact support if this persists.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setShowPassword(false);
    reset();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className={styles.title}>{isLogin ? 'Log In' : 'Registration'}</h2>
      <p className={styles.subtitle}>
        {isLogin
          ? 'Welcome back! Please enter your credentials to access your account and continue your search for an amazing tutor.'
          : 'Thank you for your interest in our platform! To register, please fill out the following information.'}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {!isLogin && (
          <div className={styles.formGroup}>
            <input
              id="name"
              type="text"
              placeholder="Name"
              aria-label="Name"
              autoComplete="name"
              disabled={isLoading}
              {...register('name')}
              className={styles.input}
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>
        )}

        <div className={styles.formGroup}>
          <input
            id="email"
            type="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="email"
            disabled={isLoading}
            {...register('email')}
            className={styles.input}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              aria-label="Password"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              disabled={isLoading}
              {...register('password')}
              className={styles.input}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.passwordToggle}
              disabled={isLoading}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
        </button>
      </form>

      <p className={styles.toggleAuth}>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          type="button"
          onClick={handleToggleMode}
          className={styles.toggleButton}
          disabled={isLoading}
        >
          {isLogin ? 'Register' : 'Log In'}
        </button>
      </p>
    </Modal>
  );
};

export default AuthModal;
