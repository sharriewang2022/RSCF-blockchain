import React, { useState } from 'react';
import { Steps } from 'antd';
import dayjs from  'dayjs'
import CreateOrderActionFinish from '../services/createOrderActionFinish';
import SelectProducts from '../services/orderProducts';
import CreateOrderActionInfo from '../services/orderActionInfo'; 
import homePic from "../../images/homePic.jpg";
import banner from "../../images/banner.jpg";
 
const baseOrderInfo = 
{   
  "name": "Order Activity",
  "startTime": dayjs().format("YYYY-MM-DD HH:mm:ss"),
  "endTime": dayjs().format("YYYY-MM-DD HH:mm:ss"),
  "orderLogan": 'Order Action',
  "showHome": "1",
  "homePic": {homePic},
  "banner": `url(${banner})`,
  "showType": 1,
  "target": 1,
  "limitBuy": 999,
  "shop": '829,824',
  "deliverWay": 1,
  "pickTime": dayjs(new Date(Date.now()+1000*60*60*24)+"").format("YYYY-MM-DD HH:mm:ss"),
  "products": "586,587,588",
  "preTime":  dayjs(new Date(Date.now()-1000*60*60*24)+"").format("YYYY-MM-DD HH:mm:ss"),
  "tag": 1,
  "state": 1
}

function OrderView() {  
  const [OrderActionInfo,setOrderActionInfo] = useState(baseOrderInfo) 
  const [current,setCurrent] = useState(0)
 
  const stepItems = [
    {
      title:'Order Info',
      content:<CreateOrderActionInfo  
        setCurrent={setCurrent} 
        setOrderActionInfo={setOrderActionInfo}
        orderActionInfo={OrderActionInfo}
      />
    },
    {
      title:'Set product',
      content:<SelectProducts   
        setCurrent={setCurrent} 
        setOrderActionInfo={setOrderActionInfo}
        orderActionInfo={OrderActionInfo}
      />
    },
    {
      title:'success',
      content:<CreateOrderActionFinish/>
    },
  ]
  return ( <div>
    <Steps 
      onChange={e=>setCurrent(e)}
      current={current} 
      labelPlacement="vertical" 
      items={stepItems} 
      style={{width:'50%',margin:'16px auto'}}
    />
    {stepItems[current].content}
  </div> );
}

export default OrderView;