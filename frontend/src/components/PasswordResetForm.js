import "../Styles/newPasswordLink.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PasswordResetForm() {
  const { token } = useParams();
  const [message, setMessage] = useState("");

  const [passwordObject, setPasswordObject] = useState({
    new_password: "",
    confirm_password: "",
  });

  const { new_password, confirm_password } = passwordObject;

  const onChange = (e) => {
    setPasswordObject((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordObject.new_password === passwordObject.confirm_password) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const password = {
        password: passwordObject.new_password,
      };
      await axios
        .put("/forgot-pass/reset-password/", password, config)
        .then((response) => {
          setMessage(response.data.message);
          setPasswordObject({
            new_password: "",
            confirm_password: "",
          });
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reset-form">
      {message && (
        <div className="alert alert-primary">
          <span>{message}</span>
          <button
            onClick={() => setMessage("")}
            className="btn btn-danger mx-4"
          >
            X
          </button>
        </div>
      )}
      <h2>Password Reset</h2>
      <label>
        New Password:
        <input
          type="password"
          name="new_password"
          value={new_password}
          onChange={onChange}
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          name="confirm_password"
          value={confirm_password}
          onChange={onChange}
        />
      </label>
      <button type="submit">Reset Password</button>
    </form>
  );
}

export default PasswordResetForm;
