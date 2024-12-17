import { ChangeEventHandler } from 'react';

export default function Input({ value, activeLevel, handler }: { value: string; activeLevel: string; handler: ChangeEventHandler<HTMLInputElement> }) {
  return (
    <label
      className="relative flex cursor-pointer justify-between border-b border-[#f0f2f3] py-[0.68rem]
      last:border-b-0 [&_span:after]:hover:bg-[#f0f2f3]"
    >
      <input
        checked={value === activeLevel}
        className="hidden [&+span]:checked:after:border-[6px] [&+span]:checked:after:border-[#0c73fe]"
        name="level"
        type="radio"
        value={value}
        onChange={handler}
      />
      <span
        className="text-[0.9375rem]
        after:absolute after:right-0 after:top-1/2 after:h-5 after:w-5 after:-translate-y-1/2
        after:rounded-full after:border after:border-[#c5c7ca] after:bg-white"
      >
        {value}
      </span>
    </label>
  );
}
