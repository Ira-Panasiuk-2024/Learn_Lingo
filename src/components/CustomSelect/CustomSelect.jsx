import { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.css';

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder,
  displayValueFormatter,
  optionRenderer,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value);

  const displayValue = selectedOption
    ? displayValueFormatter
      ? displayValueFormatter(selectedOption.value)
      : selectedOption.label
    : placeholder;

  const handleOptionClick = optionValue => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      className={`${styles.customSelectContainer} ${className}`}
      ref={selectRef}
    >
      <div
        className={styles.selectedDisplay}
        onClick={() => setIsOpen(!isOpen)}
      >
        {displayValue}
        <span className={`${styles.arrowIcon} ${isOpen ? styles.arrowUp : ''}`}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
      {isOpen && (
        <ul className={styles.optionsList}>
          {options.map(option => (
            <li
              key={option.value}
              className={`${styles.optionItem} ${
                option.value === value ? styles.selected : ''
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {optionRenderer ? optionRenderer(option) : option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
