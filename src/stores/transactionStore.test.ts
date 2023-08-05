import { useTransactionStore } from './transactionStore';

describe('transactionStore', () => {
  test('should have default transactionList as empty array', () => {
    const transactionList = useTransactionStore.getState().transactionList;

    expect(transactionList).toEqual([]);
  });

  test('should init transactionList with init balance', () => {
    useTransactionStore.getState().initTransaction(100);

    const transactionList = useTransactionStore.getState().transactionList;

    expect(transactionList.length).toBe(1);
    expect(transactionList[0].isInitBalance).toBe(true);
    expect(transactionList[0].balance).toBe(100);
  });

  test('should add new transaction to transactionList', () => {
    const date = new Date();

    useTransactionStore.getState().addTransaction({
      isInitBalance: false,
      when: date,
      amount: 100,
      balance: 200,
    });

    const transactionList = useTransactionStore.getState().transactionList;

    expect(transactionList).toEqual([
      {
        isInitBalance: false,
        when: date,
        amount: 100,
        balance: 200,
      },
    ]);
  });

  test('should reset transactionList to empty array', () => {
    useTransactionStore.getState().initTransaction(100);
    useTransactionStore.getState().resetTransaction();

    const transactionList = useTransactionStore.getState().transactionList;

    expect(transactionList).toEqual([]);
  });
});
