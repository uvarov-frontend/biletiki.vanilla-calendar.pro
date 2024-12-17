'use client';

import { ChangeEventHandler, useEffect, useRef, useState } from 'react';

import { ILevels, IPeoples } from '@/types';

import Input from './Input';
import PeopleCounter from './PeopleCounter';

export default function Dropdown({ placeholder, peoples, levels }: { placeholder: string; peoples: IPeoples; levels?: ILevels }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [quantities, setQuantities] = useState<number[]>([peoples.data[0].range.min]);
  const [activeLevel, setActiveLevel] = useState<string>(levels?.data?.[0].title || '');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleChangeLevel: ChangeEventHandler<HTMLInputElement> = (e) => setActiveLevel((e.target as HTMLInputElement).value);
  const handleClickBtn = () => setShowDropdown(!showDropdown);

  const formatPeopleString = (passenger: number) => {
    const pluralRules = new Intl.PluralRules('ru-RU');
    const formIndex: { [key: string]: number } = {
      few: 1,
      many: 2,
      one: 0,
      zero: 2,
    };
    return `${passenger} ${peoples.formats[formIndex[pluralRules.select(passenger)]]}`;
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantity;
    setQuantities(newQuantities);
  };

  useEffect(() => {
    if (!showDropdown || !dropdownRef) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as HTMLElement)) {
        setShowDropdown(false);
        document.removeEventListener('click', handleClickOutside, true);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
  }, [showDropdown, dropdownRef]);

  return (
    <div ref={dropdownRef} className="relative h-full">
      <span className="absolute -top-5 left-4 h-5 text-[0.5625rem] font-semibold uppercase text-white">{placeholder}</span>
      <button
        type="button"
        className={`flex h-full w-full flex-col justify-center items-start rounded-r-[10px] bg-white px-4 py-2 text-[0.93rem] font-medium
        after:absolute after:bottom-0
        after:right-4 after:top-[5px] after:m-auto after:h-0 after:w-0 after:border-[5px] after:border-transparent after:border-t-[#9ea9b7] focus:shadow-[0_0_0_2px_#ff521f]
        focus:outline-none ${showDropdown ? 'after:-translate-y-1 after:rotate-180' : ''}`}
        onClick={handleClickBtn}
      >
        <span className="leading-5 text-[0.9375]">{formatPeopleString(quantities.reduce((acc, quantity) => (quantity ? acc + quantity : acc), 0))}</span>
        <span className="leading-5 text-[#9ea9b7] text-[0.9375]">{activeLevel}</span>
      </button>
      <div
        className={`absolute right-0 mt-[2.5px] w-80 rounded-[5px] bg-white px-5
        py-4 font-[-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif] shadow-[0_6px_9px_rgba(0,0,0,0.08)] transition-opacity
        ${!showDropdown ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      >
        <div className="mb-4 last:-mb-2">
          <b className="mb-1 block text-[1.0625rem] font-bold">{peoples.title}</b>
          {peoples.data.map((people) => (
            <PeopleCounter
              key={people.id}
              id={people.id}
              quantities={quantities}
              range={people.range}
              subtitle={people.subtitle}
              title={people.title}
              onQuantityChange={updateQuantity}
            />
          ))}
        </div>
        {levels ? (
          <div className="mb-4 last:-mb-2">
            <b className="mb-1 block text-[1.0625rem] font-bold">{levels.title}</b>
            {levels.data?.map((level) => <Input key={level.id} activeLevel={activeLevel} handler={handleChangeLevel} value={level.title} />)}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
