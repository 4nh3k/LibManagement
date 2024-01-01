import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Button from 'src/components/Button';
import user_icon from '../../assets/img/user.png';
import BookConfig from './Book/BookConfig';
import ReaderConfig from './Reader/ReaderConfig';
import TransactionConfig from './Transaction/TransactionConfig';

// import React, { useState } from 'react';
const Configuration = () => {
  return (
    <>
      <div className='px-4 bg-white pt-2 w-full overflow-auto flex-1 flex-row h-screen'>
        <div className='pr-5 lg:pr-10 py-2'>
          <div className='flex justify-between  items-center'>
            <span className='px-4 text-xl lg:text-2xl font-bold'>Configuration</span>
            <div className='inline'>
              <Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black'></Button>
            </div>
          </div>
        </div>

        <div id='tab-navigator text-center'>
          <Tabs>
            <TabList className='flex flex-col lg:flex-row max-w-fit mb-10'>
              <Tab>Reader</Tab>
              <Tab>Book</Tab>
              <Tab>Transaction</Tab>
            </TabList>
            <TabPanel>
              <ReaderConfig />
            </TabPanel>
            <TabPanel>
              <BookConfig />
            </TabPanel>
            <TabPanel>
              <TransactionConfig />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Configuration;
