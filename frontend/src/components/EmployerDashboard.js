import "../Styles/employerDashboard.css"
import { useSelector, useDispatch } from "react-redux"
import EmployerProfile from "./EmployerProfile"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { reset, logout } from "../features/auth/authSlice"

const EmployerDashboard = () => {


    const { employer, employee, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const user = employer ?  employer : employee

    const navigate = useNavigate()
    const dispatch = useDispatch() 
    
    // dispatch(logout())   

    const Logout = () => {
        dispatch(logout())  
        dispatch(reset())
        navigate('/employee-register')
    }


    useEffect( () => {
        if(isError){
          console.log(message)
        }
    
        if(!employer && !employee) {
          navigate('/employee-register')
        }
    
        return () => {
          dispatch(reset())
        }
      }, [employer, navigate, employee, message, isError, isSuccess, dispatch])

      if(isLoading) {
        <h1>loading......</h1>
      }
  
    return (
    <div className="employer-dashboard">
        <div>
            <p>Welcome {user ? user.first_name : ""}</p>
            <button>Account</button>
            {employer && <button>Search Services</button>}
            <button onClick={Logout}>Logout</button>
        </div>

        <div className="employer-dashboard-extention">
            <EmployerProfile />
        </div>
    </div>
  )
}

export default EmployerDashboard
