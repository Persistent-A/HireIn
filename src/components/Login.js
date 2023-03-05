import "../Styles/login.css"

const Login = () => {
  return (
    <div className="loginform">
        <p>Login</p>
        <form className="form-container">
            <div>
                <label>Username</label>
                <input type="text"></input>
            </div>
            <div>
                <label>Password</label>
                <input type="text"></input>
            </div>
            <button>Login</button>
            

        </form>
        
      
    </div>
  )
}

export default Login
