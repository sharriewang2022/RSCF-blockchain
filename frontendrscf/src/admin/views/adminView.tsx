import { Outlet,useNavigate,useLocation} from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import type {Dispatch} from 'redux'
import  React, { useEffect } from "react";
import {getMenus} from '../action/adminActions'
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import type { RootState } from "../../store/sysStore";
const { Header, Sider, Content } = Layout;


function Admin() {  
  const menu  = useSelector((state:RootState)=>state.adminReducer.menu)
  // create redux action dispath
  const dispath:Dispatch<any> = useDispatch()
  const navigate = useNavigate(); 
  const location = useLocation()
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    navigate(e.key);
  };
  useEffect(()=>{
    if(menu.length<2){
      //start action
      dispath(getMenus())
      //if is admin, then go to admin/dash
      if(location.pathname==="/admin"){
        navigate('/dash')
      }else{
        // go to other pages
        navigate(location.pathname)
      }
    }    
  })
  return ( <Layout style={{width:'100vw',height:'100vh'}}>
    <Header >Header</Header>
    <Layout>
      <Sider className="sider" >
        <Menu
        onClick={onClick}       
        mode="inline"
        items={menu}
      />
      </Sider>
      <Content className="main-content">
        <Outlet></Outlet>
      </Content>
    </Layout>   
  </Layout> );
}

export default Admin;
