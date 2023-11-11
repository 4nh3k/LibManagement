// MenuItem.tsx
import React from 'react';

interface InputBoxProps {
  placeholder: string;
  type: string;
}

const InputBox: React.FC<InputBoxProps> = ({ placeholder, type }) => {
  return (
    <div className='inline w-80 h-32 bg-[#E5E1E1] text-[#757575] pt-2 pb-2 pl-3 pr-3 rounded-lg'>
        <input className='p-0 m-0 bg-[#E5E1E1] border-none outline-0' placeholder={placeholder} type={type} min={type === "number" ? 1 : undefined}></input>
    </div>
  );
};

export default InputBox;
