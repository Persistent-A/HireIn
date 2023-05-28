import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerEmployer } from "../features/auth/authSlice";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { first_name, last_name, email, phone, password } = formData;
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      first_name,
      last_name,
      email,
      phone,
      password,
    };

    dispatch(registerEmployer(userData));
  };

  return (
    <form className="register-form" onSubmit={onSubmit}>
      <p>SignUp</p>
      <input
        type="text"
        placeholder="First Name"
        name="first_name"
        value={first_name}
        onChange={onChange}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        name="last_name"
        value={last_name}
        onChange={onChange}
        required
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        name="phone"
        value={phone}
        onChange={onChange}
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={onChange}
        required
      />
      <input type="submit" value="Register" />
    </form>
  );
};

export default RegisterForm;
