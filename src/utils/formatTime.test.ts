import { formatTime } from './formatTime';

describe('formatTime', () => {
  test('should return a formatted time "00:00:00"', () => {
    const result = formatTime(new Date('2020-01-01T00:00:00.000Z'));
    expect(result).toEqual('00:00:00');
  });

  test('should return a formatted time "15:20:56"', () => {
    const result = formatTime(new Date('2023-08-05T15:20:56.120Z'));
    expect(result).toEqual('15:20:56');
  });
});
