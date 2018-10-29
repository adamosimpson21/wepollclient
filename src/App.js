import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import './App.css'
import Landing from './landing/Landing'
import NavBar from "./hocs/NavBar";
import ErrorDisplay from "./hocs/ErrorDisplay";
import Party from "./party/Party";
import PartyView from "./party/PartyView";
import Profile from "./profile/Profile";
import Settings from "./settings/Settings";
import Shop from "./shop/Shop";
import Splash from "./splash/Splash";
import LogIn from "./register/LogIn";
import Register from "./register/Register";
import Question from "./question/Question";
import NewQuestionForm from './question/NewQuestionForm'
import QuestionDetails from './question/QuestionDetails'
import QuestionResults from './question/QuestionResults'
import Footer from "./hocs/Footer";

const App = () => {
  return(
      <div className='App'>
        <NavBar/>
        <div className='app-content'>
        <ErrorDisplay />
          <Switch>
            <Route exact path='/splash' component={Splash}/>
            <Route exact path='/landing' component={Landing}/>
            <Route exact path='/about' component={() => window.location = 'https://www.dinnostudio.com/wepoll-deck'}/>
            <Route exact path='/party' component={Party}/>
            <Route exact path='/party/:partyId' component={PartyView}/>
            <Route exact path='/profile' component={Profile}/>
            <Route exact path='/question' component={Question}/>
            <Route exact path='/settings' component={Settings}/>
            <Route exact path='/shop' component={Shop}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/logIn' component={LogIn} />
            <Route exact path='/newQuestionForm' component={NewQuestionForm} />
            <Route exact path='/question/:questionId' component={QuestionDetails} />
            <Route exact path='/question/:questionId/results' component={QuestionResults} />
            <Redirect from="/" to="/splash"/>
            <Redirect from="*" to="/landing"/>
          </Switch>
        </div>
        <Footer/>
      </div>
  )
}

export default App;

