// import path from 'path'
import '../Styles/newPasswordLink.css'
import {useState} from 'react'
// import { useDispatch } from "react-redux"
import { useParams } from 'react-router-dom'
import axios, {Axios} from 'axios'

function PasswordResetForm() {
  const { token } = useParams()

  const [passwordObject, setPasswordObject] = useState({
    new_password: "",
    confirm_password: ""
  })

  const {new_password, confirm_password} = passwordObject

  const onChange = (e) => {
    setPasswordObject((prevState)=>({
      ...prevState, 
      [e.target.name]: e.target.value
    }))
  }

  // const dispatch = useDispatch()

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(passwordObject.new_password === passwordObject.confirm_password) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const password = {
        password: passwordObject.new_password
      }
      const response = await axios.put('http://localhost:5005/forgot-pass/reset-password/', password, config)
      console.log(response.data)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Password Reset</h2>
      <label>
        New Password:
        <input type="password" name="new_password" value={new_password} onChange={onChange} />
      </label>
      <label>
        Confirm Password:
        <input type="password" name="confirm_password" value={confirm_password} onChange={onChange} />
      </label>
      <button type="submit">Reset Password</button>
    </form>
  );
}

export default PasswordResetForm;



