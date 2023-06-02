import "../Styles/registerLogin.css";

import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { reset } from "../features/auth/authSlice";
import ForgotPassword from "./ForgotPassword";

const EmployerRegister = () => {
  const [isSignIn, setSignInToggle] = useState(false);
  const [isSignUp, setSignUpToggle] = useState(false);
  const [isForgotPassword, setForgotPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employer, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!employer) {
      navigate("/employer-register");
    }

    if (isSuccess || employer?._id) {
      navigate("/employer-dashboard/account/");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, employer, navigate, dispatch]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  const showSignUpForm = (e) => {
    e.preventDefault();
    setSignUpToggle(true);
    setSignInToggle(false);
    setForgotPassword(false);
  };

  const showSignInForm = (e) => {
    e.preventDefault();
    setSignUpToggle(false);
    setSignInToggle(true);
    setForgotPassword(false);
  };

  const showForgotPassword = (e) => {
    e.preventDefault();
    setSignUpToggle(false);
    setSignInToggle(false);
    setForgotPassword(true);
  };

  return (
    <div className="register-signup employer-landing">
      <div className="register-signup-selection">
        <div>
          <p>HireIn</p>
          <p>Hire your way</p>
        </div>
        {!isSignIn && !isSignUp && !isForgotPassword && (
          <div>
            <button onClick={showSignUpForm}>SignUp</button>
            <button onClick={showSignInForm}>SignIn</button>
          </div>
        )}
        {isSignUp && <RegisterForm />}
        {isSignIn && <LoginForm />}
        {isForgotPassword && <ForgotPassword />}
        <div>
          {(isSignIn || isSignUp || isForgotPassword) && <p>or</p>}
          {isSignIn && (
            <button
              className="additional-form-togglers"
              onClick={showSignUpForm}
            >
              SignUp
            </button>
          )}
          {(isSignUp || isForgotPassword) && (
            <button
              className="additional-form-togglers"
              onClick={showSignInForm}
            >
              SignIn
            </button>
          )}
        </div>
        {isSignIn && (
          <button className="forgot-pass" onClick={showForgotPassword}>
            forgot password?
          </button>
        )}
        <p>By Signing up, you agree to our Terms and Conditions.</p>
      </div>
    </div>
  );
};

export default EmployerRegister;
