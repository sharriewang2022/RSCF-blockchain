import dayjs from  'dayjs'

import CreateOrderActionFinish from '../services/createOrderActionFinish';
import SelectProducts from '../services/orderProducts';
import CreateOrderActionInfo from '../services/orderActionInfo';
 
import { Steps } from 'antd';
 
import { useState } from 'react';
 
const baseOrderInfo = 
{
   
  "name": "test order activity",
  "startTime": dayjs().format("YYYY-MM-DD HH:mm:ss"),
  "endTime": dayjs().format("YYYY-MM-DD HH:mm:ss"),
  "slogan": 'order activity',
  "showHome": "1",
  "homePic": 'xxx.jpg',
  "banner": 'xxx.jpg',
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

function Order() {
  
  const [OrderActionInfo,setOrderActionInfo] = useState(baseOrderInfo)
 
  const [current,setCurrent] = useState(0)
 
  const items = [
    {title: 'Order Info',content:<CreateOrderActionInfo  
    setCurrent={setCurrent} 
    setOrderActionInfo={setOrderActionInfo}
    orderActionInfo={OrderActionInfo}/>},
    {title: 'Set product',content:<SelectProducts   
    setCurrent={setCurrent} 
    setOrderActionInfo={setOrderActionInfo}
    orderActionInfo={OrderActionInfo}/>},
    {title: 'success',content:<CreateOrderActionFinish/>},
  ]
  return ( <div>
     <Steps 
     onChange={e=>setCurrent(e)}
     current={current} 
     labelPlacement="vertical" 
     items={items} 
     style={{width:'50%',margin:'16px auto'}}/>
     {items[current].content}
  </div> );
}

export default Order;