import React, { Component } from 'react';
import './App.css';
import  Layout from './components/Layout/Layout';
import {getJwt} from './helpers/jwt';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NewDeal from './components/NewDeal/NewDeal';
import BestDeals from './containers/BestDeals/BestDeals';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import ItemDetails from './components/ItemDetails/ItemDetails';
import AuthenticatedComponent from './components/AuthenticatedComponent/AuthenticatedComponent';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {AppProvider} from './containers/AppContext/AppContext';
import {UserProvider} from './containers/AppContext/UserContext';

class App extends Component{
  constructor(props){
    super(props);
 
  }

  
  
 render(){
    return (
      <UserProvider>
        <AppProvider>
        <div className="App">
          <BrowserRouter>
          <Layout/>
          <Route render={({location})=>(
            <TransitionGroup>
            <CSSTransition
            key={location.key}
            timeout={200}
            classNames="fade">
              <Switch location={location}>
                <Route path="/" exact component={BestDeals}/>
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Register}/>
                <Route path="/item/:id" exact component={ItemDetails}/>
                <AuthenticatedComponent>
                  <Route path="/newdeal" exact component={NewDeal}/>
                </AuthenticatedComponent>
              </Switch>
            </CSSTransition>
            </TransitionGroup>
          )}/>
          </BrowserRouter>
      </div>
      </AppProvider>
      </UserProvider>
  );
 }
}

export default App;
