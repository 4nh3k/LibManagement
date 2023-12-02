import website_logo from '../../assets/img/logo.png';
import library_img from '../../assets/img/library.png';
import book_img from '../../assets/img/book.png';
import member_img from '../../assets/img/group-chat.png';
import transaction_img from '../../assets/img/transaction.png';
import MenuItem from 'src/components/MenuItem';

const Sidebar = () => {
  return (
    <div className='bg-sidebarColor fixed top-0 left-0 bottom-0'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <div className='text-center items-center justify-center mx-1 lg:mx-2'>
          <img
            alt='Website Logo'
            src={website_logo}
            className='p-2 text-center w-[3.75rem] h-[3.75rem]'
          />
          <span className='font-bold text-xl hidden lg:block'>LibMa</span>
        </div>
        <MenuItem iconSrc={library_img} label='Library' />
        <MenuItem iconSrc={book_img} label='Book' to='books' />
        <MenuItem iconSrc={member_img} label='Member' />
        <MenuItem iconSrc={transaction_img} label='Transaction' />
      </div>
    </div>
  );
};

export default Sidebar;
