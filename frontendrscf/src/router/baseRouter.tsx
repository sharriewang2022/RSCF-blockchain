import React from 'react';
import LoginView from "../login/components/loginView";
import AdminView from "../admin/views/adminView";
import ProductView from "../product/components/productView";
import ProductList from "../product/components/productList";
import CategoryView from "../category/components/categoryView";
import OrderView from "../order/components/orderView";
import Private from '../util/private'
import LazyLoad from "../util/LazyLoad"
import DashView from '../admin/views/dashView';
import Dashboard from '../dashboard/Dashboard';
import UploadFileView from "../drmDocument/components/uploadFile";
import TrackProductView from "../trace/components/trackProduct";
import RegisterView from "../admin/views/registerView";
import {ManageView} from "../admin/views/manageView";



const baseRouter = [
    {path:"/", element:<LoginView/>, children:[] },
    // {path:'/dashboard', element:<DashView/>}, --lazylaod 
    {path:"/admin/*", element:<Private><AdminView/></Private>, 
         children:[{
            path:'',
            element:LazyLoad('/DashView'),
        }]
    },
    // {path:'/register', element:<RegisterView/>},
    
    // {path:'/sysManage', element:<ManageView/>},
    {path:'/sysManage', element:<Dashboard/>},
    {path:'/prodcut', element:<ProductView/>},
    {path:'/prodcut/ProduceList', element:<ProductList/>},
    {path:'/file', element:<UploadFileView/>},
    {path:'/trackProduct', element:<TrackProductView/>},
    {path:'/category', element:<CategoryView/>},
    {path:'/order', element:<OrderView/>}
];

export default baseRouter;