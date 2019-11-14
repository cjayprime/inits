import React from 'react';
import {inject, observer} from 'mobx-react';
import { BrowserRouter } from "react-router-dom";
import Routes from './components/Routes';

function App(props) {

  return (
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  );

}

export default inject('store')(observer(App));