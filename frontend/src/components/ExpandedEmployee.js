import React from "react";
import "../Styles/expandedEmployee.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ExpandedEmployee = ({ expandedEmployee, toggleExpandEmployee }) => {
  const { employer } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    _id,
    first_name,
    last_name,
    specialization,
    age,
    phone,
    email,
    address,
  } = expandedEmployee;

  const goBack = () => {
    toggleExpandEmployee();
  };

  const bookAppointment = async () => {
    const userData = {
      employee_id: _id,
      employer_id: employer._id,
    };
    const response = await axios.post(
      "https://hire-in.vercel.app/employers/hire",
      userData
    );
    if (response.data.message) {
      alert(response.data.message);
      navigate("/employer-dashboard/appointments/");
    }
  };

  return (
    <div className="expanded-employee">
      <h4 className="employee-name">{`${first_name} ${last_name}`}</h4>
      <p className="employee-info">
        <strong>Age: </strong>
        {age}
      </p>
      <p className="employee-info">
        <strong>Phone: </strong>
        {phone}
      </p>
      <p className="employee-info">
        <strong>Email: </strong>
        {email}
      </p>
      <p className="employee-info">
        <strong>Specialization: </strong>
        {specialization}
      </p>
      <p className="employee-info">
        <strong>Address: </strong>
        {address.apt} - {address.street}, {address.city}, {address.postal},{" "}
        {address.province}
      </p>
      <div className="expanded-employee-buttons">
        <button onClick={goBack}>Go Back</button>
        <button onClick={bookAppointment}>Book an appointment</button>
      </div>
    </div>
  );
};

export default ExpandedEmployee;
