'use client';

import { MouseEventHandler, useState } from 'react';

import { IPeopleCounter } from '@/types';

export default function PeopleCounter({ id, title, subtitle, range, quantities, onQuantityChange }: IPeopleCounter) {
  const [quantity, setQuantity] = useState(quantities[id] || 0);
  const [rangeMin] = useState(range.min);
  const [rangeMax] = useState(range.max);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    onQuantityChange(id, newQuantity);
  };

  const handleQuantity: MouseEventHandler<HTMLButtonElement> = (e) => {
    const btn = (e.target as HTMLButtonElement).closest('button[data-btn]') as HTMLButtonElement;
    if (!btn) return;
    const compute = {
      decrease: () => {
        if (quantity <= rangeMin) return;
        handleQuantityChange(quantity - 1);
      },
      increase: () => {
        if (quantity >= rangeMax) return;
        handleQuantityChange(quantity + 1);
      },
    };
    compute[btn.dataset.btn as 'decrease' | 'increase']();
  };

  return (
    <div className="flex justify-between border-b border-[#f0f2f3] py-[0.68rem] last:border-b-0">
      <div className="flex flex-col">
        <span className="text-[0.9375rem]">{title}</span>
        <span className="text-[0.8125rem] text-[#5a6472]">{subtitle}</span>
      </div>
      <div className="flex items-center">
        <button
          data-btn="decrease"
          type="button"
          className={`flex h-8 w-8 items-center justify-center rounded-full
          ${quantity <= rangeMin ? 'pointer-events-none bg-[#f8f8f9] text-[#9ea9b8]' : 'bg-[#1874fe] text-white'}`}
          onClick={handleQuantity}
        >
          <svg fill="currentColor" height="18" viewBox="0 0 16 16" width="18">
            <path clipRule="evenodd" d="M13 7a1 1 0 1 1 0 2H3a1 1 0 0 1 0-2h10Z" fillRule="evenodd" />
          </svg>
        </button>
        <b className="mx-3 block w-6 text-center text-[1.0625rem]" data-quantity={quantity}>
          {quantity}
        </b>
        <button
          data-btn="increase"
          type="button"
          className={`flex h-8 w-8 items-center justify-center rounded-full
          ${quantity >= rangeMax ? 'pointer-events-none bg-[#f8f8f9] text-[#9ea9b8]' : 'bg-[#1874fe] text-white'}`}
          onClick={handleQuantity}
        >
          <svg fill="currentColor" height="18" viewBox="0 0 16 16" width="18">
            <path clipRule="evenodd" d="M8 2a1 1 0 0 0-1 1v4H3a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0V9h4a1 1 0 1 0 0-2H9V3a1 1 0 0 0-1-1Z" fillRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
