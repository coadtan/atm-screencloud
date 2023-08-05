import { useNoteStore } from './noteStore';

describe('noteStore', () => {
  test('should have default notes', () => {
    const noteNumber = useNoteStore.getState().noteNumber;
    expect(noteNumber).toEqual({
      fiveEuroNum: 4,
      tenEuroNum: 15,
      twentyEuroNum: 7,
    });
  });

  test('should reset notes to initialState', () => {
    useNoteStore.setState({
      noteNumber: {
        fiveEuroNum: 1,
        tenEuroNum: 2,
        twentyEuroNum: 3,
      },
    });

    useNoteStore.getState().resetNotes();

    const noteNumber = useNoteStore.getState().noteNumber;

    expect(noteNumber).toEqual({
      fiveEuroNum: 4,
      tenEuroNum: 15,
      twentyEuroNum: 7,
    });
  });

  test('should decrease notes', () => {
    useNoteStore.setState({
      noteNumber: {
        fiveEuroNum: 10,
        tenEuroNum: 10,
        twentyEuroNum: 10,
      },
    });

    useNoteStore.getState().decreaseNoteNumber({
      fiveEuroNum: 3,
      tenEuroNum: 3,
      twentyEuroNum: 3,
    });

    const noteNumber = useNoteStore.getState().noteNumber;

    expect(noteNumber).toEqual({
      fiveEuroNum: 7,
      tenEuroNum: 7,
      twentyEuroNum: 7,
    });
  });

  test('should return remaining atm balance', () => {
    useNoteStore.setState({
      noteNumber: {
        fiveEuroNum: 1,
        tenEuroNum: 1,
        twentyEuroNum: 1,
      },
    });

    const remainingAtmBalance = useNoteStore
      .getState()
      .getRemainingAtmBalance();

    expect(remainingAtmBalance).toBe(35);
  });
});
