import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../Styles/employeeAppointment.css";

const EmployeeAppointments = () => {
  const { employee } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const getAppointments = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${employee.token}`,
        },
      };
      const response = await axios.get("/employees/get-appointments/", config);
      setAppointments(response.data);
    };
    getAppointments();
  }, []);

  return (
    <>
      <h2 className="employer-appointment-title">Appointments</h2>
      <div className="employer-appointment-container">
        {appointments ? (
          appointments.map((appointment) => (
            <div
              key={appointment.appointment_id}
              className="employer-appointment-card"
            >
              <div className="employer-appointment-cardHeader">
                <h4 className="employer-appointment-cardHeaderText">
                  {appointment.employer.first_name}{" "}
                  {appointment.employer.last_name}
                </h4>
              </div>
              <div className="employer-appointment-cardBody">
                <p className="employer-appointment-cardBodyText">
                  Age: {appointment.employer.age}
                </p>
                <p className="employer-appointment-cardBodyText">
                  Gender: {appointment.employer.gender}
                </p>
                <p className="employer-appointment-cardBodyText">
                  Email: {appointment.employer.email}
                </p>
                <p className="employer-appointment-cardBodyText">
                  Phone: {appointment.employer.phone}
                </p>
                <p className="employer-appointment-cardBodyText">
                  Address: {appointment.employer.address.apt}{" "}
                  {appointment.employer.address.street},{" "}
                  {appointment.employer.address.city}{" "}
                  {appointment.employer.address.postal}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-appointments">No appointments</div>
        )}
      </div>
    </>
  );
};

export default EmployeeAppointments;
