import dayjs from  'dayjs'
import {ORDERPURCHASE_STATE,DATE_FORMAT} from "../../config/sysConfig";
import { Col, Row,Input,DatePicker,Radio,Button} from 'antd';
import {OrderPurchaseType}  from "../../util/variableTypes";
interface Iprops{
  params:OrderPurchaseType  //参数
  setParams:Function // 设置查询参数的方法
  getOrderChain:Function // 获取查询列表的方法
  reset:Function
}
// time picker
const { RangePicker } = DatePicker;
function SeachParams(props:Iprops) {
 
  const params = props.params;
  const setParams = props.setParams;
  return ( <div className='searchParams'>
    {/* {JSON.stringify(searchParams)} */}
   
  <Row gutter={8}>
    <Col span={7}>
      <label>活动编号：</label>
      <Input value={params.id} onChange={e=>setParams({...params,id:e.target.value})}/>
    </Col>
    <Col span={7}>
      <label>活动名称：</label>
      <Input value={params.name} onChange={e=>setParams({...params,name:e.target.value})}/>
    </Col>
    <Col span={10}>
      <label>活动开始时间：</label>
      <RangePicker
      format={DATE_FORMAT} 
      onChange={(date,strArr)=>{
        console.log(date,strArr)
        setParams({...params,startTime:strArr.join(',')})
      }} />
    </Col>
  </Row>
  <Row gutter={8} style={{margin:"24px 0"}}>
    <Col span={7}>
      <label>参与商品：</label>
      <Input value={params.products} onChange={e=>setParams({...params,products:e.target.value})}/>
    </Col>
    <Col span={7}>
      <label>参与门店：</label>
      <Input  value={params.shop} onChange={e=>setParams({...params,shop:e.target.value})}/>
    </Col>
    <Col span={10}>
      <label>活动结束时间：</label>
      <RangePicker
         format={DATE_FORMAT} 
         onChange={(date,strArr)=>{          
           setParams({...params,endTime:strArr.join(',')})
         }} 
      />
    </Col>
  </Row>
  <Row gutter={8}>
    <Col span={14}>
     <label>活动状态： &nbsp;</label>
     <Radio.Group defaultValue="" buttonStyle="solid" onChange={e=>setParams({...params,state:e.target.value})}>
      <Radio.Button value="">全部</Radio.Button>
      {
        ORDERPURCHASE_STATE.map((item,index)=><Radio.Button key={index} value={index}>{item}</Radio.Button>)
      }
    </Radio.Group>
    </Col>
    <Col span={10}>
      <Button onClick={()=>props.reset()}>重置</Button>
      <Button type='primary' onClick={()=>props.getOrderChain()}>搜索</Button>
    </Col>
  </Row>
  
  </div> );
}

export default SeachParams;