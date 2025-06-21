import { Link, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { LogIn } from 'lucide-react';

import styles from './Header.module.css';
import ukraineLogo from '../../assets/icons/ukraineLogo.svg';

import { useAuth } from '../../contexts/AuthContext';
import { logoutUser } from '../../api/firebase';
import { useToast } from '../../contexts/ToastContext';
import { useModal } from '../../hooks/useModal';
import AuthModal from '../AuthModal/AuthModal';
import ThemeSelector from '../ThemeSelector/ThemeSelector';

const Header = () => {
  const { isAuthenticated, currentUser, userProfile } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { isModalOpen, modalType, openModal, closeModal } = useModal();

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
      showToast('Logged out successfully!', 'success');
      navigate('/');
    } catch (error) {
      showToast(`Logout failed: ${error.message}`, 'error');
    }
  }, [showToast, navigate]);

  const handleLoginClick = () => {
    openModal('login');
  };

  const handleRegisterClick = () => {
    openModal('register');
  };

  const displayName = userProfile?.name || currentUser?.displayName || 'User';

  return (
    <header className={styles.header}>
      <div className={styles.wraper}>
        <Link to="/" className={styles.logoLink}>
          <img
            src={ukraineLogo}
            alt="LearnLingo Logo"
            className={styles.learnLingoLogo}
          />
          <span className={styles.logoText}>LearnLingo</span>
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/teachers" className={styles.navLink}>
            Teachers
          </Link>
          {isAuthenticated && (
            <Link to="/favorites" className={styles.navLink}>
              Favorites
            </Link>
          )}
        </nav>
        <div className={styles.authActions}>
          <ThemeSelector />

          {isAuthenticated ? (
            <>
              <span className={styles.userEmail}>{displayName}</span>
              <button onClick={handleLogout} className={styles.authButton}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <button onClick={handleLoginClick} className={styles.authButton}>
                <LogIn size={20} className={styles.authIcon} />
                Log in
              </button>
              <button
                onClick={handleRegisterClick}
                className={`${styles.authButton} ${styles.registerButton}`}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>
      {isModalOpen && (
        <AuthModal onClose={closeModal} initialMode={modalType} />
      )}
    </header>
  );
};

export default Header;
