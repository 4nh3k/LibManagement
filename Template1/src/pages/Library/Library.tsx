import search_icon from '../../assets/img/icons8-search-128.png';
import user_icon from '../../assets/img/user.png';

import DropdownList from 'src/components/BookFilterDropdown/BookFilterDropdown';
import InputBox from 'src/components/InputBox';
import Button from 'src/components/Button';
import Book from 'src/components/Book/Book';

export default function Library() {
  return (
    <div className='bg-white ml-auto w-[calc(100%-6.75rem)] h-full'>
      <div id='horizontal-header' className='mb-10 mt-2 static'>
        <DropdownList
          list={['All books', 'Genre', 'Subject', 'Author', 'Publisher']}
        ></DropdownList>

        <label className='ml-20 mr-5'>Keywords</label>
        <InputBox placeholder='Enter keywords' type='text'></InputBox>

        <label className='ml-20 mr-5'>Quantity</label>
        <InputBox placeholder='1' type='number'></InputBox>
        <div id='button-container' className='inline space-x-20 absolute right-20'>
          <Button
            label='Search'
            bg_color='#5632A1'
            icon={search_icon}
            color='white'
            border_color='#D7C9FF'
          ></Button>
          <Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black'></Button>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-12 mb-10 p-2'>
        <Book
          coverImg='https://th.bing.com/th/id/R.78230fd6985cb19fa95fea3268f5b3cc?rik=YUGIVNKQEz8fwg&pid=ImgRaw&r=0'
          overview='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          title='Enceladus'
          rating={2}
        ></Book>

        <Book
          coverImg='https://th.bing.com/th/id/R.78230fd6985cb19fa95fea3268f5b3cc?rik=YUGIVNKQEz8fwg&pid=ImgRaw&r=0'
          overview='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          title='Enceladus'
          rating={2}
        ></Book>

        <Book
          coverImg='https://th.bing.com/th/id/R.78230fd6985cb19fa95fea3268f5b3cc?rik=YUGIVNKQEz8fwg&pid=ImgRaw&r=0'
          overview='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          title='Enceladus'
          rating={2}
        ></Book>

        <Book
          coverImg='https://th.bing.com/th/id/R.78230fd6985cb19fa95fea3268f5b3cc?rik=YUGIVNKQEz8fwg&pid=ImgRaw&r=0'
          overview='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          title='Enceladus'
          rating={2}
        ></Book>

        <Book
          coverImg='https://th.bing.com/th/id/R.78230fd6985cb19fa95fea3268f5b3cc?rik=YUGIVNKQEz8fwg&pid=ImgRaw&r=0'
          overview='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          title='Enceladus'
          rating={2}
        ></Book>

        <Book
          coverImg='https://th.bing.com/th/id/R.78230fd6985cb19fa95fea3268f5b3cc?rik=YUGIVNKQEz8fwg&pid=ImgRaw&r=0'
          overview='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          title='Enceladus'
          rating={2}
        ></Book>

        <Book
          coverImg='https://th.bing.com/th/id/R.78230fd6985cb19fa95fea3268f5b3cc?rik=YUGIVNKQEz8fwg&pid=ImgRaw&r=0'
          overview='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          title='Enceladus'
          rating={2}
        ></Book>

        <Book
          coverImg='https://th.bing.com/th/id/R.78230fd6985cb19fa95fea3268f5b3cc?rik=YUGIVNKQEz8fwg&pid=ImgRaw&r=0'
          overview='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          title='Enceladus'
          rating={2}
        ></Book>

        <Book
          coverImg='https://th.bing.com/th/id/R.78230fd6985cb19fa95fea3268f5b3cc?rik=YUGIVNKQEz8fwg&pid=ImgRaw&r=0'
          overview='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          title='Enceladus'
          rating={2}
        ></Book>

        <Book
          coverImg='https://th.bing.com/th/id/R.78230fd6985cb19fa95fea3268f5b3cc?rik=YUGIVNKQEz8fwg&pid=ImgRaw&r=0'
          overview='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          title='Enceladus'
          rating={2}
        ></Book>

        <Book
          coverImg='https://th.bing.com/th/id/R.78230fd6985cb19fa95fea3268f5b3cc?rik=YUGIVNKQEz8fwg&pid=ImgRaw&r=0'
          overview='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          title='Enceladus'
          rating={2}
        ></Book>

        <Book
          coverImg='https://th.bing.com/th/id/R.78230fd6985cb19fa95fea3268f5b3cc?rik=YUGIVNKQEz8fwg&pid=ImgRaw&r=0'
          overview='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          title='Enceladus'
          rating={2}
        ></Book>
      </div>
    </div>
  );
}
