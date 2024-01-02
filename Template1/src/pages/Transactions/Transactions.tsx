import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import User from 'src/components/User/User';
import BorrowCard from './BorrowCard/BorrowCard';
import BorrowCardForm from './BorrowCard/BorrowCardForm';
import FeeCard from './FeeCard/FeeCard';
import RemindCard from './RemindCard/RemindCard';
import ReturnCard from './ReturnCard/ReturnCard';
import ReturnCardForm from './ReturnCard/ReturnCardForm';

const getIndexOfTab = (tab: string | null) => {
  switch (tab) {
    case 'return':
      return 1;
    case 'fee':
      return 2;
    case 'remind':
      return 3;
    default:
      return 0;
  }
};

const Transactions = ({ isAdmin = true }) => {
  const [showBorrowForm, setShowBorrowForm] = useState(false);

  const [searchParams] = useSearchParams();

  const toggleBorrowForm = () => {
    setShowBorrowForm(showBorrowForm => !showBorrowForm);
  };

  const [showReturnForm, setShowReturnForm] = useState(false);

  const toggleReturnForm = () => {
    setShowReturnForm(showReturnForm => !showReturnForm);
  };

  return (
    <div className='p-4 w-full h-screen overflow-y-auto lg:overflow-y-hidden'>
      <div id='horizontal-header' className='pl-2 pr-5 lg:pr-10 py-2'>
        <div className='flex justify-between items-center'>
          <span className='text-xl lg:text-2xl font-bold'>Transaction</span>
          <User />
        </div>
      </div>

      <div id='tab-navigator text-center'>
        <Tabs defaultIndex={getIndexOfTab(searchParams.get('tab'))}>
          <TabList>
            <Tab>Borrow Card</Tab>
            <Tab>Return Card</Tab>
            {/* <Tab>Remind Card</Tab> */}
            {isAdmin && <Tab>Fee Card</Tab>}
          </TabList>

          <TabPanel>
            {!showBorrowForm && <BorrowCard onToggle={toggleBorrowForm} isAdmin={isAdmin} />}
            {showBorrowForm && (
              <BorrowCardForm onToggle={toggleBorrowForm} isAdmin={isAdmin}></BorrowCardForm>
            )}
          </TabPanel>
          <TabPanel>
            {!showReturnForm && (
              <ReturnCard onToggle={toggleReturnForm} isAdmin={isAdmin}></ReturnCard>
            )}
            {showReturnForm && (
              <ReturnCardForm onToggle={toggleReturnForm} isAdmin={isAdmin}></ReturnCardForm>
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
    </div>
  );
};

export default Transactions;
