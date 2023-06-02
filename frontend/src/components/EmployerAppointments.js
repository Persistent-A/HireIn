import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const EmployerAppointments = () => {
  const { employer } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const getAppointments = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${employer.token}`,
        },
      };
      const response = await axios.get("/employers/get-appointment/", config);
      console.log(response.data);
      setAppointments(response.data);
      console.log(appointments);
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
                  {appointment.employee.first_name}{" "}
                  {appointment.employee.last_name}
                </h4>
                <p>{appointment.employee.specialization}</p>
              </div>
              <div className="employer-appointment-cardBody">
                <p className="employer-appointment-cardBodyText">
                  Age: {appointment.employee.age}
                </p>
                <p className="employer-appointment-cardBodyText">
                  Gender: {appointment.employee.gender}
                </p>
                <p className="employer-appointment-cardBodyText">
                  Email: {appointment.employee.email}
                </p>
                <p className="employer-appointment-cardBodyText">
                  Phone: {appointment.employee.phone}
                </p>
                <p className="employer-appointment-cardBodyText">
                  Address: {appointment.employee.address.apt}{" "}
                  {appointment.employee.address.street},{" "}
                  {appointment.employee.address.city}{" "}
                  {appointment.employee.address.postal}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>No appointments</div>
        )}
      </div>
    </>
  );
};

export default EmployerAppointments;
