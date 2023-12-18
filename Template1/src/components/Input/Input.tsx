import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const { children, className = `custom-input`, ...rest } = props;
  return (
    <div className='min-h-[2rem] '>
      <input className={className} {...rest} />
    </div>
  );
});
Input.displayName = 'Input';

export default Input;
