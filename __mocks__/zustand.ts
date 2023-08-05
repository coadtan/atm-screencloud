import { vi } from 'vitest';
import * as zustand from 'zustand';
import { act } from '@testing-library/react';

const { create: actualCreate } = await vi.importActual<typeof zustand>(
  'zustand',
);

export const storeResetFns = new Set<() => void>();

export const create = (<T>() => {
  return (stateCreator: zustand.StateCreator<T>) => {
    const store = actualCreate(stateCreator);
    const initialState = store.getState();
    storeResetFns.add(() => {
      store.setState(initialState, true);
    });
    return store;
  };
}) as typeof zustand.create;

afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
