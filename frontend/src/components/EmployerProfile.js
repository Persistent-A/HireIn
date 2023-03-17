import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {MdOutlineEdit} from "react-icons/md"
import {updateEmployer, updateEmployee} from "../features/auth/authSlice"

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
  const { employer, employee } = useSelector((state) => state.auth)

  const user = employer ?  employer : employee
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
      [e.target.name]: e.target.value
    }))
  }

  const updateProfile = (e) => {
    e.preventDefault()
    const userData = {
      age, 
      gender,
      address: {
      apt, 
      street,
      city,
      postal,
      province
      } 
    }
    employer ? dispatch(updateEmployer(userData)) : dispatch(updateEmployee(userData))
    showProfile()
  }
  return (
    <div>
      {isProfile &&
        <div className="employer-profile">
          <p>{user.first_name} {user.last_name}</p>
          <p>{user.phone}</p>
          <p>{user.email}</p>
          {user.address &&
            <div>
              Address:
              <p>{user.address.apt}</p>
              <p>{user.address.street}</p>
              <p>{user.address.city}</p>
              <p>{user.address.postal}</p>
              <p>{user.address.province}</p>
            </div>
          }
          <p>{user.age}</p>
          <p>{user.gender}</p>
          <p> Edit your Profile <MdOutlineEdit onClick={showEditForm}/></p>
        </div>
      }
      {
      isEditForm &&
      <div> 
        <form onSubmit={updateProfile}>
          {!user.age && <input name="age" value={age} placeholder="Age" type="number" onChange={OnChange}/>}
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
