import "../Styles/registerLogin.css"

import { useState } from "react"
import { useEffect } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EmployeeRegisterForm from "./EmployeeRegisterForm"
import EmployeeLoginForm from "./EmployeeLoginForm"
import { reset } from '../features/auth/authSlice'
import ForgotPassword from "./ForgotPassword"

const EmployerRegister = () => {

  const [isSignIn, setSignInToggle] = useState(false)
  const [isSignUp, setSignUpToggle] = useState(false)
  const [isForgotPassword, setForgotPassword] = useState(false)

  const showSignUpForm = (e) => {
    e.preventDefault()
    setSignUpToggle(true)
    setSignInToggle(false)
    setForgotPassword(false)
  }

  const showSignInForm = (e) => {
    e.preventDefault()
    setSignUpToggle(false)
    setSignInToggle(true)
    setForgotPassword(false)
  }

  const showForgotPassword = (e) => {
    e.preventDefault()
    setSignUpToggle(false)
    setSignInToggle(false)
    setForgotPassword(true)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { employee, isLoading, isSuccess, isError, message } = useSelector( (state) => state.auth )

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if(employee) {
      navigate('/employer-dashboard')
    }

    dispatch(reset())
  }, [isError, isSuccess, message, employee, navigate, dispatch])

  if(isLoading) {
    return <h1>Loading</h1>
  }

  return (
    <div className="register-signup">
      <div className="employer-feedback">
        <p>Employer Feedback</p>
        <div>
        orem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was popularised in the 
        1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more 
        recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </div>
      <div className="register-signup-selection">
        <div>
            <p>HireIn</p>
            <p>Earn on your prowess</p>
        </div>
        { !isSignIn && !isSignUp && !isForgotPassword &&
          <div className="signup">
            <button onClick={showSignUpForm}>SignUp</button>
            <button onClick={showSignInForm}>SignIn</button>
          </div>
        }
        { isSignUp && <EmployeeRegisterForm/>}
        { isSignIn && <EmployeeLoginForm/>}
        { isForgotPassword && <ForgotPassword/>}
        <div>
          {(isSignIn || isSignUp) && <p>or</p>}
          { isSignIn && <button className="additional-form-togglers" onClick={showSignUpForm}>SignUp</button>}
          { (isSignUp || isForgotPassword) && <button className="additional-form-togglers" onClick={showSignInForm}>SignIn</button>}
        </div>
        {isSignIn && <button onClick={showForgotPassword}>forgot password?</button>}
        <p>By Signing up, you agree to our Terms and Conditions.</p>
      </div>
    </div>
  )
}

export default EmployerRegister
