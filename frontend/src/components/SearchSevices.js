import { useState } from 'react'
import { MdSearch } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { searchEmployee } from '../features/auth/authSlice'
import axios from 'axios'
import ExpandedEmployee from './ExpandedEmployee'

const SearchSevices = () => {
    const [isEmployeeExpanded, setExpandEmployees] = useState(false)
    const [expandedEmployee, setExpandedEmployees] = useState()
    const dispatch = useDispatch()

    const { employee } = useSelector((state) => state.auth) 

    const[searchParams, setSearchParams] = useState({
        specialization: ''
    })

    const {specialization} = searchParams

    const onChange = (e) => {
        setSearchParams((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSearchEmployee = (e) => {
        e.preventDefault()
        const searchParams = {
            specialization
        }
        dispatch(searchEmployee(searchParams))
    }

    const toggleExpandEmployee = () => {
        setExpandEmployees(!isEmployeeExpanded)
    }

    const expandEmployee = async (emp) => {
       const searchIndividualEmployee = async(empId) => {
        const response = await axios.get("/employee/display_individual_employee/" + empId)
        console.log(response.data)

        setExpandedEmployees(response.data)
        
       }
       await searchIndividualEmployee(emp._id)
       toggleExpandEmployee()
    }

  return (
    <>
        {isEmployeeExpanded
        ? <ExpandedEmployee
        expandedEmployee={expandedEmployee}
        toggleExpandEmployee={toggleExpandEmployee}/>
        :
        <>
        <div>
          <select name='specialization' value={specialization} onChange={onChange}>
            <option value="">Select Specialization</option>
            <option value="Cleaning">Cleaning</option>
            <option value="House Keeping">House Keeping</option>
          </select>
          <button onClick={handleSearchEmployee}>
            <MdSearch/>
          </button>
        </div>
        <div>
            {employee && 
            employee.map((emp) => 
            <div key={emp._id}>
                <h4>{emp.first_name} {emp.last_name}</h4>
                <p>{emp.specialization}</p>
                <button onClick={()=>expandEmployee(employee)}>Book an Appointment</button> 
            </div>
            )}
        </div>
        </>}
    </>
  )
}

export default SearchSevices
