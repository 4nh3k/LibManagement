import website_logo from '../../assets/img/logo.png';
import library from 'src/assets/icons/library.svg';
import book from 'src/assets/icons/book.svg';
import group from 'src/assets/icons/group.svg';
import transaction from 'src/assets/icons/transaction.svg';
import configuration from 'src/assets/img/configuration.png';
import account from 'src/assets/img/user.png';
import payment from 'src/assets/img/payment.png';

import MenuItem from 'src/components/MenuItem';
import { Link } from 'react-router-dom';

interface SidebarProp{
  isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProp> = ({isAdmin = false}) => {
  return (
    <div className='bg-gray-300 shadow fixed top-0 left-0 bottom-0 w-12 lg:w-36'>
      <div className='flex flex-col items-center justify-center'>
        <Link to='/' className='text-center items-center justify-center mx-1 lg:mx-2 shrink-0'>
          <img
            alt='Website Logo'
            src={website_logo}
            className='block p-2 text-center w-[3.75rem] h-[3.75rem]'
          />
          <span className='font-bold text-xl hidden lg:inline-block'>LibMa</span>
        </Link>
        <ul className='flex flex-col gap-[0.1rem]'>
          <MenuItem iconSrc={library} label='Library' to='' />
          <MenuItem iconSrc={transaction} label='Transaction' to='transactions' />
          {isAdmin && <MenuItem iconSrc={book} label='Book' to='books' />}
          {isAdmin && <MenuItem iconSrc={group} label='Member' />}
          {isAdmin && <MenuItem iconSrc={configuration} label='Configuration'></MenuItem>}
          {!isAdmin && <MenuItem iconSrc={account} label='Account'></MenuItem>}
          {!isAdmin && <MenuItem iconSrc={payment} label='Payment'></MenuItem>}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
