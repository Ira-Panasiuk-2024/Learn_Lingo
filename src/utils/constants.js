export const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Mandarin Chinese',
  'Italian',
  'Korean',
  'Vietnamese',
];

export const LEVELS = [
  'A1 Beginner',
  'A2 Elementary',
  'B1 Intermediate',
  'B2 Upper-Intermediate',
  'C1 Advanced',
  'C2 Proficient',
];

export const PRICE = [
  { value: '10', label: '10 $' },
  { value: '20', label: '20 $' },
  { value: '30', label: '30 $' },
  { value: '40', label: '40 $' },
];

export const THEMES = [
  'default-theme',
  'green-theme',
  'blue-theme',
  'pinkLight-theme',
  'pinkDark-theme',
];

export const THEME_CONFIG = {
  'default-theme': {
    name: 'Default',
    color: '#F4C550',
    secondaryColor: '#FBE9BA',
  },
  'green-theme': {
    name: 'Green',
    color: '#9FBAAE',
    secondaryColor: '#CBDED3',
  },
  'blue-theme': {
    name: 'Blue',
    color: '#9FB7CE',
    secondaryColor: '#BFD6EA',
  },
  'pinkLight-theme': {
    name: 'Pink Light',
    color: '#F0AA8D',
    secondaryColor: '#F4C8BA',
  },
  'pinkDark-theme': {
    name: 'Pink Dark',
    color: '#E0A39A',
    secondaryColor: '#F2C0BD',
  },
};

export const STORAGE_KEY = 'appTheme';
