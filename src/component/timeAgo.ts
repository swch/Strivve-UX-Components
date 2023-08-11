const MONTH_NAMES: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function getFormattedDate(
  date: Date,
  prefomattedDate = '',
  hideYear = false
): string {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = parseInt(`0${minutes}`, 10);
  }

  if (prefomattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${prefomattedDate} at ${hours}:${minutes}`;
  }

  if (hideYear) {
    // 10. January at 10:20
    return `${day}. ${month} at ${hours}:${minutes}`;
  }

  // 10. January 2017. at 10:20
  return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
}

export default function timeAgo(
  dateParam?: Date | string | number
): string | null {
  if (!dateParam) {
    return null;
  }

  const date: Date =
    typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const HOUR_IN_MS = 3600000; // 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today.getTime() - DAY_IN_MS);
  const hours = Math.round((today.getTime() - date.getTime()) / HOUR_IN_MS);
  const seconds = Math.round((today.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();

  if (seconds < 5) {
    return 'now';
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 90) {
    return 'about a minute ago';
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (isToday) {
    return getFormattedDate(date, 'Today');
  } else if (isYesterday) {
    return getFormattedDate(date, 'Yesterday');
  } else if (isThisYear) {
    return getFormattedDate(date, '', true);
  }

  return getFormattedDate(date);
}
