import Sidebar from 'src/components/Sidebar/Sidebar';
import AddBookForm from './AddBookForm';
import Button from 'src/components/Button';
import user_icon from '../../assets/img/user.png';
interface Props {
  onToggle?: () => void;
}

const BookPage: React.FC<Props> = ({ onToggle }) => {
  return (
    <div className='bg-background flex flex-row h-screen mr'>
      <Sidebar></Sidebar>
      <div className='flex-1 flex-row h-screen pl-10'>
        <div id='horizontal-header' className='mb-16 mt-2 relative'>
          <span className='absolute left-50 text-2xl font-bold'>Book</span>
          <div id='button-container' className='absolute right-20'>
            <Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black'></Button>
          </div>
        </div>
        <AddBookForm onToggle={onToggle}></AddBookForm>
      </div>
    </div>
  );
};

export default BookPage;
