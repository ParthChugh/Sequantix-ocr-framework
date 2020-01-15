import React from 'react'
import { useForm } from 'react-hook-form'
import {Button} from 'react-bootstrap'
import "./login.scss"

const App = (props) => {  
  const { register, handleSubmit, watch, errors } = useForm()
  
  const onSubmit = (data) => {
    props.history.push("/home");
  } 

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
    </div>
    
  )
}

export default App;