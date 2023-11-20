import { Grid, Col, Card, Flex, Metric, Text, BadgeDelta, ProgressBar } from "@tremor/react";
import React from 'react'
import CardBase from './CardBase';


const data = [
    {
        "id": "1",
        "title": 'Sales',
        "metric": '$ 12,200',
        "progress": 25.9,
        "target": "$ 80,000",
        "delta": '13.2%',
        "deltaType": 'moderateDecrease',
    },
    {
        "id": "2",
        "title": 'Orders',
        "metric": '$ 13,200',
        "progress": 12.9,
        "target": "$ 100,800",
        "delta": '26.3%',
        "deltaType": 'moderateIncrease',
    },
    {
        "id": "3",
        "title": 'Customers',
        "metric": '$ 14,200',
        "progress": 45.9,
        "target": "$ 90,000",
        "delta": '13.2%',
        "deltaType": 'moderateIncrease',
    },
]

const CardGridMap = () => {
  return (
    <Grid
      numItems={1} 
      numItemsSm={2} 
      numItemsLg={3} 
      className="mt-6 gap-x-6 gap-y-6"
    >
        {
            data.map((item) => (
                <Col numColSpan={1} numColSpanLg={2}>
                    <Card key={item.id}>
                        <Flex className="items-start">                             
                            <Text>{item.title}</Text>
                            <Metric>{item.metric}</Metric>                          
                            <BadgeDelta deltaType="moderateIncrease">item.delta</BadgeDelta>
                        </Flex>
                        <Flex className="mt-4 space-x-2">
                            <Text>{` ${item.progress} % (${item.metric})`}</Text>
                            <Text>{item.target}</Text>
                        </Flex>
                        <ProgressBar value={item.progress} className="mt-4"/>
                    </Card>
                </Col>
            ))
        }
    </Grid>
  );
}

export default CardGridMap