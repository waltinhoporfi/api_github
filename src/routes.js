import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Search from './pages/Search/index'
import UserInfo from './pages/UserInfo/index'

// import { Container } from './styles';

export default function Routes() {
  return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Search}/>
            <Route path="/userInfo" exact component={UserInfo}/>
        </Switch>
    </BrowserRouter>
  );
}
