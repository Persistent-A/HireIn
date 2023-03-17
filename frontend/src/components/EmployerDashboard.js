import "../Styles/employerDashboard.css"
import { useSelector, useDispatch } from "react-redux"
import EmployerProfile from "./EmployerProfile"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { reset, logout } from "../features/auth/authSlice"

const EmployerDashboard = () => {

    const { employer, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const Logout = () => {
        dispatch(logout())  
        dispatch(reset())
        navigate('/')
    }


    useEffect( () => {
        if(isError){
          console.log(message)
        }
    
        if(!employer) {
          navigate('/')
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
            <p>Welcome {employer.first_name}</p>
            <button>Account</button>
            <button>Search Services</button>
            <button onClick={Logout}>Logout</button>
        </div>

        <div className="employer-dashboard-extention">
            <EmployerProfile />
        </div>
      
    </div>
  )
}

export default EmployerDashboard
