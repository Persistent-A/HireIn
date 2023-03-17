import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {MdOutlineEdit} from "react-icons/md"
import {updateEmployer} from "../features/auth/authSlice"

const EmployerProfile = () => {    
  
  const [isEditForm, setEditForm] = useState(false)
  const [isProfile, setIsProfile] = useState(true)

  const [profileData, setProfileData ] = useState({
    age: "",
    gender: "",
    apt: "",
    street: "",
    city: "",
    postal: "",
    province: ""
  })

  const {age, gender, apt, street, city, postal, province} = profileData
  const { employer } = useSelector((state) => state.auth)
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
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value]
    }))
  }

  const updateProfile = (e) => {
    e.preventDefault()
    const userData = {
      age: age, 
      gender: gender,
      address: {
      apt: apt, 
      street: street,
      city: city,
      postal: postal,
      province: province
      } 
    }

    dispatch(updateEmployer(userData))
  }
  return (
    <div>
      {isProfile &&
        <div className="employer-profile">
          <p>{employer.first_name} {employer.last_name}</p>
          <p>{employer.phone}</p>
          <p>{employer.email}</p>
          {!employer.address && <p> Complete your Profile <MdOutlineEdit onClick={showEditForm}/></p>}
        </div>
      }
      {
      isEditForm &&
      <div> 
        <form onSubmit={updateProfile}>
          {!employer.age && <input name="age" value={age} placeholder="Age" onChange={OnChange}/>}
          <input name="gender" value={gender} placeholder="Gender" onChange={OnChange}/>
          {<div>
              Address:
              <input name="apt" value={apt} placeholder="Apartment"onChange={OnChange} />
              <input name="street" value={street} placeholder="Street" onChange={OnChange}/>
              <input name="city" value={city} placeholder="City" onChange={OnChange}/>
              <input name="postal" value={postal} placeholder="Postal Code"onChange={OnChange} />
              <input name="province" value={province}  placeholder="Province" onChange={OnChange}/>
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
