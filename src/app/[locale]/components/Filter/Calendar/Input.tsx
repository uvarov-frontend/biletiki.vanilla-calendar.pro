function DatePickerIcon() {
  return (
    <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" fill="#0c73fe" height={16} viewBox="0 0 20 20" width={16}>
      <path d="M4 1v1H1c-.6 0-1 .4-1 1v16c0 .6.4 1 1 1h18c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1h-3V1c0-1.3-2-1.3-2 0v1H6V1C6-.3 4-.3 4 1zM2 4h2v1c0 1.3 2 1.3 2 0V4h8v1c0 1.3 2 1.3 2 0V4h2v3H2V4zm0 5h16v9H2V9zm2 1c-1.2 0-1.3 2 0 2h2c1.4 0 1.4-2 0-2H4zm5 0c-1.3 0-1.4 2 0 2h2c1.3 0 1.4-2 0-2H9zm5 0c-1.3 0-1.3 2 0 2h2c1.3 0 1.4-2 0-2h-2zM4 14c-1.3 0-1.3 2 0 2h2c1.3 0 1.4-2 0-2H4zm5 0c-1.4 0-1.4 2 0 2h2c1.3 0 1.3-2 0-2H9zm5 0c-1.3 0-1.3 2 0 2h2c1.3 0 1.4-2 0-2h-2z" />
    </svg>
  );
}

export default function Input({ name, placeholder, visibility, handleClear }: { name: string; placeholder: string; visibility: boolean; handleClear: () => void }) {
  return (
    <label className="pointer-events-auto relative">
      <span
        className={`will-change-[transform,opacity] ${visibility ? 'translate-y-0 opacity-100 transition-[transform_0.3s_cubic-bezier(0,0.6,0,1),opacity_0.3s_linear]' : 'translate-y-3 opacity-0 transition-[transform_0.3s_cubic-bezier(1,0,1,0.4),opacity_0.3s_linear]'} absolute -top-5 left-4 h-5 text-[0.5625rem] font-semibold uppercase text-white`}>
        {placeholder}
      </span>
      <input readOnly className="h-full w-full cursor-pointer px-4 py-3 text-[0.93rem] font-medium" name={name} placeholder={placeholder} type="text" />
      {name === 'date-start' && !visibility ? (
        <DatePickerIcon />
      ) : (
        <button className={`absolute right-3 top-1/2 -translate-y-1/2 text-[#0c73fe] hover:text-[#ff6f32] ${visibility ? 'block' : 'hidden'}`} type="button" onClick={handleClear}>
          <svg fill="currentColor" height={16} viewBox="0 0 20 20" width={16}>
            <path d="M.4 17.8c-.5.5-.5 1.3 0 1.8s1.3.5 1.8 0L.4 17.8zm10.5-6.9c.5-.5.5-1.3 0-1.8s-1.3-.5-1.8 0l1.8 1.8zM9.1 9.1c-.5.5-.5 1.3 0 1.8s1.3.5 1.8 0L9.1 9.1zm10.5-6.9c.5-.5.5-1.3 0-1.8s-1.3-.5-1.8 0l1.8 1.8zm-8.7 6.9c-.5-.5-1.3-.5-1.8 0s-.5 1.3 0 1.8l1.8-1.8zm6.9 10.5c.5.5 1.3.5 1.8 0s.5-1.3 0-1.8l-1.8 1.8zm-8.7-8.7c.5.5 1.3.5 1.8 0s.5-1.3 0-1.8l-1.8 1.8zM2.2.4C1.7-.1.9-.1.4.4s-.5 1.3 0 1.8L2.2.4zm0 19.2 8.7-8.7-1.8-1.8-8.7 8.7 1.8 1.8zm8.7-8.7 8.7-8.7L17.8.4 9.1 9.1l1.8 1.8zm-1.8 0 8.7 8.7 1.8-1.8-8.7-8.7-1.8 1.8zm1.8-1.8L2.2.4.4 2.2l8.7 8.7 1.8-1.8z" />
          </svg>
        </button>
      )}
    </label>
  );
}
