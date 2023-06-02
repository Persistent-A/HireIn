import "../Styles/registerLogin.css";

import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmployeeRegisterForm from "./EmployeeRegisterForm";
import EmployeeLoginForm from "./EmployeeLoginForm";
import { reset } from "../features/auth/authSlice";
import ForgotPassword from "./ForgotPassword";

const EmployerRegister = () => {
  const [isSignIn, setSignInToggle] = useState(false);
  const [isSignUp, setSignUpToggle] = useState(false);
  const [isForgotPassword, setForgotPassword] = useState(false);

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employee, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (employee) {
      navigate("/employee-dashboard/account/");
    }

    if (!employee) {
      navigate("/employee-register");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, employee, navigate, dispatch]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="register-signup employee-landing">
      <div className="register-signup-selection">
        <div>
          <p>HireIn</p>
          <p>Earn on your prowess</p>
        </div>
        {!isSignIn && !isSignUp && !isForgotPassword && (
          <div className="signup">
            <button onClick={showSignUpForm}>SignUp</button>
            <button onClick={showSignInForm}>SignIn</button>
          </div>
        )}
        {isSignUp && <EmployeeRegisterForm />}
        {isSignIn && <EmployeeLoginForm />}
        {isForgotPassword && <ForgotPassword />}
        <div>
          {(isSignIn || isSignUp) && <p>or</p>}
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
