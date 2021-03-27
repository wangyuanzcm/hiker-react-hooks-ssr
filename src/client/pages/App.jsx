import React from 'react';
import {Routes} from '../router';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import {Provider} from 'react-redux';
import {createClientStore} from '../store'
const App = ()=>{
  return <Provider store={createClientStore()}>
    <Router basename="/">{Routes()}</Router>
  </Provider>
}

export default App;