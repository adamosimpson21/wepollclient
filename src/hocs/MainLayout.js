import React, {Component} from 'react';
import NavBar from "./NavBar";
import MessageDisplay from "./MessageDisplay";
import Footer from "./Footer";
import {Redirect, Route} from "react-router-dom";
import Landing from "../landing/Landing";
import Party from "../party/Party";
import PartyView from "../party/PartyView";
import Profile from "../profile/Profile";
import Question from "../question/Question";
import Settings from "../settings/Settings";
import Shop from "../shop/Shop";
import NewQuestionForm from "../question/NewQuestionForm";
import QuestionDetails from "../question/QuestionDetails";
import QuestionResults from "../question/QuestionResults";
import Switch from "react-router/es/Switch";

class MainLayout extends Component{
  render(){
    return(<div className='App'>
      <NavBar/>
      <div className='app-content'>
        <MessageDisplay />
        <Switch>
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
          <Redirect from="*" to="/landing"/>
        </Switch>
      </div>
      <Footer/>
    </div>)
  }
}

export default MainLayout;