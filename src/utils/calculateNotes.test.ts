import { type NoteNumberType } from '../stores/noteStore';
import { calculateNotes } from './calculateNotes';

describe('calculateNotes', () => {
  describe('withdraw success', () => {
    test('withdraw exact match number of notes in ATM', () => {
      const noteInATM: NoteNumberType = {
        twentyEuroNum: 4,
        tenEuroNum: 4,
        fiveEuroNum: 4,
      };
      const withdrawAmount = 140;

      const result = calculateNotes(withdrawAmount, noteInATM);

      expect(result.isWithdrawalSuccessful).toBe(true);
      expect(result.noteUsed).toEqual({
        fiveEuroNum: 4,
        tenEuroNum: 4,
        twentyEuroNum: 4,
      });
    });

    test('withdraw 100 and ATM has enough notes', () => {
      const noteInATM: NoteNumberType = {
        twentyEuroNum: 4,
        tenEuroNum: 4,
        fiveEuroNum: 4,
      };
      const withdrawAmount = 100;

      const result = calculateNotes(withdrawAmount, noteInATM);

      expect(result.isWithdrawalSuccessful).toBe(true);
      expect(result.noteUsed).toEqual({
        fiveEuroNum: 2,
        tenEuroNum: 3,
        twentyEuroNum: 3,
      });
    });

    test('withdraw 2000 and ATM has a lot of notes', () => {
      const noteInATM: NoteNumberType = {
        twentyEuroNum: 99999,
        tenEuroNum: 99999,
        fiveEuroNum: 99999,
      };
      const withdrawAmount = 2000;

      const result = calculateNotes(withdrawAmount, noteInATM);

      expect(result.isWithdrawalSuccessful).toBe(true);
      expect(result.noteUsed).toEqual({
        fiveEuroNum: 58,
        tenEuroNum: 57,
        twentyEuroNum: 57,
      });
    });

    describe('certain notes run out', () => {
      test('withdraw 2000 and ATM only has twenty notes', () => {
        const noteInATM: NoteNumberType = {
          twentyEuroNum: 100,
          tenEuroNum: 0,
          fiveEuroNum: 0,
        };
        const withdrawAmount = 2000;

        const result = calculateNotes(withdrawAmount, noteInATM);

        expect(result.isWithdrawalSuccessful).toBe(true);
        expect(result.noteUsed).toEqual({
          fiveEuroNum: 0,
          tenEuroNum: 0,
          twentyEuroNum: 100,
        });
      });

      test('withdraw 2000 and ATM only has ten notes', () => {
        const noteInATM: NoteNumberType = {
          twentyEuroNum: 0,
          tenEuroNum: 200,
          fiveEuroNum: 0,
        };
        const withdrawAmount = 2000;

        const result = calculateNotes(withdrawAmount, noteInATM);

        expect(result.isWithdrawalSuccessful).toBe(true);
        expect(result.noteUsed).toEqual({
          fiveEuroNum: 0,
          tenEuroNum: 200,
          twentyEuroNum: 0,
        });
      });

      test('withdraw 2000 and ATM only has five notes', () => {
        const noteInATM: NoteNumberType = {
          twentyEuroNum: 0,
          tenEuroNum: 0,
          fiveEuroNum: 400,
        };
        const withdrawAmount = 2000;

        const result = calculateNotes(withdrawAmount, noteInATM);

        expect(result.isWithdrawalSuccessful).toBe(true);
        expect(result.noteUsed).toEqual({
          fiveEuroNum: 400,
          tenEuroNum: 0,
          twentyEuroNum: 0,
        });
      });

      test('withdraw 2000 and ATM only has ten and five notes', () => {
        const noteInATM: NoteNumberType = {
          twentyEuroNum: 0,
          tenEuroNum: 400,
          fiveEuroNum: 400,
        };
        const withdrawAmount = 2000;

        const result = calculateNotes(withdrawAmount, noteInATM);

        expect(result.isWithdrawalSuccessful).toBe(true);
        expect(result.noteUsed).toEqual({
          fiveEuroNum: 134,
          tenEuroNum: 133,
          twentyEuroNum: 0,
        });
      });

      test('withdraw 2000 and ATM only has ten and twenty notes', () => {
        const noteInATM: NoteNumberType = {
          twentyEuroNum: 400,
          tenEuroNum: 400,
          fiveEuroNum: 0,
        };
        const withdrawAmount = 2000;

        const result = calculateNotes(withdrawAmount, noteInATM);

        expect(result.isWithdrawalSuccessful).toBe(true);
        expect(result.noteUsed).toEqual({
          fiveEuroNum: 0,
          tenEuroNum: 66,
          twentyEuroNum: 67,
        });
      });

      test('withdraw 2000 and ATM only has five and twenty notes', () => {
        const noteInATM: NoteNumberType = {
          twentyEuroNum: 400,
          tenEuroNum: 0,
          fiveEuroNum: 400,
        };
        const withdrawAmount = 2000;

        const result = calculateNotes(withdrawAmount, noteInATM);

        expect(result.isWithdrawalSuccessful).toBe(true);
        expect(result.noteUsed).toEqual({
          fiveEuroNum: 80,
          tenEuroNum: 0,
          twentyEuroNum: 80,
        });
      });
    });
  });

  describe('withdraw unsuccess', () => {
    describe('unavailable notes', () => {
      test('withdraw 1 euro', () => {
        const noteInATM: NoteNumberType = {
          twentyEuroNum: 0,
          tenEuroNum: 0,
          fiveEuroNum: 1,
        };
        const withdrawAmount = 1;

        const result = calculateNotes(withdrawAmount, noteInATM);

        expect(result.isWithdrawalSuccessful).toBe(false);
        expect(result.noteUsed).toEqual({
          fiveEuroNum: 0,
          tenEuroNum: 0,
          twentyEuroNum: 0,
        });
      });

      test('withdraw 9 euro', () => {
        const noteInATM: NoteNumberType = {
          twentyEuroNum: 0,
          tenEuroNum: 0,
          fiveEuroNum: 1,
        };
        const withdrawAmount = 9;

        const result = calculateNotes(withdrawAmount, noteInATM);

        expect(result.isWithdrawalSuccessful).toBe(false);
        expect(result.noteUsed).toEqual({
          fiveEuroNum: 0,
          tenEuroNum: 0,
          twentyEuroNum: 0,
        });
      });

      test('withdraw 5 euro while ATM only has a 10 note', () => {
        const noteInATM: NoteNumberType = {
          twentyEuroNum: 0,
          tenEuroNum: 1,
          fiveEuroNum: 0,
        };
        const withdrawAmount = 5;

        const result = calculateNotes(withdrawAmount, noteInATM);

        expect(result.isWithdrawalSuccessful).toBe(false);
        expect(result.noteUsed).toEqual({
          fiveEuroNum: 0,
          tenEuroNum: 0,
          twentyEuroNum: 0,
        });
      });
    });

    describe('insufficient cash', () => {
      test('withdraw 100 euro while ATM has 90 euro', () => {
        const noteInATM: NoteNumberType = {
          twentyEuroNum: 4,
          tenEuroNum: 1,
          fiveEuroNum: 0,
        };
        const withdrawAmount = 100;

        const result = calculateNotes(withdrawAmount, noteInATM);

        expect(result.isWithdrawalSuccessful).toBe(false);
        expect(result.noteUsed).toEqual({
          fiveEuroNum: 0,
          tenEuroNum: 0,
          twentyEuroNum: 0,
        });
      });
    });
  });
});
