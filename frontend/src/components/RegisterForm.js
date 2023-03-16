const RegisterForm = () => {
  return (
    <form className="register-form">
      <p>SignUp</p>
      <input type="text" placeholder="First Name" required/>
      <input type="text" placeholder="Last Name" required/>
      <input type="email" placeholder="Email" required/>
      <input type="text" placeholder="Phone Number" required/>
      <input type="password" placeholder="Password" required/>
      <input type="submit" value="Register" />
    </form>
  )
}

export default RegisterForm
