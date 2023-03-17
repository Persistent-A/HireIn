import { useSelector } from "react-redux"

const EmployerProfile = () => {    
    const { employer, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
  return (
    <div className="employer-profile">
      <p>{employer.first_name}</p>
    </div>
  )
}

export default EmployerProfile
