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
import UploadFileView from "../drmDocument/components/uploadFile";
import TrackProductView from "../trace/components/trackProduct";
import RegisterView from "../admin/views/registerView";
import {Manufacturer} from "../admin/components/manufacturer";



const baseRouter = [
    {path:"/", element:<LoginView/>, children:[] },
    // {path:'/dashboard', element:<DashView/>}, --lazylaod 
    {path:"/admin/*", element:<Private><AdminView/></Private>, 
         children:[{
            path:'',
            element:LazyLoad('/dashView'),
        }]
    },
    // {path:'/register', element:<RegisterView/>},
    
    {path:'/register', element:<Manufacturer/>},
    {path:'/prodcut', element:<ProductView/>},
    {path:'/prodcut/ProduceList', element:<ProductList/>},
    
    {path:'/file', element:<UploadFileView/>},
    {path:'/trackProduct', element:<TrackProductView/>},
    {path:'/category', element:<CategoryView/>},
    {path:'/order', element:<OrderView/>}
];

export default baseRouter;