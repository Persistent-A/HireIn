import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {MdOutlineEdit} from "react-icons/md"
import {updateEmployer} from "../features/auth/authSlice"

const EmployerProfile = () => {    
  
  const [isEditForm, setEditForm] = useState(false)
  const [isProfile, setIsProfile] = useState(true)

  const { employer } = useSelector((state) => state.auth)
  const [userData, setUserData] = useState({...employer})

  const {age, gender, address} = userData
  const { apt, street, city, postal, province } = address

  const dispatch = useDispatch()

  const showEditForm = () => {
    setEditForm(true)
    setIsProfile(false)
  }

  const showProfile = () => {
    setEditForm(false)
    setIsProfile(true)
  }

  const OnChange = (e) => {
    if(e.target.name === 'gender' || e.target.name === 'age'){
      setUserData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }else {
    setUserData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [e.target.name]: e.target.value
      } 
    }))}
  }

  const updateProfile = (e) => {
    e.preventDefault()
    const userData = {
      age, 
      gender,
      address
    }
    dispatch(updateEmployer(userData))
    showProfile()
  }
  return (
    <div>
      {isProfile &&
        <div className="employer-profile">
          <p>{employer.first_name} {employer.last_name}</p><br/>
          <p>{employer.phone}</p><br/>
          <p>{employer.email}</p><br/>
          {employer.address &&
            <div>
              Address:
              <p>{employer.address.apt} - {employer.address.street} <br/>
              {employer.address.city}, {employer.address.postal} <br/>
              {employer.address.province}</p>
            </div>
          }
          <br/><p>Age: {employer.age}</p>
          <br/><p>Gender: {employer.gender}</p>
          <br/><button onClick={showEditForm}> Edit your Profile <MdOutlineEdit /></button>
        </div>
      }
      {
      isEditForm &&
      <div> 
        <form onSubmit={updateProfile} className="update-form">
          <div> Age:<input name="age" value={age} placeholder="Age" type="number" onChange={OnChange}/></div>
          <br/>Gender: <input name="gender" value={gender} placeholder="Gender" onChange={OnChange}/>
          {<div>
              Address:<br/>
              <input name="apt" value={apt} placeholder="Apartment"onChange={OnChange} required/>
              <input name="street" value={street} placeholder="Street" onChange={OnChange} required/><br/>
              <input name="city" value={city} placeholder="City" onChange={OnChange} required/>
              <input name="postal" value={postal} placeholder="Postal Code"onChange={OnChange} required/><br/>
              <input name="province" value={province}  placeholder="Province" onChange={OnChange} required/><br/>
            </div>
          }
          <input type="submit" value="Update Profile" />
        </form>
        <button onClick={showProfile}>View Profile</button>
      </div>
      }
    </div>
    
  )
}

export default EmployerProfile
