interface ButtonProps {
  label: string;
  icon?: string;
  color: string;
  bg_color: string;
  border_color?: string;
  onclick?: () => void;
}

function Button({ bg_color, label, icon, color, border_color = '', onclick }: ButtonProps) {
  return (
    <button
      style={{ backgroundColor: bg_color, borderColor: border_color, borderWidth: 1, color: color }}
      className={`inline-flex items-center justify-center w-50 p-2 rounded-full`}
      onClick={onclick}
    >
      <span className={`text-${color} ml-2 mr-2 text-center font-medium`}>{label}</span>
      {icon && <img src={icon} className='w-5 h-5 fill-white stroke-white' alt={label} />}
    </button>
  );
}

export default Button;
