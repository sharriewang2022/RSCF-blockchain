import  React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation, useParams} from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import type {Dispatch} from 'redux'
import { Layout, Menu, Button, theme } from 'antd';
import type { MenuProps } from 'antd';
import type { RootState } from "../../store/sysStore";
import {getMenus} from '../action/adminActions'
import Dashboard from '../../dashboard/Dashboard';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined  
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const AdminView: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menu  = useSelector((state:RootState)=>state.adminReducer.menu)

  // create redux action dispath
  const dispath:Dispatch<any> = useDispatch()
  const navigate = useNavigate(); 
  const location = useLocation()
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    navigate(e.key);
  };
  const params = useParams();

  useEffect(()=>{
    if(menu.length<2){
      //start action
      // dispath(getMenus({userID: params.userID}))
      dispath(getMenus("sa"))
      //if is admin, then go to admin/dash
      // if(location.pathname==="/admin"){
      //   // navigate('/adminView')
      // }else{
      //   // go to other pages
      //   navigate(location.pathname)
      // }
    }    
  },[])

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          onClick={onClick}       
          mode="inline"
          inlineCollapsed={collapsed}
          items={menu}
        />         
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};


// function AdminView() {  
  

//   //display menus
//   return ( 
//     <Layout style={{width:'100vw',height:'100vh', background:"#C0D9D9"}}>
//     <Header >


//     </Header>
//     <Layout>
//       <div className="demo-logo-vertical" />
//       <Sider className="sider" >
//         <Menu
//         onClick={onClick}       
//         mode="inline"
//         inlineCollapsed={collapsed}
//         items={menu}
//       />
//       </Sider>
//       <Content className="main-content">      
       
//         <Outlet></Outlet>
//       </Content>
//     </Layout> 
//     <Dashboard></Dashboard>  
//   </Layout> );
// }

export default AdminView;
