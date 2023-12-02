import Sidebar from 'src/components/Sidebar/Sidebar';
import AddBookForm from './AddBookForm';
import Button from 'src/components/Button';
import user_icon from '../../assets/img/user.png';
interface Props {
  onToggle?: () => void;
}

function BookPage({ onToggle }: Props) {
  return (
    <div className='w-full h-screen overflow-auto'>
      <div className='p-4'>
        <div className='flex justify-between items-center'>
          <span className='text-2xl font-bold'>Book</span>
          <div className='inline'>
            <Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black'></Button>
          </div>
        </div>
        <AddBookForm onToggle={onToggle}></AddBookForm>
      </div>
    </div>
  );
}

export default BookPage;
