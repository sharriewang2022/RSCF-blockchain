import  React,{ useState,useEffect } from 'react' 
import { getTag } from '../../api/orderApi'
import dayjs from 'dayjs'
import {Card,Button} from 'antd' 
import {DATETIME_FORMAT} from "../../config/sysConfig";
import {ORDERPURCHASE_STATE,SHOW_HOME,CUSTOM_TYPE,DILIVER_TYPE} from "../../util/constant";
import type {OrderPurchaseType,TagType}  from "../../util/variableTypes";
interface Iprops{
  orderActionInfo:OrderPurchaseType
}
function OrderPurchaseInfo(props:Iprops) {
  const [tag,setTag] = useState<TagType>({})
  const orderActionInfo = props.orderActionInfo;
  const state = Number(orderActionInfo.state)
 
  useEffect(()=>{
    getTag({id:orderActionInfo.tag})
    .then(res=>{
      setTag(res.data.data[0])
    })
  },[])
  return ( <div>    
    {/* <p>{JSON.stringify(orderActionInfo)}</p> */}
   
    <Card type='inner' title="Order Status">
      <p>{ORDERPURCHASE_STATE[state]}</p>
      {state<=2?<Button>Finished</Button>:''}
    </Card>
    <Card type='inner' title="Order Info">
      <p>
        <span> Order Name: </span>
        <span>{orderActionInfo.name}</span>
      </p>
      <p>
        <span> Order Time: </span>
        <span>{dayjs(orderActionInfo.startTime).format(DATETIME_FORMAT)} 到 {dayjs(orderActionInfo.endTime).format(DATETIME_FORMAT)}</span>
      </p>
      <p>
        <span> Order Specific: </span>
        <span>{orderActionInfo.orderLogan}</span>
      </p>
      <p>
        <span> Order Pretime: </span>
        <span>{dayjs(orderActionInfo.preTime).format(DATETIME_FORMAT)}</span>
      </p>
      <p>
        <span> Order Home: </span>
        <span>{SHOW_HOME[Number(orderActionInfo.showHome)]}</span>
      </p>
      <p>
        <span> Tag: </span>
        <span><img src={tag.pic} alt='tag' width="60" /></span>
      </p>
    </Card>
    <Card type='inner' title="Order Rules">
      <p>
          <span> Customer Type: </span>
          <span>{CUSTOM_TYPE[Number(orderActionInfo.target)]}</span>
      </p>
      <p>
          <span>Amount: </span>
          <span>{orderActionInfo.limitBuy===999?'999':orderActionInfo.limitBuy}</span>
      </p>
      <p>
          <span>DeliverWay: </span>
          <span>{DILIVER_TYPE[Number(orderActionInfo.deliverWay)]}</span>
      </p>
      <p>
          <span> Pickup Time: </span>
          <span>{dayjs(orderActionInfo.pickTime).format(DATETIME_FORMAT)}</span>
      </p>
    </Card>
  </div> );
}

export default OrderPurchaseInfo;