import { FlightLevels, FlightPeoples } from '@/bd';
import { ICategory, ITitles, Locale } from '@/types';

import Calendar from './Calendar/Calendar';
import Dropdown from './Dropdown/Dropdown';
import Input from './Input';

export default function FilterFlights({ activeCategory, locale }: { activeCategory: ICategory; locale: Locale }) {
  const titles: ITitles = {
    btn: activeCategory.calendar.title.btn,
    end: activeCategory.calendar.title.end,
    start: activeCategory.calendar.title.start,
  };

  return (
    <form
      className="mt-12 grid h-[3.75rem] grid-cols-[1fr_auto] items-center justify-start gap-[10px] focus:[&_input]:shadow-[0_0_0_2px_#ff521f] focus:[&_input]:outline-none">
      <div className="grid h-full w-full grid-cols-[3fr_3fr_6fr_4fr] items-center justify-start gap-[2px]">
        {activeCategory.inputs.map((input) => (
          <Input key={input.id} placeholder={input.placeholder} />
        ))}
        <Calendar
          locale={locale}
          placeholderEnd={activeCategory.calendar.placeholder.end}
          placeholderStart={activeCategory.calendar.placeholder.start}
          titles={titles}
        />
        <Dropdown levels={FlightLevels.locales[locale]} peoples={FlightPeoples.locales[locale]} placeholder={activeCategory.dropdown.placeholder} />
      </div>
      <button className="h-full w-56 whitespace-nowrap rounded-[10px] bg-[#ff6f32] p-4 text-lg font-semibold text-white hover:bg-[#ef6d37]" type="submit">
        {activeCategory.submit}
      </button>
    </form>
  );
}
