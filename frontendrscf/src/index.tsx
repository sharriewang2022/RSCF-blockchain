import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ConfigProvider} from 'antd';
import enGB from 'antd/locale/en_GB';
import 'antd/dist/reset.css';
import sysStore from './store/sysStore'
import { Provider } from 'react-redux';
import {BlockProvider} from "./contexts/blockContext";
import {AuthProvider} from "./contexts/authContext";
import Compose from "./util/compose";



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//must be wrapped in provider since using useDispatch, userSelector
root.render(
  <ConfigProvider locale={enGB}>
  <React.StrictMode>
 
    <Provider store={sysStore}>
     
      <Compose components={[BlockProvider, AuthProvider]}>
          <App />
      </Compose>

    </Provider>

  </React.StrictMode>
  </ConfigProvider>
);

// root.render(
//    <React.StrictMode>    
//       <App />
//       </ConfigProvider>
//   / </React.StrictMode>
// );
 
// to log results : reportWebVitals(console.log))
reportWebVitals();
