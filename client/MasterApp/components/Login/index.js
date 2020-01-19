import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Modal } from 'react-bootstrap'
import SequantixLogo from '../../../assests/SqxBigHome.png';
import "./Login.scss";

const App = (props) => {  
  const { register, handleSubmit, watch, errors } = useForm()
  
  const onSubmit = (data) => {
    props.history.push("/home");
  } 
  const onLoginSubmit = (data) => {
    props.history.push("/home");
  } 

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