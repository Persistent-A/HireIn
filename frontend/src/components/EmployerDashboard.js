import "../Styles/employerDashboard.css"
import { useSelector } from "react-redux"
import EmployerProfile from "./EmployerProfile"

const EmployerDashboard = () => {

    // const { employee, employer, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    console.log(employer)
  
    return (
    <div className="employer-dashboard">
        <div>
            <p>Welcome</p>
            <button>Account</button>
            <button>Search Services</button>
            <button>Logout</button>
        </div>

        <div>
            <EmployerProfile />
        </div>
      
    </div>
  )
}

export default EmployerDashboard
