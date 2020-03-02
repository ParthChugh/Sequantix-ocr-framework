import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    HashRouter
  } from 'react-router-dom'; 
import Home from './MasterApp/components/FormOCR';
import LoginPage from './MasterApp/components/Login';
import FetchResult from './MasterApp/components/FetchResult';
import Particles from 'react-particles-js';

const App = (props) => {
  return(
    <Router>        
      <> 
        <div className='content'>
          <div className="content-container">
            <Content 
              props={props}
            />
          </div>        
        </div>
      </>
    </Router>
    )    
}

const Content = ({props}) =>  {
  return(
    <Switch>
        <>
          <HashRouter> 
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}>
            }
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
              }}
            >
              <Route exact path="/home" component={ Home }/>
              <Route exact path="/">
                <div>
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
                  <div style={{zIndex: 999}}>
                    <LoginPage externalProps={props} />
                  </div>
                  
                  
                </div>
              
              </Route>
              <Route exact path="/success" component={ FetchResult }/>
        </div>
        </div>
        </HashRouter>
        </>
    </Switch>
  )
}

export default App;

