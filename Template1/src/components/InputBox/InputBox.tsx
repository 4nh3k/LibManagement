// MenuItem.tsx
import React from 'react';

interface InputBoxProps {
  placeholder: string;
  type: string;
  children?: React.ReactNode;
}

function InputBox({ placeholder, type }: InputBoxProps) {
  const inputWidth = type === 'number' ? '4ch' : '20ch';

  return (
    <div className='inline-flex bg-[#E5E1E1] text-[#757575] pt-2 pb-2 pl-3 pr-3 rounded-lg overflow-hidden max-w-xs'>
      <input
        className='p-0 m-0 bg-[#E5E1E1] border-none outline-0'
        placeholder={placeholder}
        type={type}
        min={type === 'number' ? 1 : undefined}
        style={{ width: inputWidth }}
      />
    </div>
  );
}

export default InputBox;
