import { create } from 'zustand';

type NoteNumberType = {
  fiveEuroNum: number;
  tenEuroNum: number;
  twentyEuroNum: number;
};

interface NoteState {
  noteNumber: NoteNumberType;
  reset: () => void;
  updateNoteNumber: (newNoteNumber: NoteNumberType) => void;
  getRemainingAtmBalance: () => number;
}

const initialState: NoteNumberType = {
  fiveEuroNum: 4,
  tenEuroNum: 15,
  twentyEuroNum: 7,
};

export const useNoteStore = create<NoteState>()((set, get) => ({
  noteNumber: initialState,
  reset: () =>
    set(() => ({
      noteNumber: initialState,
    })),
  updateNoteNumber: (newNoteNumber) =>
    set(() => ({ noteNumber: newNoteNumber })),
  getRemainingAtmBalance: () => {
    const { fiveEuroNum, tenEuroNum, twentyEuroNum } = get().noteNumber;
    return fiveEuroNum * 5 + tenEuroNum * 10 + twentyEuroNum * 20;
  },
}));
