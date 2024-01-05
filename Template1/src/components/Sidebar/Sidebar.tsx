import book from 'src/assets/icons/book.svg';
import group from 'src/assets/icons/group.svg';
import library from 'src/assets/icons/library.svg';
import transaction from 'src/assets/icons/transaction.svg';
import account from 'src/assets/icons/user.svg';
import configuration from 'src/assets/img/configuration.png';
import payment from 'src/assets/img/payment.png';
import website_logo from '../../assets/img/logo.png';

import { Link } from 'react-router-dom';
import MenuItem from 'src/components/MenuItem';

interface SidebarProp {
  isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProp> = ({ isAdmin = false }: SidebarProp) => {
  return (
    <div className='bg-gray-50 shadow fixed top-0 left-0 bottom-0 w-18 lg:w-64'>
      <div className='flex flex-col items-center justify-center'>
        <Link to='/' className='text-center flex items-center justify-center mx-1 lg:mx-2 shrink-0'>
          <img
            alt='Website Logo'
            src={website_logo}
            className='block p-2 text-center w-[3.75rem] h-[3.75rem]'
          />
          <span className='font-bold text-xl hidden lg:inline-block'>LibMa</span>
        </Link>
        <ul className='flex flex-col mt-2 gap-[0.1rem] w-full px-3'>
          <MenuItem iconSrc={library} label='Library' to='' />
          <MenuItem
            iconSrc={transaction}
            label='Transaction'
            to={isAdmin ? 'admin/transactions' : 'transactions'}
          />
          {isAdmin && <MenuItem iconSrc={book} label='Book' to='admin/booklist' />}
          {isAdmin && <MenuItem iconSrc={group} label='Member' to='admin/member' />}
          {isAdmin && (
            <MenuItem
              iconSrc={configuration}
              label='Configuration'
              to='admin/configuration'
            ></MenuItem>
          )}
          {!isAdmin && <MenuItem iconSrc={account} label='Account' to='account'></MenuItem>}
          {!isAdmin && <MenuItem iconSrc={payment} label='Payment'></MenuItem>}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
