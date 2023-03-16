import { useState } from "react"
import { useDispatch } from 'react-redux'
import { loginEmployee } from "../features/auth/authSlice"

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData
  const dispatch = useDispatch()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    })
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(loginEmployee(userData))
  }

  return (
    <form className="login-form" onSubmit={onSubmit}>
        <p>SignIn</p>
        <input type="email" value={email} name="email" onChange={onChange} placeholder="Email" required/>
        <input type="password" value={password} name="password" onChange={onChange} placeholder="Password" required/>
        <input type="submit" value="SignIn" />
    </form>
  )
}

export default LoginForm
