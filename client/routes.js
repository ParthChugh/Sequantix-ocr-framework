import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    HashRouter
  } from 'react-router-dom';
 
import { Nav } from 'react-bootstrap';
import Home from './MasterApp/components/FormOCR';
import LoginPage from './MasterApp/components/Login';
import FetchResult from './MasterApp/components/FetchResult';
import Particles from 'react-particles-js';

const App = () => (
  <Router>        
    <> 
      <div className='content'>
        <div className="content-container">
          
          <Content />
        </div>        
        <div style={{padding: 10}}>
          <Footer />
        </div>   
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
    <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      }}>
    <HashRouter> 
        <Particles 
        params={{
          "particles": {
            "number": {
              "value": 80,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#ffffff"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#ffffff",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 6,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        >
          <Route exact path="/home" component={ Home } />
          <Route exact path="/" component={ LoginPage } />
          <Route exact path="/success" component={ FetchResult } />
        
    </div>
    </HashRouter>
    </div>
  </Switch>
)

export default App;

