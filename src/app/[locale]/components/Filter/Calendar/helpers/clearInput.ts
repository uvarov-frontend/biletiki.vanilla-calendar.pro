import { Dispatch, SetStateAction } from 'react';
import { Calendar, FormatDateString } from 'vanilla-calendar-pro';

import { ITitles } from '@/types';

import getTemplate from './getTemplate';

const clearInput = (
    calendar: Calendar,
    calendarEl: HTMLDivElement,
    typeDate: 'date-start' | 'date-end',
    dateMinStr: FormatDateString,
    setVisibilityStart: Dispatch<SetStateAction<boolean>>,
    setVisibilityEnd: Dispatch<SetStateAction<boolean>>,
    titles: ITitles,
  ) => {
  const inputStart: HTMLInputElement | null = calendarEl.querySelector('input[name="date-start"]');
  const inputEnd: HTMLInputElement | null = calendarEl.querySelector('input[name="date-end"]');

  if (!inputStart || !inputEnd) return;

  const handlers = {
    'date-end': () => {
      calendar.set({
        displayDateMin: calendar.context.selectedDates[0],
        layouts: {
          multiple: getTemplate(true, true, titles),
        },
      }, { dates: 'only-first', locale: false, month: false, year: false });
      inputEnd.value = '';
      setVisibilityEnd(false);
    },
    'date-start': () => {
      calendar.set({
        displayDateMin: dateMinStr,
        layouts: {
          multiple: getTemplate(false, false, titles),
        },
      }, { dates: true, locale: false, month: false, year: false });

      inputStart.value = '';
      inputEnd.value = '';
      setVisibilityStart(false);
      setVisibilityEnd(false);
    },
  };

  handlers[typeDate]();
};

export default clearInput;
