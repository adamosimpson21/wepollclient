import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import './App.css'
import MainLayout from './hocs/MainLayout'
import EmptyLayout from './hocs/EmptyLayout'

const App = () => {
  return(<Switch>
            <Route exact path={['/logIn','/register','/splash','/']} component={EmptyLayout} />
            <Route component={MainLayout} />
            <Redirect from="/" to="/splash"/>
          </Switch>)}

export default App;

