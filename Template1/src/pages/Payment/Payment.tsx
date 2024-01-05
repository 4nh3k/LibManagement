import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import User from 'src/components/User/User';
import useMember from 'src/hooks/useMember';
import PaymentForm from './PaymentForm';
import TopUp from './TopUp/TopUp';

// import React, { useState } from 'react';
const Payment = () => {
  const { getUserMemberCardQuery } = useMember();
  const { data, isLoading } = getUserMemberCardQuery;
  getUserMemberCardQuery.refetch();
  if (isLoading)
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <LoadingIndicator />
      </div>
    );
  return (
    <div className='bg-white w-full h-full overflow-hidden p-4 '>
      <div id='horizontal-header' className='pl-2 pr-5 lg:pr-10 py-2'>
        <div className='flex justify-between items-center'>
          <span className='text-xl lg:text-2xl font-bold'>Transaction</span>
          <User />
        </div>
      </div>
      {!data?._id && (
        <div className='text-center font-medium mt-10'>
          <p>You don&apos;t have a member card.</p>
          <p>Please visit the library to create one.</p>
        </div>
      )}
      {data?._id && (
        <div id='tab-navigator text-center'>
          <Tabs>
            <TabList>
              <Tab>Top Up</Tab>
              <Tab>Payment</Tab>
            </TabList>
            <TabPanel>
              <TopUp />
            </TabPanel>
            <TabPanel>
              <PaymentForm />
            </TabPanel>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Payment;
