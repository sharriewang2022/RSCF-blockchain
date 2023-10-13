import {getProduts} from '../../api/orderPurchaseApi';
import {Button,Card,Row,Col,Input,Table,Image} from 'antd'
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import type {ProductType} from "../../util/variableTypes";

// IType select id from productType
interface ITtype extends Pick<ProductType, "id"> {};
//List: uniArray<productType> 
function uniArray<T extends ITtype>(list:T[]){
 
  return list.filter((item:T,index:number)=>{
    // item.id to find index
    var ind = list.findIndex((target:T)=>target.id===item.id)
    // If index == ind
    if(index===ind){return true}
    else{return false}
  })
}
interface Iprops{
  setShowSelectProduct:Function
  setSelectProductList:Function
  selectProductList:any
}

const columns:ColumnsType<ProductType> = [
  { title: 'Product ID',
  dataIndex: 'id'}, 
  { title: 'Product Name',
  dataIndex: 'productName'},
  { title: 'Product Picture',
  dataIndex: 'picture',  
  render:(urls:string)=>{
      var temp;
      if(urls.includes(",")){
      temp = urls.split(",")
      }else{
        temp = urls.split("|")
      }
      return  <Image src={temp[0]} width={60}/>  
    }
  },
  { title: 'Price',
  dataIndex: 'price'},
  { title: 'Specific',
  dataIndex: 'specs'} 
]

function SelectProduct(props:Iprops) {
  const [params,setParams] = useState<ProductType>({})
  const [pagination,setPagination] =useState({current:1,total:1,pageSize:5})
  const [originData,setOriginData] = useState<ProductType[]>([])
  const [targetData,setTargetData] = useState<ProductType[]>([])
  const [selOrignRows,setSelOriginRows] = useState<ProductType[]>([])
  const [selTargetRows,setSelTargetRows] =useState<ProductType[]>([])

  const getProduct = ()=>{
    getProduts({...params,size:pagination.pageSize,current:pagination.current})
    .then(res=>{
      setOriginData(res.data.data)
      var pa = res.data.pagination;
      setPagination({current:Number(pa.current),pageSize:pa.size,total:pa.total})
    })
  }

  useEffect(()=>{
    getProduct()
  },[pagination.current])
  useEffect(()=>{
    //shopList 
    setTargetData(props.selectProductList)
  },[])

  function toRight(){
    const list = selOrignRows.concat(targetData)
    setTargetData(uniArray<ProductType>(list))
    var leftList = originData.filter(item=>{
      var flag = selOrignRows.some(target=>target.id===item.id)
      return !flag;
    })
    setOriginData(leftList)
  }

  function toLeft(){
    const list = selTargetRows.concat(originData)
    setOriginData(uniArray<ProductType>(list))
    var rightList = targetData.filter(item=>{    
      var flag = selTargetRows.some(target=>target.id===item.id)      
      return !flag;
    })
    setTargetData(rightList)
  }

  return ( <div className="SelectProduct">
    <div className="content">
      <div className='origin'>
        <Card type='inner' title="Choose product">
          <div className='form'>             
            <Row style={{margin:"24px 0"}}>
              <Col span={14}>
                <label>Product Name:</label>
                <Input value={params.productName} onChange={(e)=>setParams({...params,productName:e.target.value})}/>
              </Col>
              <Col span={10}>
                <Button style={{marginLeft:65}} onClick={()=>getProduct()}>Search</Button>
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
        <Card type='inner' title="Selected Shop">
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
      <Button onClick={()=>props.setShowSelectProduct(false)}>Cancel</Button>
      <Button type='primary' onClick={()=>{
        props.setSelectProductList(targetData);
        props.setShowSelectProduct(false)
      }}>Confirm</Button>
    </div>
  </div> );
}

export default SelectProduct;