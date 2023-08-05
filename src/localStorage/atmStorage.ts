const NUMBER_OF_5_EURO_NOTE_STORAGE_KEY = 'number-of-5-euro-note';
const NUMBER_OF_10_EURO_NOTE_STORAGE_KEY = 'number-of-10-euro-note';
const NUMBER_OF_20_EURO_NOTE_STORAGE_KEY = 'number-of-20-euro-note';

export const initialNote = () => {
  localStorage.setItem(NUMBER_OF_5_EURO_NOTE_STORAGE_KEY, '4');
  localStorage.setItem(NUMBER_OF_10_EURO_NOTE_STORAGE_KEY, '15');
  localStorage.setItem(NUMBER_OF_20_EURO_NOTE_STORAGE_KEY, '7');
};
