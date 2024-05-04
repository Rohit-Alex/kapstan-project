export const getTimeLag = (timestamp: number) => {
  const currentTimestamp = Date.now();
  const timeDifference = currentTimestamp - timestamp;

  if (timeDifference < 1000) {
    return "Just now";
  }
  if (timeDifference < 60 * 1000) {
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
  if (timeDifference < 60 * 60 * 1000) {
    const minutes = Math.floor(timeDifference / (60 * 1000));
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }
  const hours = Math.floor(timeDifference / (60 * 60 * 1000));
  return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
};
