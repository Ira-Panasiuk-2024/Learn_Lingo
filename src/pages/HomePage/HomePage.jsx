import { Link } from 'react-router-dom';

import Header from '../../components/Header/Header';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './HomePage.module.css';

import defaultTheme from '../../assets/img/default_theme.png';
import defaultTheme2x from '../../assets/img/default_theme@2x.png';
import greenTheme from '../../assets/img/green_theme.png';
import greenTheme2x from '../../assets/img/green_theme@2x.png';
import blueTheme from '../../assets/img/blue_theme.png';
import blueTheme2x from '../../assets/img/blue_theme@2x.png';
import pinkLightTheme from '../../assets/img/pinkLight_theme.png';
import pinkLightTheme2x from '../../assets/img/pinkLight_theme@2x.png';
import pinkDarkTheme from '../../assets/img/pinkDark_theme.png';
import pinkDarkTheme2x from '../../assets/img/pinkDark_theme@2x.png';

const THEME_IMAGES = {
  'default-theme': {
    src: defaultTheme,
    srcSet: defaultTheme2x,
  },
  'green-theme': {
    src: greenTheme,
    srcSet: greenTheme2x,
  },
  'blue-theme': {
    src: blueTheme,
    srcSet: blueTheme2x,
  },
  'pinkLight-theme': {
    src: pinkLightTheme,
    srcSet: pinkLightTheme2x,
  },
  'pinkDark-theme': {
    src: pinkDarkTheme,
    srcSet: pinkDarkTheme2x,
  },
};

const HomePage = () => {
  const { currentTheme } = useTheme();

  const currentImage =
    THEME_IMAGES[currentTheme] || THEME_IMAGES['default-theme'];

  return (
    <div className="container">
      <Header />

      <section className={styles.homeSection}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              Unlock your potential with the best{' '}
              <span className={styles.highlight}>language</span> tutors
            </h1>
            <p className={styles.description}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>
            <Link to="/teachers" className={styles.getStartedButton}>
              Get started
            </Link>
          </div>
          <div className={styles.imageContainer}>
            <img
              loading="lazy"
              className={styles.homeImage}
              src={currentImage.src}
              alt="Happy student"
              srcSet={currentImage.srcSet}
              width="568"
              height="530"
            />
          </div>
          <div className={styles.statistics}>
            <div className={styles.statItemExperienced}>
              <p className={styles.statNumber}>32,000 +</p>
              <p className={styles.statLabel}>Experienced tutors</p>
            </div>
            <div className={styles.statItemReviews}>
              <p className={styles.statNumber}>300,000 +</p>
              <p className={styles.statLabel}>5-star tutor reviews</p>
            </div>
            <div className={styles.statItemSubjects}>
              <p className={styles.statNumber}>120 +</p>
              <p className={styles.statLabel}>Subjects taught</p>
            </div>
            <div className={styles.statItemNationalities}>
              <p className={styles.statNumber}>200 +</p>
              <p className={styles.statLabel}>Tutor nationalities</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
