import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineEdit } from "react-icons/md";
import { updateEmployer } from "../features/auth/authSlice";

import "../Styles/employeeProfile.css"

const EmployerProfile = () => {
  const [isEditForm, setEditForm] = useState(false);
  const [isProfile, setIsProfile] = useState(true);

  const { employer } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({ ...employer });

  const { age, gender, address } = userData;
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
    if (e.target.name === "gender" || e.target.name === "age") {
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
    };
    dispatch(updateEmployer(userData));
    showProfile();
  };
  return (
    <div>
      {isProfile && (
        <div className="profile-card">
          <h1>Account Information</h1>

          <div className="profile-section">
            <h3>Name</h3>
            <p>
              <strong>First Name: </strong>
              {employer.first_name}
            </p>
            <p>
              <strong>Last Name: </strong>
              {employer.last_name}
            </p>
          </div>

          <div className="profile-section">
            <h3>Contact Details</h3>
            <p>
              <strong>Phone: </strong>
              {employer.phone}
            </p>
            <p>
              <strong>Email: </strong>
              {employer.email}
            </p>
          </div>

          {employer.address && (
            <div className="profile-section">
              <h3>Address:</h3>
              <div className="profile-address">
                <p>
                  <span>
                    <strong>Apt:</strong>
                  </span>{" "}
                  {employer.address.apt} <br />
                  <span>
                    <strong>Street:</strong>
                  </span>{" "}
                  {employer.address.street} <br />
                  <span>
                    <strong>City:</strong>
                  </span>{" "}
                  {employer.address.city} <br />
                  <span>
                    <strong>Postal:</strong>
                  </span>{" "}
                  {employer.address.postal} <br />
                  <span>
                    <strong>Province:</strong>
                  </span>{" "}
                  {employer.address.province}
                </p>
              </div>
            </div>
          )}

          <div className="profile-section">
            <h3>Additional Information</h3>
            <p>
              <strong>Age: </strong>
              {employer.age}
            </p>
            <p>
              <strong>Gender: </strong>
              {employer.gender}
            </p>
            <p>
              <strong>Specialization: </strong>
              {employer.specialization}
            </p>
          </div>

          <button className="edit-profile-button" onClick={showEditForm}>
            Edit your Profile <MdOutlineEdit />
          </button>
        </div>
      )}
      {isEditForm && (
        <div>
          <form onSubmit={updateProfile} className="update-form">
            <div>
              {" "}
              Age:
              <input
                name="age"
                value={age}
                placeholder="Age"
                type="number"
                onChange={OnChange}
              />
            </div>
            <br />
            Gender:{" "}
            <input
              name="gender"
              value={gender}
              placeholder="Gender"
              onChange={OnChange}
            />
            {
              <div>
                Address:
                <br />
                <input
                  name="apt"
                  value={apt}
                  placeholder="Apartment"
                  onChange={OnChange}
                  required
                />
                <input
                  name="street"
                  value={street}
                  placeholder="Street"
                  onChange={OnChange}
                  required
                />
                <br />
                <input
                  name="city"
                  value={city}
                  placeholder="City"
                  onChange={OnChange}
                  required
                />
                <input
                  name="postal"
                  value={postal}
                  placeholder="Postal Code"
                  onChange={OnChange}
                  required
                />
                <br />
                <input
                  name="province"
                  value={province}
                  placeholder="Province"
                  onChange={OnChange}
                  required
                />
                <br />
              </div>
            }
            <input type="submit" value="Update Profile" />
            <button onClick={showProfile}>View Profile</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployerProfile;
