 
import {getShops} from '../../api/orderApi';
import {Button,Card,Row,Col,Input,Table} from 'antd';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
 
interface ITtype extends Pick<shopType, "id"> {};
 
function uniArray<T extends ITtype>(list:T[]){
 
  return list.filter((item:T,index:number)=>{ 
    var ind = list.findIndex((target:T)=>target.id===item.id)
    if(index===ind){return true}
    else{return false}
  })
}

interface Iprops{
  setShowShop:Function
  setShopList:Function
  shopList:shopType[]
}

interface shopType{
  id?:number
  name?:string
  type?:string
  address?:string
}

 
const columns:ColumnsType<shopType> =[
  { title: 'Shop ID',
  dataIndex: 'id'}, 
  { title: 'Shop Name',
  dataIndex: 'name'},
  { title: 'Address',
  dataIndex: 'address'},
  { title: 'Type',
  dataIndex: 'type'} 
]
function SelectShop(props:Iprops) {
 
  const [params,setParams] = useState<shopType>({}) 
  const [pagination,setPagination] =useState({current:1,total:1,pageSize:5}) 
  const [originData,setOriginData] = useState<shopType[]>([])
  const [targetData,setTargetData] = useState<shopType[]>([])
  const [selOrignRows,setSelOriginRows] = useState<shopType[]>([])
  const [selTargetRows,setSelTargetRows] =useState<shopType[]>([])

  const getShop = ()=>{
    getShops({...params,size:pagination.pageSize,current:pagination.current})
    .then(res=>{
      setOriginData(res.data.data)
      var pa = res.data.pagination;
      setPagination({current:Number(pa.current),pageSize:pa.size,total:pa.total})
    })
  }

  useEffect(()=>{
    getShop()
  },[pagination.current])
  useEffect(()=>{
    setTargetData(props.shopList)
  },[])

  function toRight(){
    const list = selOrignRows.concat(targetData)
    setTargetData(uniArray<shopType>(list))
    var leftList = originData.filter(item=>{
      var flag = selOrignRows.some(target=>target.id===item.id)
      return !flag;
    })
    setOriginData(leftList)
  }

  function toLeft(){
    const list = selTargetRows.concat(originData)
    setOriginData(uniArray<shopType>(list))
    var rightList = targetData.filter(item=>{    
      var flag = selTargetRows.some(target=>target.id===item.id)      
      return !flag;
    })
    setTargetData(rightList)
  }

  return ( <div className="SelectShop">
    <div className="content">
      <div className='origin'>
        <Card type='inner' title="Choose Shop">
          <div className='form'>
            <Row>
              <Col span={14}>
                <label>Shop Name: </label>
                <Input value={params.name} onChange={(e)=>setParams({...params,name:e.target.value})}/>
              </Col>
              <Col span={10}>
                <label>Shop Style: </label>
                <Input value={params.type} onChange={(e)=>setParams({...params,type:e.target.value})}/>
              </Col>
            </Row>
            <Row style={{margin:"24px 0"}}>
            <Col span={14}>
                <label>Address: </label>
                <Input value={params.address} onChange={(e)=>setParams({...params,address:e.target.value})}/>
              </Col>
              <Col span={10}>
                <Button style={{marginLeft:65}} onClick={()=>getShop()}>搜索</Button>
              </Col>
            </Row>
            <Table 
            rowKey="id"
             rowSelection={{
              type: 'checkbox',
              onChange:(keys,rows)=>{
               setSelOriginRows(rows)
              }
            }}
            onChange={pa=>{
              setPagination({...pagination,current:Number(pa.current)})
            }}
            pagination={pagination} 
            size='small'
            columns={columns} 
            dataSource={originData}></Table>
          </div>
        </Card>
      </div>
      <div className='btns'>
          <Button onClick={()=>toRight()}>Add&gt;&gt;</Button>
          <Button onClick={()=>toLeft()}>&lt;&lt;Cancel</Button>
      </div>
      <div className='target'>
        <Card type='inner' title="Selected Shop:">
        <Table 
            rowKey="id"
             rowSelection={{
              type: 'checkbox',
              onChange:(keys,rows)=>{
               setSelTargetRows(rows)
              }
            }}
            pagination={false} 
            size='small'
            columns={columns} 
            dataSource={targetData}></Table>
        </Card>
      </div>
    </div>
    <div className='footer'>
      <Button onClick={()=>props.setShowShop(false)}>Cancel</Button>
 
      <Button type='primary' onClick={()=>{  
        props.setShopList(targetData);
        props.setShowShop(false)
      }}>Confirm</Button>
    </div>
  </div> );
}

export default SelectShop;