'use client';

import { ChangeEvent, useState } from 'react';

export default function Input({ placeholder }: { placeholder: string }) {
  const [visibility, setVisibility] = useState(false);

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => setVisibility(e.target.value.length > 0);

  return (
    <label className="relative h-full [&_input]:first:rounded-l-[10px]">
      <span
        className={`will-change-[transform,opacity] absolute -top-5 left-4 h-5 text-[0.5625rem] font-semibold uppercase text-white ${visibility ? 'translate-y-0 opacity-100 transition-[transform_0.3s_cubic-bezier(0,0.6,0,1),opacity_0.3s_linear]' : 'translate-y-3 opacity-0 transition-[transform_0.3s_cubic-bezier(1,0,1,0.4),opacity_0.3s_linear]'}`}>
        {placeholder}
      </span>
      <input
        className="h-full w-full py-3 pl-4 pr-16 text-[0.93rem] font-medium"
        placeholder={placeholder}
        type="text"
        onBlur={handlerChange}
        onFocus={() => setVisibility(true)}
      />
      {/* <span className="text-[#9ea9b7] font-medium text-[0.68rem] absolute right-4 top-1/2 -translate-y-1/2">MOW</span> */}
    </label>
  );
}
