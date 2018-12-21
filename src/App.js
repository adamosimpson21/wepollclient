import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import MainLayout from './hocs/MainLayout'
import EmptyLayout from './hocs/EmptyLayout'

const App = () => {
  return(<Switch>
    <Route exact path={['/logIn','/register','/splash','/', '/ballotAnimation']} component={EmptyLayout} />
    <Route component={MainLayout} />
  </Switch>)
}

export default App;

