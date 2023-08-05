import '@testing-library/jest-dom';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

vi.mock('zustand');
vi.mock('@tanstack/router', async () => {
  const actual = await vi.importActual('@tanstack/router');
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});
