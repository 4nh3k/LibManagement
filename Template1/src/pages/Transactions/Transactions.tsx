import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import User from 'src/components/User/User';
import { useAppContext } from 'src/contexts/app.contexts';
import useMember from 'src/hooks/useMember';
import BorrowCard from './BorrowCard/BorrowCard';
import BorrowCardForm from './BorrowCard/BorrowCardForm';
import FeeCard from './FeeCard/FeeCard';
import ReturnCardForm from './ReturnCard/ReturnCardForm';
import ReturnCardPage from './ReturnCard/ReturnCardPage';

const Transactions = () => {
  const [showBorrowForm, setShowBorrowForm] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const toggleBorrowForm = () => {
    setShowBorrowForm(!showBorrowForm);
    if (isAdmin) navigate('/admin/transactions');
    else navigate('/transactions');
  };
  const { profile } = useAppContext();
  const isAdmin = profile?.role === 'admin';
  const { getUserMemberCardQuery } = useMember();
  const { data, isLoading } = getUserMemberCardQuery;
  if (!isAdmin) {
    getUserMemberCardQuery.refetch();
  }

  const tab = searchParams.get('tab');
  const id = searchParams.get('borrowCardId');

  const [showReturnForm, setShowReturnForm] = useState(false);
  const getSelectedIndex = () => {
    switch (searchParams.get('tab')) {
      case 'borrow':
        return 0;
      case 'return':
        return 1;
      case 'fee':
        return 2;
      default:
        return 0;
    }
  };

  useEffect(() => {
    setSelectedIndex(getSelectedIndex());
  }, [tab]);

  useEffect(() => {
    if (searchParams.get('borrowCardId')) {
      setShowReturnForm(true);
    }
  }, [id]);

  const onSelect = (index: number, lastIndex: number, event: Event) => {
    setSelectedIndex(index);
  };

  const [selectedIndex, setSelectedIndex] = useState(getSelectedIndex());
  const toggleReturnForm = () => {
    if (isAdmin) navigate('/admin/transactions');
    else navigate('/transactions');
    setShowReturnForm(!showReturnForm);
  };

  return (
    <div className='p-4 w-full h-screen overflow-y-auto lg:overflow-y-hidden'>
      <div id='horizontal-header' className='pl-2 pr-5 lg:pr-10 py-2'>
        <div className='flex justify-between items-center'>
          <span className='text-xl lg:text-2xl font-bold'>Transaction</span>
          <User />
        </div>
      </div>
      {!isAdmin && !data?._id && (
        <div className='text-center'>You don&apos;t have a member card.</div>
      )}
      {(isAdmin || data?._id) && (
        <div id='tab-navigator text-center'>
          <Tabs onSelect={onSelect} selectedIndex={selectedIndex}>
            <TabList>
              <Tab>Borrow Card</Tab>
              <Tab>Return Card</Tab>
              {/* <Tab>Remind Card</Tab> */}
              {isAdmin && <Tab>Fee Card</Tab>}
            </TabList>

            <TabPanel>
              {!showBorrowForm && <BorrowCard onToggle={toggleBorrowForm} memberId={data?._id} />}
              {showBorrowForm && (
                <BorrowCardForm onToggle={toggleBorrowForm} memberId={data?._id} />
              )}
            </TabPanel>
            <TabPanel>
              {!showReturnForm && (
                <ReturnCardPage onToggle={toggleReturnForm} memberId={data?._id} />
              )}
              {showReturnForm && (
                <ReturnCardForm onToggle={toggleReturnForm} id={searchParams.get('borrowCardId')} />
              )}
            </TabPanel>
            {/* <TabPanel>
            <RemindCard />
          </TabPanel> */}
            {isAdmin && (
              <TabPanel>
                <FeeCard />
              </TabPanel>
            )}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Transactions;
