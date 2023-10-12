import { useState,useEffect } from 'react' 
import { getTag } from '../../api/orderPurchaseApi'
import dayjs from 'dayjs'
import {Card,Button} from 'antd' 
import {ORDERPURCHASE_STATE,DATETIME_FORMAT,SHOW_HOME,CUSTOM_TYPE,DILIVER_TYPE} from "../../config/sysConfig";
import type {OrderPurchaseType,TagType}  from "../../util/variableTypes";
interface Iprops{
  orderActionInfo:OrderPurchaseType
}
function OrderPurchaseInfo(props:Iprops) {
  // 定义标签
  const [tag,setTag] = useState<TagType>({})
  const orderActionInfo = props.orderActionInfo;
  const state = Number(orderActionInfo.state)
  // 请求tag数据
  useEffect(()=>{
    getTag({id:orderActionInfo.tag})
    .then(res=>{
      setTag(res.data.data[0])
    })
  },[])
  return ( <div>    
    {/* <p>{JSON.stringify(orderActionInfo)}</p> */}
   
    <Card type='inner' title=" 活动状态">
      <p>{ORDERPURCHASE_STATE[state]}</p>
      {state<=2?<Button>提前结束</Button>:''}
    </Card>
    <Card type='inner' title="活动信息">
      <p>
        <span> 活动名称：</span>
        <span>{orderActionInfo.name}</span>
      </p>
      <p>
        <span> 活动名称：</span>
        <span>{dayjs(orderActionInfo.startTime).format(DATETIME_FORMAT)} 到 {dayjs(orderActionInfo.endTime).format(DATETIME_FORMAT)}</span>
      </p>
      <p>
        <span> 广告语：</span>
        <span>{orderActionInfo.slogan}</span>
      </p>
      <p>
        <span> 预告时间：</span>
        <span>{dayjs(orderActionInfo.preTime).format(DATETIME_FORMAT)}</span>
      </p>
      <p>
        <span> 首页展示：</span>
        <span>{SHOW_HOME[Number(orderActionInfo.showHome)]}</span>
      </p>
      <p>
        <span> 标签：</span>
        <span><img src={tag.pic} alt='标签' width="60" /></span>
      </p>
    </Card>
    <Card type='inner' title="活动规则">
      <p>
          <span> 顾客类型：</span>
          <span>{CUSTOM_TYPE[Number(orderActionInfo.target)]}</span>
      </p>
      <p>
          <span> 是否限量：</span>
          <span>{orderActionInfo.limitBuy===999?'不限':orderActionInfo.limitBuy}</span>
      </p>
      <p>
          <span> 配送方式：</span>
          <span>{DILIVER_TYPE[Number(orderActionInfo.deliverWay)]}</span>
      </p>
      <p>
          <span> 提货时间：</span>
          <span>{dayjs(orderActionInfo.pickTime).format(DATETIME_FORMAT)}</span>
      </p>
    </Card>
  </div> );
}

export default OrderPurchaseInfo;