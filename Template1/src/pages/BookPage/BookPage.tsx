import User from 'src/components/User/User';
import AddBookForm from './AddBookForm';
interface Props {
  onToggle?: () => void;
}

function BookPage({ onToggle }: Props) {
  return (
    <div className='px-4 w-full h-full'>
      <div className='flex justify-between items-center pt-2 pl-2'>
        <span className='text-2xl font-bold'>Book</span>
        <div className='inline'>
          <User />
        </div>
      </div>
      <AddBookForm onToggle={onToggle}></AddBookForm>
    </div>
  );
}

export default BookPage;
