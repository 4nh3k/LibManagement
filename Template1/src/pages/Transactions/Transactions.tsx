import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ReturnCard from '../ReturnCard/ReturnCard';
import ReturnCardList from '../ReturnCard/ReturnCardList';

const Transactions = () => {
  return (
    <div className='bg-background'>
      <Tabs>
        <TabList>
          <Tab>Borrow Card</Tab>
          <Tab>Return Card</Tab>
          <Tab>Fee Card</Tab>
          <Tab>Remind Card</Tab>
        </TabList>

        <TabPanel>
          <ReturnCard />
        </TabPanel>
        <TabPanel></TabPanel>
        <TabPanel>
          <ReturnCardList></ReturnCardList>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Transactions;
