import { create } from 'zustand';

export type NoteNumberType = {
  fiveEuroNum: number;
  tenEuroNum: number;
  twentyEuroNum: number;
};

interface NoteState {
  noteNumber: NoteNumberType;
  resetNotes: () => void;
  decreaseNoteNumber: (newNoteNumber: NoteNumberType) => void;
  getRemainingAtmBalance: () => number;
}

const initialState: NoteNumberType = {
  fiveEuroNum: 4,
  tenEuroNum: 15,
  twentyEuroNum: 7,
};

export const useNoteStore = create<NoteState>()((set, get) => ({
  noteNumber: initialState,
  resetNotes: () =>
    set(() => ({
      noteNumber: initialState,
    })),
  decreaseNoteNumber: (noteUsed) =>
    set(() => ({
      noteNumber: {
        fiveEuroNum: get().noteNumber.fiveEuroNum - noteUsed.fiveEuroNum,
        tenEuroNum: get().noteNumber.tenEuroNum - noteUsed.tenEuroNum,
        twentyEuroNum: get().noteNumber.twentyEuroNum - noteUsed.twentyEuroNum,
      },
    })),
  getRemainingAtmBalance: () => {
    const { fiveEuroNum, tenEuroNum, twentyEuroNum } = get().noteNumber;
    return fiveEuroNum * 5 + tenEuroNum * 10 + twentyEuroNum * 20;
  },
}));
