import Sidebar from 'src/components/Sidebar/Sidebar';

interface Props {
  children?: React.ReactNode;
}
export default function NavLayout({ children }: Props) {
  return (
    <div className='bg-background flex flex-row min-h-screen'>
      <Sidebar></Sidebar>
      {children}
    </div>
  );
}
