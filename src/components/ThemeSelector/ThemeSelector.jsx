import { useTheme } from '../../contexts/ThemeContext';
import { THEME_CONFIG } from '../../utils/constants';
import styles from './ThemeSelector.module.css';

const ThemeSelector = () => {
  const { currentTheme, changeTheme, allThemes } = useTheme();

  return (
    <div className={styles.themeSelector}>
      <span className={styles.label}>Theme:</span>
      <div className={styles.themePalette}>
        {allThemes.map(theme => (
          <button
            key={theme}
            onClick={() => changeTheme(theme)}
            className={`${styles.themeButton} ${
              currentTheme === theme ? styles.active : ''
            }`}
            style={{
              backgroundColor: THEME_CONFIG[theme]?.color || '#F4C550',
            }}
            title={THEME_CONFIG[theme]?.name || theme}
            aria-label={`Switch to ${THEME_CONFIG[theme]?.name || theme} theme`}
          >
            {currentTheme === theme && (
              <svg
                className={styles.checkIcon}
                viewBox="0 0 16 16"
                fill="currentColor"
                width="12"
                height="12"
              >
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
