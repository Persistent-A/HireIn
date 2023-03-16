import "../Styles/registerLogin.css"

import { useState } from "react"
import { useEffect } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EmployeeRegisterForm from "./EmployeeRegisterForm"
import EmployeeLoginForm from "./EmployeeLoginForm"
import { reset } from '../features/auth/authSlice'

const EmployerRegister = () => {

  const [isSignIn, setSignInToggle] = useState(false)
  const [isSignUp, setSignUpToggle] = useState(false)

  const showSignUpForm = (e) => {
    e.preventDefault()
    setSignUpToggle(true)
    setSignInToggle(false)
  }

  const showSignInForm = (e) => {
    e.preventDefault()
    setSignUpToggle(false)
    setSignInToggle(true)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isSuccess, isError, message } = useSelector( (state) => state.auth )

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if(isSuccess || user) {
      navigate('/employer-register')
    }

    dispatch(reset())
  }, [isError, isSuccess, message, user, navigate, dispatch])

  if(isLoading) {
    return <h1>Loading</h1>
  }

  return (
    <div className="register-signup" style={{backgroundColor: "red"}}>
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
        { !isSignIn && !isSignUp &&
          <div>
            <button onClick={showSignUpForm}>SignUp</button>
            <button onClick={showSignInForm}>SignIn</button>
          </div>
        }
        { isSignUp && <EmployeeRegisterForm style={{backgroundColor: "red"}}/>}
        { isSignIn && <EmployeeLoginForm/>}
        <div>
          {(isSignIn || isSignUp) && <p>or</p>}
          { isSignIn && <button className="additional-form-togglers" onClick={showSignUpForm}>SignUp</button>}
          { isSignUp && <button className="additional-form-togglers" onClick={showSignInForm}>SignIn</button>}
        </div>
        <p>By Signing up, you agree to our Terms and Conditions.</p>
      </div>
    </div>
  )
}

export default EmployerRegister
