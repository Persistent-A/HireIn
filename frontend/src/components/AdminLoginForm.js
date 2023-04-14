import '../Styles/adminLoginForm.css'
import React, { useEffect, useState } from 'react';
import { loginAdmin, logout, reset } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminLoginForm = () => {
    const { admin } = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        user_id: '',
        password: ''
    });

    const {user_id, password} = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const onChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value 
        }))
    }

    useEffect(() => {
        if(admin){
            navigate('/admin-dashboard')
        }
    }, [admin, navigate])
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const userData = {
        user_id,
        password
      }
      dispatch(loginAdmin(userData))
    }

  return ( 
      <form onSubmit={handleSubmit} className='admin-form'>
        <h2>Login</h2>
        <label>
          Username:
          <input type="text" name="user_id" value={user_id} onChange={onChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={onChange} />
        </label>
        <br />
        <input type="submit" value="Login" />
      </form>
  );
};

export default AdminLoginForm
