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
    <input
      className='px-2 py-1 border-none outline-none rounded font-medium text-black'
      placeholder={placeholder}
      type={type}
      min={type === 'number' ? 1 : undefined}
      style={{ width: inputWidth }}
    />
  );
}

export default InputBox;
