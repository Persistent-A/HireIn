import { useDispatch } from "react-redux"
import {logout, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const Logout = () => {
        dispatch(logout())  
        dispatch(reset())
        navigate('/admin')
    }
  return (
    <div>
      welcome
      <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default AdminDashboard
