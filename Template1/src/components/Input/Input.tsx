import React from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import classNames from 'classnames';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string;
  register?: UseFormRegister<any>;
  ruleName?: RegisterOptions;
  classNameError?: string;
  name?: string;
  errorMessage?: string;
}

export default function Input(props: InputProps) {
  const {
    errorMessage,
    ruleName,
    name,
    classNameInput = `custom-input`,
    classNameError = 'ml-1 mt-1 min-h-[1.25rem] text-sm font-medium text-red-600',
    register,
    ...rest
  } = props;
  const registerResult = register && name ? register(name, ruleName) : null;
  return (
    <div className='min-h-[2rem] '>
      <input className={classNameInput} name={name} {...registerResult} {...rest} />
      <p className={classNames(classNameError, { hidden: !errorMessage })}>{errorMessage}</p>
    </div>
  );
}
