/* eslint-disable jsx-a11y/no-static-element-interactions */
// MenuItem.tsx
import { NavLink } from 'react-router-dom';

interface MenuItemProps {
  iconSrc: string;
  label: string;
  to?: string;
}

export function MenuItem({ iconSrc, label, to }: MenuItemProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <NavLink
      to={`/${to || label.toLowerCase()}`}
      className={({ isActive }) =>
        `hover:bg-gray-300 lg:w-36 w-fit px-4 py-2 mx-0 lg:px-2 menu-item flex items-center gap-2 ${
          isActive ? 'bg-gray-300' : ''
        }`
      }
    >
      <img alt='menu-icon' src={iconSrc} className='w-8 h-8 md:w-8 md:h-8'></img>
      <span className='hidden lg:block font-medium text-sm'>{label}</span>
    </NavLink>
  );
}

export default MenuItem;
