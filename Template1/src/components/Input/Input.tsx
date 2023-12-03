import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

export default function Input(props: InputProps) {
  const { children, className = `custom-input`, ...rest } = props;
  return (
    <div className='min-h-[2rem] '>
      <input className={className} {...rest} />
    </div>
  );
}
