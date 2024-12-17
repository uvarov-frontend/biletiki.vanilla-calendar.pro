'use client';

import { notFound } from 'next/navigation';
import { useState } from 'react';

import { categories } from '@/bd';
import { ICategoryFilter, Locale } from '@/types';

import { flights, hotels } from './Filter/index';

export default function Filter({ locale }: { locale: Locale }) {
  if (!categories || !categories.locales[locale]) notFound();

  const [activeCategory, setActiveCategory] = useState(categories.locales[locale]?.[0]);
  const isActiveCategory = (value: number) => activeCategory.id === value;
  const handlerCategory = (index: number) => {
    const calendar = document.querySelector('[data-vc]');
    if (calendar && document.body.contains(calendar)) document.body.removeChild(calendar);
    setActiveCategory(categories.locales[locale]?.[index]);
  };
  const categoryFilter: ICategoryFilter = { flights, hotels };

  return (
    <>
      <h1 className="mb-2 text-center text-[2.55rem] font-extrabold leading-[3.56rem] text-white">{activeCategory.title}</h1>
      <b className="block text-center text-[1.06rem] font-semibold text-white">{activeCategory.subtitle}</b>
      <div
        style={{ '--category-of-filter-active': activeCategory.id } as React.CSSProperties}
        className="before::text-[#0c73fe] relative mx-auto mt-8 grid w-auto max-w-max grid-flow-col items-center gap-1 rounded-lg bg-[#227ffe]
				p-[0.125rem] before:absolute before:left-[0.125rem] before:top-[0.125rem] before:h-7 before:w-32 before:translate-x-[calc((100%_+_0.25rem)_*_(var(--category-of-filter-active)_-_1))] before:rounded-lg
				before:bg-white
				before:transition-[transform_cubic-bezier(0.8,_0.34,_0.28,_1.15)_0.35s]
				before:duration-300"
      >
        {categories.locales[locale].map((category, index) => (
          <label
            key={category.id}
            className="flex h-7 w-32 cursor-pointer items-center rounded-lg bg-transparent transition-colors duration-200 hover:bg-[#4094ff]"
            htmlFor={String(category.id)}
          >
            <input
              checked={isActiveCategory(category.id)}
              className="hidden"
              id={String(category.id)}
              name={category.name}
              type="radio"
              value={category.value}
              onChange={() => handlerCategory(index)}
            />
            <span
              className={`relative z-10 block h-full w-full rounded-lg px-4 py-2 text-center text-[0.81rem] font-semibold leading-none duration-200 ${
                isActiveCategory(category.id) ? 'text-[#0c73fe]' : 'text-white'
              }`}
            >
              {category.value}
            </span>
          </label>
        ))}
      </div>
      {categoryFilter[activeCategory.slug]?.({ activeCategory, locale })}
    </>
  );
}
