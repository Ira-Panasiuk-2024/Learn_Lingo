import { useState, useEffect } from 'react';

import {
  truncateText,
  getPriceOptions,
  formatPriceDisplay,
  getLanguageOptions,
  getLevelOptions,
} from '../../utils/helpers';
import CustomSelect from '../CustomSelect/CustomSelect';
import styles from './Filter.module.css';

const Filter = ({ onFilterChange, currentFilters }) => {
  const [language, setLanguage] = useState(currentFilters.language || '');
  const [level, setLevel] = useState(currentFilters.level || '');
  const [price, setPrice] = useState(currentFilters.price || '');

  useEffect(() => {
    setLanguage(currentFilters.language || '');
    setLevel(currentFilters.level || '');
    setPrice(currentFilters.price || '');
  }, [currentFilters]);

  const handleFilterApply = (newLanguage, newLevel, newPrice) => {
    onFilterChange({
      language: newLanguage,
      level: newLevel,
      price: newPrice,
    });
  };

  const handleResetFilters = () => {
    setLanguage('');
    setLevel('');
    setPrice('');
    onFilterChange({ language: '', level: '', price: '' });
  };

  const LEVEL_TRUNCATE_LENGTH = 16;

  const languageOptions = getLanguageOptions();
  const levelOptions = getLevelOptions();
  const priceOptions = getPriceOptions();

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Languages</label>
        <CustomSelect
          options={languageOptions}
          value={language}
          onChange={newValue => {
            setLanguage(newValue);
            handleFilterApply(newValue, level, price);
          }}
          placeholder="Languages"
          optionRenderer={option => option.label}
          className={styles.languageSelect}
        />
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Level of knowledge</label>
        <CustomSelect
          options={levelOptions}
          value={level}
          onChange={newValue => {
            setLevel(newValue);
            handleFilterApply(language, newValue, price);
          }}
          placeholder="Levels"
          optionRenderer={option =>
            truncateText(option.label, LEVEL_TRUNCATE_LENGTH)
          }
          displayValueFormatter={value =>
            value ? truncateText(value, LEVEL_TRUNCATE_LENGTH) : 'Levels'
          }
          className={styles.levelSelect}
        />
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Price</label>
        <CustomSelect
          options={priceOptions}
          value={price}
          onChange={newValue => {
            setPrice(newValue);
            handleFilterApply(language, level, newValue);
          }}
          placeholder="Price"
          displayValueFormatter={formatPriceDisplay}
          optionRenderer={option => option.label}
          className={styles.priceSelect}
        />
      </div>

      {(language || level || price) && (
        <button className={styles.resetButton} onClick={handleResetFilters}>
          Reset filters
        </button>
      )}
    </div>
  );
};

export default Filter;
