import { FormatDateString } from 'vanilla-calendar-pro';
import { getDate } from 'vanilla-calendar-pro/utils';

const formatInputDate = (date: string, locale: string) => getDate(date as FormatDateString).toLocaleDateString(locale, {
  day: 'numeric',
  month: locale === 'ru' ? 'long' : 'short',
  weekday: 'short',
}).split(', ').reverse().join(', ');

export default formatInputDate;
