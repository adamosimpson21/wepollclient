import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import './App.css'
import Landing from './landing/Landing'
import NavBar from "./hocs/NavBar";
import MainLayout from './hocs/MainLayout'
import EmptyLayout from './hocs/EmptyLayout'
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
import MessageDisplay from "./hocs/MessageDisplay";

// {/*<div className='App'>*/}
//   {/*<NavBar/>*/}
//   {/*<div className='app-content'>*/}
//     {/*<MessageDisplay />*/}

const App = () => {
  return(
        <div>
          <Switch>
            <Route component={MainLayout}>
              <Route exact path='/landing' component={Landing}/>
              {/* TODO: make the about page more user friendly */}
              <Route exact path='/about' component={() => window.location = 'https://www.dinnostudio.com/wepoll-deck'}/>
              <Route exact path='/party' component={Party}/>
              <Route exact path='/party/:partyId' component={PartyView}/>
              <Route exact path='/profile' component={Profile}/>
              <Route exact path='/question' component={Question}/>
              <Route exact path='/settings' component={Settings}/>
              <Route exact path='/shop' component={Shop}/>
              <Route exact path='/newQuestionForm' component={NewQuestionForm} />
              <Route exact path='/question/:questionId' component={QuestionDetails} />
              <Route exact path='/question/:questionId/results' component={QuestionResults} />
            </Route>
            <Route component={EmptyLayout}>
              <Route exact path='/logIn' component={LogIn} />
              <Route exact path='/register' component={Register}/>
              <Route exact path='/splash' component={Splash}/>
              <Redirect from="/" to="/splash"/>
            </Route>
            <Route component={MainLayout}>
              <Redirect from="*" to="/landing"/>
            </Route>
          </Switch>
        {/*</div>*/}
      </div>
        // {/*<Footer/>*/}
      // </div>
  )
}

export default App;

