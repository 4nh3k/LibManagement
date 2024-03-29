import { useEffect } from 'react';
import { PiMagnifyingGlass, PiXCircle } from 'react-icons/pi';

export default function Search({
  query,
  onChange
}: {
  query: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onChange('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onChange]);
  return (
    <div className='flex w-64 lg:w-80 justify-between rounded-full border-2 px-4 py-2 text-base font-normal outline-none transition duration-500'>
      <div className='flex w-full basis-11/12 items-center gap-3'>
        {query === '' && <PiMagnifyingGlass className='mr-2' size={24} color={'gray'} />}
        <input
          value={query}
          onChange={e => onChange(e.target.value)}
          placeholder='Search books...'
          className='bg-gray-50 grow  text-gray-500 outline-none focus:text-gray-500 focus:outline-none'
          maxLength={100}
        />
      </div>

      {query !== '' && (
        <button
          className='hover:pointer flex h-6 basis-6 cursor-pointer items-center justify-center rounded-full '
          onClick={() => onChange('')}
        >
          <PiXCircle color={'gray'} size={24} />
        </button>
      )}
    </div>
  );
}
