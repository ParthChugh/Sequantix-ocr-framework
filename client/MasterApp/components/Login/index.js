import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Modal } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { BASE_URL} from '../../../constants';
import "./Login.scss";

const App = (props) => {  
  const { register, handleSubmit, watch, errors } = useForm()
  const { externalProps } = props;
  const [jsonResponse,updateData] = useState({});
  let history = useHistory();

  const onSubmit = (data) => {
    history.push({
      pathname: "/home",
      state: { detail: jsonResponse }
    });
  } 

  const onLoginSubmit = (data) => {
    history.push({
      pathname: "/home",
      state: { detail: jsonResponse }
    });
  } 
  
  const getToken = () => {
    const url = `${BASE_URL}/get_token?code=${externalProps.code}`;

    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json().then((json) => {
      updateData(json.data);
      console.log(json.data);
      if(json.status_code === 400) {
        window.location.href = BASE_URL;
      }
    }))
  }
  useEffect(() => {
    getToken();
  },[]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="login container">      
      <form className="login-container center-login vertical-center" onSubmit={handleSubmit(onSubmit)}>  
        <h2>
          Login
        </h2>
        <input name="username"  placeholder="Enter your name" ref={register({required: true})} />
        {errors.username && <span style={{color: "white"}}>Please enter a valid username</span>}
        <input type="password" name="password" placeholder="Password" autoComplete="current-password" ref={register({required: true})} />
        {errors.password && <span style={{color: "white"}}>Please enter a valid password</span>}    
        <Button type="submit" variant="outline-dark" style={{color: "white"}}>
          Submit
        </Button>
        <a className="login-ref" variant="primary" onClick={handleShow} style={{color: "white"}}>
          Sign up
        </a>

      </form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: "white"}}>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="signup">
            <form className="margin-10 flex-direction-column signup-container" onSubmit={handleSubmit(onLoginSubmit)}>  
              <input autoComplete="username" name="loginUsername" placeholder="Enter your name" ref={register({required: true})} />            
              {errors.loginUsername && <span style={{color: "white"}}>Please enter a valid username</span>}
              <input type="text" placeholder="Email" name="email" autoComplete="username" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
              {errors.email && <span>Please enter a valid Email Id</span>}
              <input type="password" name="loginPassword" placeholder="Password" autoComplete="current-password" ref={register({required: true})} />
              {errors.loginPassword && <span style={{color: "white"}}>Please enter valid password</span>}    
              <div className="flex-direction-row">
                <div className="margin-10">
                  <Button type="submit" variant="primary" style={{color: "white"}}>
                    Continue
                  </Button>
                </div>
                <div className="margin-10">
                  <Button variant="secondary" onClick={handleClose} style={{color: "white"}}>
                    Close
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
    
  )
}

export default App;