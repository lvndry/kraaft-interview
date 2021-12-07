export const formatDate = (date: Date) => {
  const [year, month, day, hours, minutes, seconds] = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];

  return `${day}/${month}/${year} - ${hours}:${minutes}:${
    seconds < 10 ? 0 : ''
  }${seconds}`;
};
