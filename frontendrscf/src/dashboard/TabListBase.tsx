import React, { useState } from "react";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Flex,
  Metric,
  ProgressBar,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from "@tremor/react";

const TabListBase = () => {
  const [selectedView, setSelectedView] = useState(1);
  return (
    <Card>
      <Text>Total Sales</Text>
      <Metric>$ 442,276</Metric>
      <TabGroup>
        <TabList className="mt-8" defaultValue={selectedView}>
          <Tab value={1} icon={HandThumbUpIcon}>Location A</Tab>
          <Tab value={2} icon={HandThumbDownIcon}>Location B</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="mt-10">
              <Flex className="mt-4">
                <Text className="w-full">Product Y</Text>
                <Flex className="space-x-2" justifyContent="end">
                  <Text>$ 108,799</Text>
                  <Text>38%</Text>
                </Flex>
              </Flex>
              <ProgressBar value={38} className="mt-2" />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-10">
              <Flex className="mt-4">
                <Text className="w-full">Product Z</Text>
                <Flex className="space-x-2" justifyContent="end">
                  <Text>$ 99,484</Text>
                  <Text>16%</Text>
                </Flex>
              </Flex>
              <ProgressBar value={12} className="mt-2" />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
};

export default TabListBase;
