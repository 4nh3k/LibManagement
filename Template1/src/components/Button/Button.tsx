// MenuItem.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  icon: string;
  color: string;
  bg_color: string;
  border_color?: string;
}

const Button: React.FC<ButtonProps> = ({ bg_color, label, icon, color, border_color = '' }) => {
  return (
    <button
      style={{ backgroundColor: bg_color, borderColor: border_color, borderWidth: 2, color: color }}
      className={`inline-flex items-center justify-center w-50 p-2 rounded-md`}
    >
      <span className={`text-${color} mr-2`}>{label}</span>
      <img src={icon} className='w-5 h-5 fill-white stroke-white' alt={label} />
    </button>
  );
};

export default Button;
