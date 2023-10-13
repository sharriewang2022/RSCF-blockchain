import { HashRouter as Router } from 'react-router-dom'
import RouteView from './admin/views/routerView'
import React, { Component }  from 'react';

function App() {
  return (
     <Router><RouteView></RouteView></Router>      
  );
}

export default App;

