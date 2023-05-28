import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineEdit } from "react-icons/md";
import { updateEmployee } from "../features/auth/authSlice";
import "../Styles/employeeProfile.css";

const EmployeeProfile = ({ services }) => {
  const [isEditForm, setEditForm] = useState(false);
  const [isProfile, setIsProfile] = useState(true);

  const { employee } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({ ...employee });

  const { age, gender, address, specialization } = userData;
  const { apt, street, city, postal, province } = address;

  const dispatch = useDispatch();

  const showEditForm = () => {
    setEditForm(true);
    setIsProfile(false);
  };

  const showProfile = () => {
    setEditForm(false);
    setIsProfile(true);
  };

  const OnChange = (e) => {
    if (
      e.target.name === "gender" ||
      e.target.name === "age" ||
      e.target.name === "specialization"
    ) {
      setUserData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    } else {
      setUserData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [e.target.name]: e.target.value,
        },
      }));
    }
  };

  const updateProfile = (e) => {
    e.preventDefault();
    const userData = {
      age,
      gender,
      address,
      specialization,
    };
    dispatch(updateEmployee(userData));
    showProfile();
  };
  return (
    <div className="profile-container">
      {isProfile && (
        <div className="profile-card">
          <h1>Account Information</h1>

          <div className="profile-section">
            <h3>Name</h3>
            <p>
              <strong>First Name: </strong>
              {employee.first_name}
            </p>
            <p>
              <strong>Last Name: </strong>
              {employee.last_name}
            </p>
          </div>

          <div className="profile-section">
            <h3>Contact Details</h3>
            <p>
              <strong>Phone: </strong>
              {employee.phone}
            </p>
            <p>
              <strong>Email: </strong>
              {employee.email}
            </p>
          </div>

          {employee.address && (
            <div className="profile-section">
              <h3>Address:</h3>
              <div className="profile-address">
                <p>
                  <span>
                    <strong>Apt:</strong>
                  </span>{" "}
                  {employee.address.apt} <br />
                  <span>
                    <strong>Street:</strong>
                  </span>{" "}
                  {employee.address.street} <br />
                  <span>
                    <strong>City:</strong>
                  </span>{" "}
                  {employee.address.city} <br />
                  <span>
                    <strong>Postal:</strong>
                  </span>{" "}
                  {employee.address.postal} <br />
                  <span>
                    <strong>Province:</strong>
                  </span>{" "}
                  {employee.address.province}
                </p>
              </div>
            </div>
          )}

          <div className="profile-section">
            <h3>Additional Information</h3>
            <p>
              <strong>Age: </strong>
              {employee.age}
            </p>
            <p>
              <strong>Gender: </strong>
              {employee.gender}
            </p>
            <p>
              <strong>Specialization: </strong>
              {employee.specialization}
            </p>
          </div>

          <button className="edit-profile-button" onClick={showEditForm}>
            Edit your Profile <MdOutlineEdit />
          </button>
        </div>
      )}
      {isEditForm && (
        <div className="edit-profile-form">
          <form onSubmit={updateProfile} className="update-form">
            <div className="form-field">
              Age:
              <br />
              <input
                className="form-input"
                name="age"
                value={age}
                placeholder="Age"
                type="number"
                onChange={OnChange}
              />
            </div>
            <div className="form-field">
              Gender: <br />
              <input
                className="form-input"
                name="gender"
                value={gender}
                placeholder="Gender"
                onChange={OnChange}
              />
            </div>
            <div className="form-field">
              Address: <br />
              <input
                className="form-input"
                name="apt"
                value={apt}
                placeholder="Apartment"
                onChange={OnChange}
                required
              />
              <input
                className="form-input"
                name="street"
                value={street}
                placeholder="Street"
                onChange={OnChange}
                required
              />
              <br />
              <input
                className="form-input"
                name="city"
                value={city}
                placeholder="City"
                onChange={OnChange}
                required
              />
              <input
                className="form-input"
                name="postal"
                value={postal}
                placeholder="Postal Code"
                onChange={OnChange}
                required
              />
              <br />
              <input
                className="form-input"
                name="province"
                value={province}
                placeholder="Province"
                onChange={OnChange}
                required
              />
              <br />
            </div>
            <div className="form-field">
              Service:
              <br />
              <select
                className="form-select"
                value={specialization}
                name="specialization"
                onChange={OnChange}
              >
                {services.map((service) => (
                  <option key={service._id} value={service.service_name}>
                    {service.service_name}
                  </option>
                ))}
              </select>
            </div>
            <input
              className="form-submit"
              type="submit"
              value="Update Profile"
            />
            <button className="form-button" onClick={showProfile}>
              View Profile
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;
