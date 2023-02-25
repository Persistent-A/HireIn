import {auth, googleProvider} from "../config/Firebase"
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import { useState } from "react"
const Auth = () => {

    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");

    console.log(auth?.currentUser?.email)

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err){
            console.error(err)
        }
    }  
    
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (err){
            console.error(err)
        }
    } 
    
    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (err){
            console.error(err)
        }
    } 
    
  return (
    <div className="auth-container">
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)}></input>
      <input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)}></input>
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  )
}

export default Auth
