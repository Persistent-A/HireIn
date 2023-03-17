import { useState } from "react"
import { useDispatch } from "react-redux"
import { sendforgotPasswordLink } from "../features/auth/authSlice"

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email: email
        }

        dispatch(sendforgotPasswordLink(userData))
    }
  return (
    <form onSubmit={onSubmit}>
        <input type="email" placeholder="Enter Email" value={email} name="email" onChange={(e) => setEmail(e.currentTarget.value)} required/>
        <input type="submit" value="Send" />
    </form>
  )
}

export default ForgotPassword
