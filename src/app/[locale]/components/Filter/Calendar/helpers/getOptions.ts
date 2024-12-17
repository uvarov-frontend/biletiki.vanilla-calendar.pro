/* eslint-disable sort-keys */
import { type Options, FormatDateString } from 'vanilla-calendar-pro';

const getOptions = (locale: string, date: FormatDateString, template: string): Options => ({
  inputMode: true,
  type: 'multiple',
  dateMax: date,
  locale,
  disableDatesPast: true,
  selectionDatesMode: 'multiple-ranged',
  selectionYearsMode: 'only-arrows',
  selectionMonthsMode: 'only-arrows',
  enableDateToggle: false,
  selectedTheme: 'light',
  displayDatesOutside: false,
  positionToInput: 'center',
  layouts: {
    multiple: template,
  },
});

export default getOptions;
