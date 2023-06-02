import React, { useState } from "react";
import axios from "axios";
import "../Styles/manageUsers.css";

const ManageUsers = ({ populateAlert }) => {
  const [email, setEmail] = useState("");
  const [user_type, setUser] = useState("");
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [userData, setUserData] = useState({});

  const searchUser = async (e) => {
    e.preventDefault();
    await axios
      .post("/admin/get-user", { user_type: user_type, email: email })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        populateAlert(error.response.data.message);
        console.log(error);
      });
  };

  const deleteUserAccount = async (userId) => {
    await axios
      .delete(`/admin/delete-user/${userId}`)
      .then((response) => populateAlert(response.data.message))
      .catch((error) => populateAlert(error));
  };
  return (
    <>
      <form onSubmit={searchUser} className="user-container">
        <div className="form-row">
          <label className="form-label">User Email:</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label className="form-label">User Type:</label>
          <div className="radio-group">
            <input
              type="radio"
              name="user_type"
              value="employee"
              id="employee"
              onChange={(e) => setUser(e.target.value)}
            />
            <label htmlFor="employee">Employee</label>
            <input
              type="radio"
              name="user_type"
              value="employer"
              id="employer"
              onChange={(e) => setUser(e.target.value)}
            />
            <label htmlFor="employer">Employer</label>
          </div>
        </div>
        <input type="submit" value="Search" className="btn-submit" />
      </form>
      {userData.first_name && (
        <div className="user-details">
          <div className="detail-row">
            <label className="detail-label">Name:</label>
            <div className="detail-value">
              {userData.first_name} {userData.last_name}
            </div>
          </div>
          <div className="detail-row">
            <label className="detail-label">Email:</label>
            <div className="detail-value">{userData.email}</div>
          </div>
          <div className="detail-row">
            <label className="detail-label">Phone:</label>
            <div className="detail-value">{userData.phone}</div>
          </div>
          <button onClick={() => setDeleteModal(true)} className="btn-delete">
            Delete Account
          </button>
          {showDeleteModal && (
            <form onSubmit={() => deleteUserAccount(userData._id)}>
              <p className="confirm-text">
                Are you sure you want to delete the account?
              </p>
              <div className="button-group">
                <button
                  onClick={() => setDeleteModal(false)}
                  className="btn-cancel"
                >
                  No
                </button>
                <input value="YES" type="submit" className="btn-yes" />
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default ManageUsers;
