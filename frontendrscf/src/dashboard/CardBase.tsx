import { Card, Text, Metric, Flex, ProgressBar } from "@tremor/react";
import React from "react";

const CardBase = () => {
  return <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
    <Text>Sales</Text>
    <Metric>$ 71,465</Metric>
    <Flex className="mt-4">
      <Text className="w-full">Product</Text>
      <Flex className="space-x-2" justifyContent="end">
        <Text>32% of annual target</Text>
        <Text>Sales</Text>
      </Flex>
    </Flex>
    <ProgressBar value={38} className="mt-2" />
  </Card>;
};
export default CardBase;
