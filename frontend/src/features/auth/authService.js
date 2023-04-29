import axios from "axios"

const EMPLOYER_REGISTER_URI = '/employers/register'
const EMPLOYER_LOGIN_URI = '/employers/login'
const EMPLOYER_UPDATE_URI = '/employers/update'

const EMPLOYEE_REGISTER_URI = '/employees/register'
const EMPLOYEE_LOGIN_URI = '/employees/login'
const EMPLOYEE_UPDATE_URI = '/employees/update'

const ADMIN_LOGIN_URI = '/admin/login'

const SEND_PASS_LINK = '/forgot-pass/send-reset-pass-link'

const registerEmployer = async(userData) => {
    const response = await axios.post(EMPLOYER_REGISTER_URI, userData)

    if (response.data) {
        localStorage.setItem('employer', JSON.stringify(response.data))
    }

    return response.data
}

const loginEmployer = async(userData) => {
    const response = await axios.post(EMPLOYER_LOGIN_URI, userData)

    if(response.data) {
        localStorage.setItem('employer', JSON.stringify(response.data))
        localStorage.removeItem('employee')
        localStorage.removeItem('admin')
    }

    return response.data
}

const updateEmployer = async(userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(EMPLOYER_UPDATE_URI, userData, config)
    if(response.data) {
        localStorage.setItem('employer', JSON.stringify(response.data))
    }
    return response.data
}

const registerEmployee = async(userData) => {
    const response = await axios.post(EMPLOYEE_REGISTER_URI, userData)

    if (response.data) {
        localStorage.setItem('employee', JSON.stringify(response.data))
    }

    return response.data
}

const loginEmployee = async(userData) => {
    const response = await axios.post(EMPLOYEE_LOGIN_URI, userData)

    if(response.data) {
        localStorage.setItem('employee', JSON.stringify(response.data))
        localStorage.removeItem('employer')
        localStorage.removeItem('admin')
    }

    return response.data
}

const updateEmployee = async(userData, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(EMPLOYEE_UPDATE_URI, userData, config)
    if(response.data) {
        localStorage.setItem('employee', JSON.stringify(response.data))
    }
    return response.data
}

const searchEmployee = async(searchParams) => {
    const specialization = searchParams.specialization
    console.log(specialization)
    const response = await axios.get(`/employers/search/employee/${specialization}`)
    return response.data
}

const searchIndividualEmployee = async(employeeId) => {
    const response = await axios.get("/employee/display_individual_employee/" + employeeId)
    console.log(response.data)
    return response.data
}

const loginAdmin = async(userData) => {
    console.log(userData)
    const response = await axios.post(ADMIN_LOGIN_URI, userData)

    if(response.data) {
        localStorage.setItem('admin', JSON.stringify(response.data))
        localStorage.removeItem('employee')
        localStorage.removeItem('employer')
    }
    return response.data
}

const logout = async() => {
    localStorage.removeItem('employee')
    localStorage.removeItem('employer')
}

const sendforgotPasswordLink = async(userData) => {
    const response = await axios.post(SEND_PASS_LINK, userData)
    return response.data
}


const authService = {
    registerEmployer, loginEmployer, updateEmployer, registerEmployee, loginEmployee, updateEmployee, searchEmployee, searchIndividualEmployee, loginAdmin, sendforgotPasswordLink, logout
}

export default authService