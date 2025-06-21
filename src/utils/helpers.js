import { LANGUAGES, LEVELS, PRICE } from './constants';

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getPriceOptions = () => {
  return [
    { value: '', label: 'Price' },
    ...PRICE.map(p => ({
      value: p.value,
      label: String(p.value),
    })),
  ];
};

export const formatPriceDisplay = value => {
  return value ? `${value} $` : 'Price';
};

export const getLanguageOptions = () => {
  return [
    { value: '', label: 'Languages' },
    ...LANGUAGES.map(lang => ({
      value: lang,
      label: lang,
    })),
  ];
};

export const getLevelOptions = () => {
  return [
    { value: '', label: 'Levels' },
    ...LEVELS.map(lvl => ({
      value: lvl,
      label: lvl,
    })),
  ];
};
