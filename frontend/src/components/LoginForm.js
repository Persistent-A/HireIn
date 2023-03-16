const LoginForm = () => {
  return (
    <form className="login-form">
        <p>SignIn</p>
        <input type="email" placeholder="Email" required/>
        <input type="password" placeholder="Password" required/>
        <input type="submit" value="SignIn" />
    </form>
  )
}

export default LoginForm
