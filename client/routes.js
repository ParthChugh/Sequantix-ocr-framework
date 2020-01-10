import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from 'react-router-dom';
 
import Home from './components/HelloForm';
import LoginPage from './components/Login';



const App = () => (
    <Router>
        <>
        <Content />
        </>
    </Router>
);
    
const Content = () =>  (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={LoginPage} />
  </Switch>
)

export default App;

