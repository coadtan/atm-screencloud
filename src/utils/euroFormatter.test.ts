import { euroFormatter } from './euroFormatter';

describe('euroFormatter', () => {
  test('format 1000 to £1,000', () => {
    const result = euroFormatter.format(1000);
    expect(result).toBe('£1,000');
  });

  test('format 9 to £9', () => {
    const result = euroFormatter.format(9);
    expect(result).toBe('£9');
  });
});
