import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    HashRouter
  } from 'react-router-dom';
 
import {Nav} from 'react-bootstrap';
import Home from './MasterApp/components/HelloForm';
import LoginPage from './MasterApp/components/Login';



const App = () => (
  <Router>        
    <>
      <div className='container'>
        <div className='content'>
          <Content />
        </div>
        <Footer />
      </div>
    </>
  </Router>
);
    
const TopBar = () => (
  <Nav className="justify-content" activeKey="/home">
    <Nav.Item>
      <Nav.Link href="/">CLUSTERING BASED OCR</Nav.Link>
    </Nav.Item> 
    <Nav.Item>
      <Nav.Link href="/">home</Nav.Link>
    </Nav.Item> 
    <Nav.Item>
      <Nav.Link href="/">About us</Nav.Link>
    </Nav.Item> 
  </Nav>
)

const Footer = () => (
  <footer className='footer'>
    <p>Created by Sequantix</p>
  </footer>
)

const Content = () =>  (
  <Switch>
    <HashRouter>
        <Route exact path="/home" component={ Home } />
        <Route exact path="/" component={ LoginPage } />
    </HashRouter>
  </Switch>
)

export default App;

