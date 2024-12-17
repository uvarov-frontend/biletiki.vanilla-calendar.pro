/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable sort-keys */

'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar as VC } from 'vanilla-calendar-pro';
import { getDateString } from 'vanilla-calendar-pro/utils';

import { ITitles, Locale } from '@/types';

import Input from './Input';
import clearInput from './helpers/clearInput';
import formatInputDate from './helpers/formatInputDate';
import getOptions from './helpers/getOptions';
import getTemplate from './helpers/getTemplate';

import 'vanilla-calendar-pro/styles/layout.css';
import './Calendar.css';

export default function Calendar({
  locale,
  placeholderStart,
  placeholderEnd,
  titles,
}: {
  locale: Locale;
  placeholderStart: string;
  placeholderEnd: string;
  titles: ITitles;
}) {
  const [visibilityStart, setVisibilityStart] = useState(false);
  const [visibilityEnd, setVisibilityEnd] = useState(false);
  const [calendar, setCalendar] = useState<VC | null>(null);
  const [inputStartEl, setInputStartEl] = useState<HTMLInputElement | null>(null);
  const [inputEndEl, setInputEndEl] = useState<HTMLInputElement | null>(null);
  const calendarEl = useRef<HTMLDivElement | null>(null);
  const dateMinStr = getDateString(new Date());

  const onClickDate = (self: VC) => {
    if (!inputStartEl || !inputEndEl) return;

    inputStartEl.value = formatInputDate(self.context.selectedDates[0], locale);
    inputEndEl.value = self.context.selectedDates.length > 1 ? formatInputDate(self.context.selectedDates[self.context.selectedDates.length - 1], locale) : '';

    setVisibilityStart(inputStartEl.value.length > 0);
    setVisibilityEnd(inputEndEl.value.length > 0);

    self.set({
      displayDateMin: self.context.selectedDates.length === 1 ? self.context.selectedDates[0] : dateMinStr,
      layouts: {
        multiple: getTemplate(self.context.selectedDates.length === 1, self.context.selectedDates.length >= 1, titles),
      },
    }, {
      dates: false,
      locale: false,
      month: false,
      year: false,
    });
  };

  const handleClick = (e: MouseEvent) => {
    if (!e.target || !(e.target as HTMLElement).closest('[data-vc-custom-btn="close"]')) return;
    calendar?.hide();
    clearInput(
      calendar as VC,
      calendarEl.current as HTMLDivElement,
      'date-end',
      dateMinStr,
      setVisibilityStart,
      setVisibilityEnd,
      titles,
    );
  };

  useEffect(() => {
    if (!calendarEl.current) return;
    setInputStartEl(calendarEl.current.querySelector('input[name="date-start"]') as HTMLInputElement | null);
    setInputEndEl(calendarEl.current.querySelector('input[name="date-end"]') as HTMLInputElement | null);
    setCalendar(new VC(calendarEl.current));
  }, [calendarEl]);

  useEffect(() => {
    if (!calendar || calendar.context.isInit) return;
    const dateMax = new Date();
    dateMax.setFullYear(dateMax.getFullYear() + 1);
    calendar.set({ onClickDate, ...getOptions(locale, getDateString(dateMax), getTemplate(false, false, titles)) });
    calendar.init();
  }, [calendar]);

  useEffect(() => {
    if (!calendarEl.current || !calendar?.context.mainElement) return;
    calendar.context.mainElement?.addEventListener('click', handleClick);
    return () => calendar.context.mainElement?.removeEventListener('click', handleClick);
  }, [calendar?.context.mainElement]);

  return (
    <div ref={calendarEl} className="pointer-events-none relative grid h-full grid-cols-2 gap-[2px]">
      <Input
        name="date-start"
        placeholder={placeholderStart}
        visibility={visibilityStart}
        handleClear={() => clearInput(
          calendar as VC,
          calendarEl.current as HTMLDivElement,
          'date-start',
          dateMinStr,
          setVisibilityStart,
          setVisibilityEnd,
          titles,
        )}
      />
      <Input
        name="date-end"
        placeholder={placeholderEnd}
        visibility={visibilityEnd}
        handleClear={() => clearInput(
          calendar as VC,
          calendarEl.current as HTMLDivElement,
          'date-end',
          dateMinStr,
          setVisibilityStart,
          setVisibilityEnd,
          titles,
        )}
      />
    </div>
  );
}
