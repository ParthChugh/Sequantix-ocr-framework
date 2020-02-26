import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Modal } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { BASE_URL} from '../../../constants';
import SequantixLogo from '../../../assests/SqxBigHome.png';
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
        window.location.href = 'https://accounts.zoho.in/oauth/v2/auth?scope=ZohoExpense.fullaccess.ALL&client_id=1000.QG6M2A0EEQC3P47F79GK60J14O0E1V&response_type=code&access_type=offline&redirect_uri=http://http://13.65.252.202';
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
    <div className="login">
      <div className="logo-header"> 
        <img src={ SequantixLogo } />
      </div>
      
      <form className="login-container center-login" onSubmit={handleSubmit(onSubmit)}>  
        <h2>
          Login
        </h2>
        <input name="username"  placeholder="Enter your name" ref={register({required: true})} />
        {errors.username && <span>Please enter a valid username</span>}
        <input type="password" name="password" placeholder="Password" autoComplete="current-password" ref={register({required: true})} />
        {errors.password && <span>Please enter a valid password</span>}    
        <Button type="submit" variant="outline-dark" >
          Submit
        </Button>
        <a className="login-ref" variant="primary" onClick={handleShow}>
          Sign up
        </a>
      </form>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="signup">
            <form className="margin-10 flex-direction-column signup-container" onSubmit={handleSubmit(onLoginSubmit)}>  
              <input autoComplete="username" name="loginUsername" placeholder="Enter your name" ref={register({required: true})} />            
              {errors.loginUsername && <span>Please enter a valid username</span>}
              <input type="text" placeholder="Email" name="email" autoComplete="username" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
              {errors.email && <span>Please enter a valid Email Id</span>}
              <input type="password" name="loginPassword" placeholder="Password" autoComplete="current-password" ref={register({required: true})} />
              {errors.loginPassword && <span>Please enter valid password</span>}    
              <div className="flex-direction-row">
                <div className="margin-10">
                  <Button type="submit" variant="primary" >
                    Continue
                  </Button>
                </div>
                <div className="margin-10">
                  <Button variant="secondary" onClick={handleClose}>
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