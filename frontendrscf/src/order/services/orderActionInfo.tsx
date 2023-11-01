import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import {Card, Input, DatePicker ,Button,Checkbox,Upload, Image,Radio,Select, Tag} from "antd";
import {DATE_FORMAT} from "../../config/sysConfig";
import SelectShop from "./operateShop";
import SelectTag from "./orderTag";
import type {OrderPurchaseType} from "../../util/variableTypes";

const {RangePicker} = DatePicker;
 
interface Iprops {
  setCurrent: Function;
  setOrderActionInfo: Function;
  orderActionInfo: OrderPurchaseType;
}
const fallback="data:image/png;base64,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"
interface shopType{
  id?:number
  name?:string
  type?:string
  address?:string
}
function CreateOrderActionInfo(props: Iprops) {

  const [shopList,setShopList] = useState<shopType[]>([])
  // show shop
  const [showShop,setShowShop] = useState(false)
  const {orderActionInfo, setCurrent, setOrderActionInfo } = props; 
  const [tag,setTag] = useState({pic:'',type:'',name:'',id:''})
  const [tagType,setTagType] = useState(1)
  const [showTag,setShowTag] =useState(false)
  // listen tag to change orderActionInfo's tag
  useEffect(()=>{
    setOrderActionInfo({...orderActionInfo,tag:tag.id})
  },[tag])
  // list shopList, change orderInfo
  useEffect(()=>{
    console.log("listen order")
    setOrderActionInfo({...orderActionInfo,shop:shopList.map(item=>item.id).join(',')})
  },[shopList])
  return (
    <div className="CreateOrderActionInfo">
      <Card type="inner" title="Order Action">
        {/* {JSON.stringify(orderActionInfo)} */}
        <p>
          <span className="label">Order Name:</span>
          <span>
            <Input
              value={orderActionInfo.name}
              onChange={(e) => {
                setOrderActionInfo({ ...orderActionInfo, name: e.target.value });
              }}
            />
          </span>
        </p>
        <p>
          <span className="label">Order Time: </span>
          <span>
            <RangePicker
              onChange={(value, str) => {
                setOrderActionInfo({
                  ...orderActionInfo,
                  startTime: str[0],
                  endTime: str[1],
                });
              }}
              format={DATE_FORMAT}
              value={[
                orderActionInfo.startTime ? dayjs(orderActionInfo.startTime) : null,
                orderActionInfo.endTime ? dayjs(orderActionInfo.endTime) : null,
              ]}
            />
          </span>
        </p>
        
        <p>
          <span className="label">Order Sign: </span>
          <span>            
            <Input
              value={orderActionInfo.orderLogan}
              onChange={(e) => {
                setOrderActionInfo({ ...orderActionInfo, orderLogan: e.target.value });
              }}
            />
          </span>
        </p>

        <p>
          <span className="label"> Order Introduction: </span>
          <span>            
            <Input
              value={orderActionInfo.orderIntroduction}
              onChange={(e) => {
                setOrderActionInfo({ ...orderActionInfo, orderIntroduction: e.target.value });
              }}
            />
          </span>        
        </p>

        <p>
        <span className="hidden" >            
            <Upload        
              showUploadList={false} 
              listType="picture-card"
              className="avatar-uploader"
              onChange={info=>{
                if(info.file&&info.file.response){         
                setOrderActionInfo({...orderActionInfo,banner:'http://127.0.0.1:5000'+info.file.response.file.path})
                }
              }}
              name="file"
              action="http://127.0.0.1:5000/api/file/upload">
                {
                  orderActionInfo.banner?<Image  preview={false} src={orderActionInfo.banner} width={110} fallback={fallback} />:<Button>上传图片</Button>
                }
            </Upload>   
          </span>
        </p>

        <p>
          <span className="label">Order Show Home: </span>
          <span>            
             <Checkbox 
              onChange={(e) => {
                setOrderActionInfo({ ...orderActionInfo, showHome: Number(e.target.checked) });
              }}
             checked={Boolean(orderActionInfo.showHome)}/>
          </span>
        </p>
        <p>
          <span className="label">Order Picture: </span>
          <span  style={{width:200,display:'inline-block',verticalAlign:'middle'}}>            
            <Upload        
              showUploadList={false} 
              listType="picture-card"
              className="avatar-uploader"
              onChange={info=>{
                if(info.file&&info.file.response){         
                setOrderActionInfo({...orderActionInfo,homePic:'http://127.0.0.1:5000'+info.file.response.file.path})
                }
              }}
              name="file"
              action= "http://127.0.0.1:5000/file/upload"
              >
              {
                orderActionInfo.homePic?<Image preview={false}   src={orderActionInfo.homePic} width={110} fallback={fallback} />:<Button>Upload Picture</Button>
              }
            </Upload>          
          </span>
        </p>

        <p>
          <span className="hidden">Order Style: </span>
          <span className="hidden">            
          <Radio.Group onChange={e=>setOrderActionInfo({...orderActionInfo,showType:e.target.value})} value={orderActionInfo.showType}>
          <Radio value={1}>One Row One Column</Radio>
          <Radio value={2}>One Row Two Columns</Radio>
          <Radio value={3}>One Row Three Columns</Radio>         
          </Radio.Group>
          </span>
        </p>

        <p>
          <span className="hidden">Order Tag: </span>
          <span className="hidden">            
            <Select
              onChange={e=>{
                setTagType(e)
                setShowTag(true)
              }}
              defaultValue={1}
              style={{ width: 120 }}         
              options={[{ value: 1, label: 'Order' },{ value: 2, label: 'Action' }]}
            />&emsp;&emsp;
            <Image 
            preview={false}
            onClick={()=>setShowTag(true)}
            src={tag.pic} fallback={fallback} width={64}/>
          </span>
        </p>
        {/* showTag is true and send setShowTag() */}
        {showTag&&<SelectTag setShowTag={setShowTag} tagType={tagType} setTag={setTag}/>}
       
      </Card>
      <Card type="inner" title="Order Rule" >
      <p>
          <span className="label">Time: </span>
          <span>
            <DatePicker
              onChange={(value, str) => {
                setOrderActionInfo({
                  ...orderActionInfo,
                  preTime: str,
                 
                });
              }}
              format={DATE_FORMAT}
              value={  orderActionInfo.preTime ? dayjs(orderActionInfo.preTime ) : null                
               }
            />
          </span>
        </p>
      <p>
          <span className="label">Order Clients: </span>
          <span>            
          <Radio.Group onChange={e=>setOrderActionInfo({...orderActionInfo,target:e.target.value})} value={orderActionInfo.target}>
            <Radio value={1}>All Users</Radio>
            <Radio value={2}>New User</Radio>
          </Radio.Group>
          </span>
        </p>        
       
        <p>
          <span className="label">Order Amount: </span>
          <span>            
            <Input
              value={orderActionInfo.limitBuy}
              onChange={(e) => {
                setOrderActionInfo({ ...orderActionInfo, limitBuy: e.target.value });
              }}
            />
          </span>
        </p>
        <p>
          <span className="label">DeliverWay: </span>
          <span>            
          <Radio.Group onChange={e=>setOrderActionInfo({...orderActionInfo,deliverWay:e.target.value})} value={orderActionInfo.deliverWay}>
            <Radio value={1}>Self Pickup</Radio>
            <Radio value={2}>Express </Radio>
          </Radio.Group>
          </span>
        </p> 
        <p>
          <span className="hidden">Shops: </span>
          <span className="hidden">            
          <Radio.Group onChange={e=>{
            setOrderActionInfo({...orderActionInfo,shop:e.target.value})
            if(e.target.value){
              setShowShop(true);
            }
            }} value={orderActionInfo.shop}>
            <Radio value={''}>All Shops</Radio>
            <Radio value={1}>Some shop</Radio>
          </Radio.Group>
         { orderActionInfo.shop&&<span onClick={()=>setShowShop(true)}> </span>}
          </span><span>{shopList.map(item=>item.name).join(' ,')}</span>
        </p> 
        <p>
          <span className="label">Pickup Time: </span>
          <span>
            <DatePicker
              onChange={(value, str) => {
                setOrderActionInfo({
                  ...orderActionInfo,
                  pickTime: str,                 
                });
              }}
              format={DATE_FORMAT}
              value={  orderActionInfo.pickTime ? dayjs(orderActionInfo.pickTime ) : null                
               }
            />
          </span>
        </p>  
      </Card>
      <p><Button type="primary" onClick={()=>setCurrent(1)}>Next, Select Products</Button></p>
      {showShop&&<SelectShop shopList={shopList} setShowShop={setShowShop} setShopList={setShopList}></SelectShop>}
    </div>
  );
}

export default CreateOrderActionInfo;
