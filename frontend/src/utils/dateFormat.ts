import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string, formatString: string = 'dd.MM.yyyy'): string => {
  try {
    const date = parseISO(dateString);
    return format(date, formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const formatDateTime = (dateString: string): string => {
  return formatDate(dateString, 'dd.MM.yyyy HH:mm');
};

export const formatMonthYear = (dateString: string): string => {
  return formatDate(dateString, 'MMMM yyyy');
};