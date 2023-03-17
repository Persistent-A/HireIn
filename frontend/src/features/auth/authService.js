import axios from "axios"

const EMPLOYER_REGISTER_URI = '/employers/register'
const EMPLOYER_LOGIN_URI = '/employers/login'

const EMPLOYEE_REGISTER_URI = '/employees/register'
const EMPLOYEE_LOGIN_URI = '/employees/login'

const SEND_PASS_LINK = 

const registerEmployer = async(userData) => {
    console.log(userData)
    const response = await axios.post(EMPLOYER_REGISTER_URI, userData)

    if (response.data) {
        localStorage.setItem('employee', JSON.stringify(response.data))
    }

    return response.data
}

const loginEmployer = async(userData) => {
    const response = await axios.post(EMPLOYER_LOGIN_URI, userData)

    if(response.data) {
        localStorage.setItem('employee', JSON.stringify(response.data))
    }

    return response.data
}

const registerEmployee = async(userData) => {
    console.log(userData)
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
    }

    return response.data
}

const sendforgotPasswordLink = async(userData) => {
    const response = await axios.post(EMPLOYEE_LOGIN_URI, userData)
}


const authService = {
    registerEmployer, loginEmployer, registerEmployee, loginEmployee, sendforgotPasswordLink
}

export default authService