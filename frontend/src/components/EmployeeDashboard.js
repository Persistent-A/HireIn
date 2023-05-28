import "../Styles/employerDashboard.css";
import { useSelector, useDispatch } from "react-redux";
import EmployeeProfile from "./EmployeeProfile";
import EmployeeAppointments from "./EmployeeAppointments";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { reset, logout } from "../features/auth/authSlice";
import axios from "axios";

import { GrContactInfo } from "react-icons/gr";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdLogout } from "react-icons/md";

const EmployeeDashboard = () => {
  const { employee, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [services, setServices] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // dispatch(logout())

  const Logout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/employee-register");
  };

  useEffect(() => {
    const getServices = async () => {
      const response = await axios.get("/admin/get-services/");
      setServices(response.data);
    };
    getServices();

    if (isError) {
      console.log(message);
    }

    if (!employee) {
      navigate("/employee-register");
    }

    return () => {
      dispatch(reset());
    };
  }, [navigate, employee, message, isError, isSuccess, dispatch]);

  if (isLoading) {
    <h1>loading......</h1>;
  }
  return (
    <div className="employer-dashboard">
      <div className="employer-dashboard-content">
        <p>Welcome {employee ? employee.first_name : ""}</p>
        <div>
          <GrContactInfo />
          <Link
            to="/employee-dashboard/account/"
            className="employer-dashboard-link"
          >
            Account
          </Link>
        </div>
        <div>
          <AiOutlineSchedule />
          <Link
            to="/employee-dashboard/appointments/"
            className="employer-dashboard-link"
          >
            Appointments
          </Link>
        </div>
        <button onClick={Logout}>
          <MdLogout />
          Logout
        </button>
      </div>

      <div className="employer-dashboard-extention">
        <Routes>
          <Route
            path="/account/"
            element={<EmployeeProfile services={services} />}
          />
          <Route path="/appointments/*" element={<EmployeeAppointments />} />
        </Routes>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
