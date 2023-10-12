// 导入获取店铺的方法
import {getShops} from '../../api/orderPurchaseApi';
import {Button,Card,Row,Col,Input,Table} from 'antd';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
// interface ITtype{
//   id？:number
// }
// Omit去除类型中某些项
// export type OmitEmailContact = Omit<Contact, 'email' >;
// Pic选择一个
// export interface ContactPick extends Pick<Contact, 'name' | 'phone'> {}
// Partial将类型中所有选项变为可选，即加上？（官方提供）
// export interface PartialContact= Partial<Contact>
// Required将类型中所有选项变为必选，去除所有？（官方提供）
// export interface RequiredContact= Required<Contact>

// 定义一个类型IType 从shopType选择一个 id
interface ITtype extends Pick<shopType, "id"> {};
// 调用的时候传入实参shopType
// uniArray<shopType>(list)
// 定义一个函数uniArray 有个类型是泛型，先起个形式上的名称叫T，T必须继承ITtype（必须有id）
// 参数据list是个T类型的数组
function uniArray<T extends ITtype>(list:T[]){
  // 对list进行过滤（返回true就留下，返回false就删除了）
  return list.filter((item:T,index:number)=>{
    // 通过item.id去查找下标（如果是重复返回第一个对应的下标，）
    var ind = list.findIndex((target:T)=>target.id===item.id)
    // 如果下标和遍历下标一致 不是重复的，下标不一致就是重复
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
// 定义column 类型
const columns:ColumnsType<shopType> =[
  { title: '店铺编号',
  dataIndex: 'id'}, 
  { title: '名称',
  dataIndex: 'name'},
  { title: '区域',
  dataIndex: 'address'},
  { title: '业态',
  dataIndex: 'type'} 
]
function SelectShop(props:Iprops) {
  // 搜索参数
  const [params,setParams] = useState<shopType>({})
  // 分页数据
  const [pagination,setPagination] =useState({current:1,total:1,pageSize:5})
  // 源数据列表
  const [originData,setOriginData] = useState<shopType[]>([])
  // 目标数据列表
  const [targetData,setTargetData] = useState<shopType[]>([])
  // 选择源数据
  const [selOrignRows,setSelOriginRows] = useState<shopType[]>([])
  // 选择的目标数据
  const [selTargetRows,setSelTargetRows] =useState<shopType[]>([])
  // 获取店铺的方法
  const getShop = ()=>{
    getShops({...params,size:pagination.pageSize,current:pagination.current})
    .then(res=>{
      // 更新源数据
      setOriginData(res.data.data)
      var pa = res.data.pagination;
      // 更新分页
      setPagination({current:Number(pa.current),pageSize:pa.size,total:pa.total})
    })
  }
  useEffect(()=>{
    getShop()
  },[pagination.current])
  useEffect(()=>{
    //  用shopList更新右边的数据
    setTargetData(props.shopList)
  },[])
  function toRight(){
    // 吧选择的数据和现有targetData合并
    const list = selOrignRows.concat(targetData)
    // 更新右边的数据
    setTargetData(uniArray<shopType>(list))
    // 删除左边数据
    var leftList = originData.filter(item=>{
      //如果当前元素item的id在 selOrignRows能找到，返回false，找不到返回true
      // some：如果有一个回调函数返回true，最终结果是true
      // 查找选择target.id是否有一个和当前遍历元素item.id相等 返回的是true
      var flag = selOrignRows.some(target=>target.id===item.id)
      // 如果是相等说明这个元素在originData需要被删除，filter返回false被过滤掉
      return !flag;
    })
    // 更新左边的数据
    setOriginData(leftList)
  }
  function toLeft(){
    // 吧选择的数据和现有originData合并
    const list = selTargetRows.concat(originData)
    // 更新左边的数据
    setOriginData(uniArray<shopType>(list))
    // 删除右边数据
    var rightList = targetData.filter(item=>{    
      var flag = selTargetRows.some(target=>target.id===item.id)      
      return !flag;
    })
    // 更新右边边的数据
    setTargetData(rightList)
  }
  return ( <div className="SelectShop">
    <div className="content">
      <div className='origin'>
        <Card type='inner' title="选择店铺">
          <div className='form'>
            <Row>
              <Col span={14}>
                <label>店铺:</label>
                <Input value={params.name} onChange={(e)=>setParams({...params,name:e.target.value})}/>
              </Col>
              <Col span={10}>
                <label>业态:</label>
                <Input value={params.type} onChange={(e)=>setParams({...params,type:e.target.value})}/>
              </Col>
            </Row>
            <Row style={{margin:"24px 0"}}>
            <Col span={14}>
                <label>管理区域:</label>
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
          <Button onClick={()=>toRight()}>添加&gt;&gt;</Button>
          <Button onClick={()=>toLeft()}>&lt;&lt;取消</Button>
      </div>
      <div className='target'>
        <Card type='inner' title="已选店铺">
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
      <Button onClick={()=>props.setShowShop(false)}>取消</Button>
      {/* 单击确定更新shopList */}
      <Button type='primary' onClick={()=>{
        // 右边的数据为选择的店铺
        props.setShopList(targetData);
        // 关闭弹框
        props.setShowShop(false)
      }}>确定</Button>
    </div>
  </div> );
}

export default SelectShop;