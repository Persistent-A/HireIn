import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { MdOutlineEdit } from "react-icons/md"
import { updateEmployee } from "../features/auth/authSlice"


const EmployeeProfile = ({services}) => {    

  const [isEditForm, setEditForm] = useState(false)
  const [isProfile, setIsProfile] = useState(true)

  const { employee } = useSelector((state) => state.auth)
  const [userData, setUserData] = useState({...employee})

  const {age, gender, address, specialization} = userData
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
    if(e.target.name === 'gender' || e.target.name === 'age' || e.target.name === 'specialization'){
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
      address,
      specialization,
    }
    dispatch(updateEmployee(userData))
    showProfile()
  }
  return (
    <div >
      {isProfile &&
        <div className="employer-profile">
          <p>{employee.first_name} {employee.last_name}</p><br/>
          <p>{employee.phone}</p><br/>
          <p>{employee.email}</p><br/>
          {employee.address &&
            <div>
              Address:
              <p>{employee.address.apt} - {employee.address.street} <br/>
              {employee.address.city}, {employee.address.postal} <br/>
              {employee.address.province}</p>
            </div>
          }
          <br/><p>Age: {employee.age}</p>
          <br/><p>Gender: {employee.gender}</p>
          <br/><p>specialization: {employee.specialization}</p>
          <br/><button onClick={showEditForm}> Edit your Profile <MdOutlineEdit /></button>
        </div>
      }
      {
      isEditForm &&
      <div> 
        <form onSubmit={updateProfile} className="update-form">
            <div> Age:<input name="age" value={age} placeholder="Age" type="number" onChange={OnChange}/></div>
            <br/>Gender: <input name="gender" value={gender} placeholder="Gender" onChange={OnChange}/>
            <div>
                Address:<br/>
                <input name="apt" value={apt} placeholder="Apartment"onChange={OnChange} required/>
                <input name="street" value={street} placeholder="Street" onChange={OnChange} required/><br/>
                <input name="city" value={city} placeholder="City" onChange={OnChange} required/>
                <input name="postal" value={postal} placeholder="Postal Code"onChange={OnChange} required/><br/>
                <input name="province" value={province}  placeholder="Province" onChange={OnChange} required/><br/>
            </div>
            <div>
                Service:<br/>
                <select value={specialization} name='specialization' onChange={OnChange}>
                    {services.map((service) => 
                        <option key={service._id} value={service.service_name}>{service.service_name}</option>
                    )}
                </select>
            </div>
            <input type="submit" value="Update Profile" />
        </form>
        <button onClick={showProfile}>View Profile</button>
      </div>
      }
    </div>
    
  )
}

export default EmployeeProfile
