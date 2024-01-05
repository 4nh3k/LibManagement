import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import User from 'src/components/User/User';
import BookConfig from './Book/BookConfig';
import ReaderConfig from './Reader/ReaderConfig';
import TransactionConfig from './Transaction/TransactionConfig';

// import React, { useState } from 'react';
const Configuration = () => {
  return (
    <>
      <div className='px-4 pt-2 w-full overflow-auto flex-1 flex-row h-screen'>
        <div className='pr-5 lg:pr-10 py-2'>
          <div className='flex justify-between  items-center'>
            <span className='px-4 text-xl lg:text-2xl font-bold'>Configuration</span>
            <div className='inline'>
              <User></User>
            </div>
          </div>
        </div>

        <div id='tab-navigator text-center'>
          <Tabs>
            <TabList className='flex flex-col lg:flex-row max-w-fit mb-10'>
              <Tab>Book</Tab>
              <Tab>Reader</Tab>
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
