import '@testing-library/jest-dom';

vi.mock('zustand');
vi.mock('@tanstack/router', () => ({
  useNavigate: () => vi.fn(),
}));

afterEach(() => {
  vi.restoreAllMocks();
});
