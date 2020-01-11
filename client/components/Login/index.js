import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Link} from 'react-router-dom';

export default function App() {
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = (data) => {
  } 
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{flexDirection: 'column', flex: 1, display: 'flex'}}>
      <input name="username"  placeholder="Enter your name" ref={register({required: true})} />
      {errors.username && <span>Please enter a valid username</span>}
      <input type="text" placeholder="Email" name="email" autoComplete="username" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
      {errors.email && <span>Please enter a valid Email Id</span>}
      <input type="password" name="password" placeholder="Password" autoComplete="current-password" ref={register({required: true})} />
      {errors.password && <span>Please enter a valid password</span>}
      <Link to="/home">
      <input type="submit" />
      </Link>
      
      
    </form>
  )
}