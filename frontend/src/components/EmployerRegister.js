import "../Styles/registerLogin.css"

import {useState} from "react"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"

const EmployerRegister = () => {

  const [isSignIn, setSignInToggle] = useState(false)
  const [isSignUp, setSignUpToggle] = useState(false)

  const showSignUpForm = () => {
    setSignUpToggle(true)
    setSignInToggle(false)
  }

  const showSignInForm = () => {
    setSignUpToggle(false)
    setSignInToggle(true)
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
        { !isSignIn && !isSignUp &&
          <div>
            <button onClick={showSignUpForm}>SignUp</button>
            <button onClick={showSignInForm}>SignIn</button>
          </div>
        }
        { isSignUp && <RegisterForm/>}
        { isSignIn && <LoginForm/>}
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
