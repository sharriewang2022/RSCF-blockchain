import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ConfigProvider} from 'antd'
import enGB from 'antd/locale/en_GB';
import 'antd/dist/reset.css';
import sysStore from './store/sysStore'
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//must be wrapped in provider since using useDispatch, userSelector
root.render(
  <React.StrictMode>
    <Provider store={sysStore}>
      <ConfigProvider locale={enGB}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

// root.render(
//    <React.StrictMode>    
//       <App />
//       </ConfigProvider>
//   / </React.StrictMode>
// );
 
// to log results : reportWebVitals(console.log))
reportWebVitals();
