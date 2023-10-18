import React from 'react';
import LoginView from "../login/components/login";
import ProductView from "../product/components/product";
import AdminView from "../admin/views/adminView";
import Private from '../util/private'
import LazyLoad from "../util/LazyLoad"
import DashView from '../admin/views/dashView';
import DocumentView from "../drmDocument/components/uploadFile";
import TrackProductView from "../trace/components/trackProduct";


import { Provider } from 'web3modal';


const baseRouter = [
    {path:"/", element:<LoginView/>, children:[] },
    {path:'/dashboard', element:<DashView/>},
    {path:"/admin/*", element:<Private><AdminView/></Private>, 
         children:[{
            path:'',
            element:LazyLoad('/admin/views/dashView'),
        }]
    },
    {path:'/prodcut', element:<ProductView/>},
    {path:'/file', element:<DocumentView/>},
    {path:'/trackProduct', element:<TrackProductView/>}

    // {path:'/map',element:<MapView/>}
];

export default baseRouter;