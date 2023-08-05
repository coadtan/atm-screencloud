const padZero = (value: number) => value.toString().padStart(2, '0');

export const formatTime = (date: Date): string => {
  const hours = padZero(date.getUTCHours());
  const minutes = padZero(date.getUTCMinutes());
  const seconds = padZero(date.getUTCSeconds());

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedTime;
};
