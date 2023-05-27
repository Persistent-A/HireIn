import "../Styles/employerDashboard.css"
import { useSelector, useDispatch } from "react-redux"
import EmployeeProfile from "./EmployeeProfile"
import EmployeeAppointments from "./EmployeeAppointments"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { reset, logout } from "../features/auth/authSlice"
import axios from 'axios'

const EmployeeDashboard = () => {
    const { employee, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const [services, setServices] = useState()

    const navigate = useNavigate()
    const dispatch = useDispatch()  


    // dispatch(logout())  

    const Logout = () => {
        dispatch(logout())  
        dispatch(reset())
        navigate('/employee-register')
    }
    
    useEffect(() => {      
        const getServices = async() => {
            const response = await axios.get('/admin/get-services/')
            setServices(response.data)
        }
        getServices()

        if(isError){
          console.log(message)
        }
    
        if(!employee) {
          navigate('/employee-register')
        }
    
        return () => {
          dispatch(reset())
        }
      }, [navigate, employee, message, isError, isSuccess, dispatch])

      if(isLoading) {
        <h1>loading......</h1>
      }
  return (
    <div className="employer-dashboard">
        <div>
            <p>Welcome {employee ? employee.first_name : ""}</p>
            <Link to="/employee-dashboard/account/">Account</Link>
            <Link to="/employee-dashboard/appointments/">Appoointments</Link>
            <button onClick={Logout}>Logout</button>
        </div>

        <div className="employer-dashboard-extention">
          <Routes>
            <Route path="/account/" element={<EmployeeProfile services={services}/>}/>
            <Route path="/appointments/*" element={<EmployeeAppointments/>}/>
          </Routes>
        </div>
      
    </div>
  )
}

export default EmployeeDashboard
