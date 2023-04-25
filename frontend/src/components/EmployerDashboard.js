import "../Styles/employerDashboard.css"
import { useSelector, useDispatch } from "react-redux"
import EmployerProfile from "./EmployerProfile"
import ServicesList from "./ServicesList"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { reset, logout } from "../features/auth/authSlice"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'

const EmployerDashboard = () => {

    const { employer, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const [services, setServices] = useState()

    const navigate = useNavigate()
    const dispatch = useDispatch()  


    // dispatch(logout())  

    const Logout = () => {
        dispatch(logout())  
        dispatch(reset())
        navigate('/employer-register')
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
    
        if(!employer) {
          navigate('/employer-register')
        }
    
        return () => {
          dispatch(reset())
        }
      }, [employer, navigate, message, isError, isSuccess, dispatch])

      if(isLoading) {
        <h1>loading......</h1>
      }
  
    return (
    <div className="employer-dashboard">
      <div>
          <p>Welcome {employer ? employer.first_name : ""}</p>
          <Link to='/employer-dashboard/account/'>Account</Link>
          <Link to="/employer-dashboard/search-services/">Search Services</Link>
          <button onClick={Logout}>Logout</button>
      </div>
      <div className="employer-dashboard-extention">
        <Routes>
          <Route path='/account/' element={<EmployerProfile/>}/>
          <Route path='/search-services/' element={<ServicesList services={services}/>} />
        </Routes>
      </div>  
    </div>
  )
}

export default EmployerDashboard
