import { render } from '@testing-library/react';
import { RootLayout } from './RootLayout';
import * as routers from '@tanstack/router';
import { useAuthStore } from '../stores/authStore';
import { NoteNumber } from '../components/NoteNumber';
import { ResetEverything } from '../components/ResetEverything';
import { mockComponent } from '../utils/tests/mockComponent';

vi.mock('../components/NoteNumber');

vi.mock('../components/ResetEverything');

describe(RootLayout, () => {
  beforeEach(() => {
    vi.spyOn(routers, 'Outlet').mockImplementation(() => <></>);
  });

  test('should display ATM Zone', () => {
    const view = render(<RootLayout />);

    expect(view.getByText(/ATM Zone/i)).toBeDefined();
  });

  test('should display "authenticated" if user is authenticated', () => {
    useAuthStore.setState({ isAuth: true });

    const view = render(<RootLayout />);

    expect(view.getByText('authenticated')).toBeDefined();
  });

  test('should display "unauthenticated" if user is unauthenticated', () => {
    useAuthStore.setState({ isAuth: false });

    const view = render(<RootLayout />);

    expect(view.getByText('unauthenticated')).toBeDefined();
  });

  test('should render NoteNumber', () => {
    mockComponent(NoteNumber);

    const view = render(<RootLayout />);

    expect(view.getByText(NoteNumber.name)).toBeDefined();
  });

  test('should render ResetEverything', () => {
    mockComponent(ResetEverything);

    const view = render(<RootLayout />);

    expect(view.getByText(ResetEverything.name)).toBeDefined();
  });
});
