export const timestampToTimer = (targetTimestamp: number) => {
  const targetDate = new Date(targetTimestamp);

  const dateDiffSeconds = Math.floor(
    (targetDate.getTime() - Date.now()) / 1000
  );

  return dateDiffSeconds > 0
    ? `${Math.floor(dateDiffSeconds / 60)}:${dateDiffSeconds % 60}`
    : `0:00`;
};
