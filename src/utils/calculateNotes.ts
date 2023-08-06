import type { NoteNumberType } from '../stores/noteStore';

type CalculateNotesReturnType = {
  isWithdrawalSuccessful: boolean;
  noteUsed: NoteNumberType;
};

export const calculateNotes = (
  amount: number,
  noteInATM: NoteNumberType,
): CalculateNotesReturnType => {
  let remaining = amount;

  const result: NoteNumberType = {
    fiveEuroNum: 0,
    tenEuroNum: 0,
    twentyEuroNum: 0,
  };

  const totalNoteInATM =
    noteInATM.fiveEuroNum + noteInATM.tenEuroNum + noteInATM.twentyEuroNum;

  const remainingNoteInATM: NoteNumberType = structuredClone(noteInATM);

  for (let i = 0; i <= totalNoteInATM; i++) {
    if (remaining >= 20 && remainingNoteInATM.twentyEuroNum > 0) {
      result.twentyEuroNum += 1;
      remainingNoteInATM.twentyEuroNum -= 1;
      remaining -= 20;
    }
    if (
      remaining != 0 &&
      remaining >= 10 &&
      remainingNoteInATM.tenEuroNum > 0
    ) {
      result.tenEuroNum += 1;
      remainingNoteInATM.tenEuroNum -= 1;
      remaining -= 10;
    }
    if (remaining != 0 && remainingNoteInATM.fiveEuroNum > 0) {
      result.fiveEuroNum += 1;
      remainingNoteInATM.fiveEuroNum -= 1;
      remaining -= 5;
    }

    if (remaining < 0) {
      break;
    }
  }

  if (remaining != 0) {
    return {
      isWithdrawalSuccessful: false,
      noteUsed: {
        fiveEuroNum: 0,
        tenEuroNum: 0,
        twentyEuroNum: 0,
      },
    };
  }

  return {
    isWithdrawalSuccessful: true,
    noteUsed: result,
  };
};
