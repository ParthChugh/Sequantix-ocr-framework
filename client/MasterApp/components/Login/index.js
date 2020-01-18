import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Modal } from 'react-bootstrap'
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
      <h2>
        Sign Up
      </h2>
      <form className="login-container" onSubmit={handleSubmit(onSubmit)}>  
        <input name="username"  placeholder="Enter your name" ref={register({required: true})} />
        {errors.username && <span>Please enter a valid username</span>}
        <input type="text" placeholder="Email" name="email" autoComplete="username" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
        {errors.email && <span>Please enter a valid Email Id</span>}
        <input type="password" name="password" placeholder="Password" autoComplete="current-password" ref={register({required: true})} />
        {errors.password && <span>Please enter a valid password</span>}    
        <Button type="submit" >
          Submit
        </Button>
      </form>
      <a className="login-ref" variant="primary" onClick={handleShow}>
        Login
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
          <div className="login">
            <form className="login-container login-modal margin-10" onSubmit={handleSubmit(onLoginSubmit)}>  
              <input autoComplete="username" name="loginUsername" placeholder="Enter your name" ref={register({required: true})} />            
              <input type="password" name="loginPassword" placeholder="Password" autoComplete="current-password" ref={register({required: true})} />
              {errors.loginUsername  && errors.loginPassword && <span>Please enter registerd username and password</span>}    
              <div className="margin-10">
                <Button type="submit" variant="primary" onClick={onLoginSubmit}>
                  Continue
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </div>
            </form>
          </div>
          
        
        
      </Modal>
    </div>
    
  )
}

export default App;