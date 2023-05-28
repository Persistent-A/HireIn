import "../Styles/employerDashboard.css";
import { useSelector, useDispatch } from "react-redux";
import EmployerProfile from "./EmployerProfile";
// import ServicesList from "./ServicesList"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { reset, logout } from "../features/auth/authSlice";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import SearchSevices from "./SearchSevices";
import EmployerAppointments from "./EmployerAppointments";

import { MdHomeRepairService } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import { AiOutlineSchedule } from "react-icons/ai";

const EmployerDashboard = () => {
  const { employer, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // dispatch(logout())

  const Logout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/employer-register");
  };

  useEffect(() => {
    const getServices = async () => {
      await axios
        .get("/admin/get-services/")
        .then((response) => setServices(response.data));
    };
    getServices();
    if (isError) {
      console.log(message);
    }

    if (!employer) {
      navigate("/employer-register");
    }

    return () => {
      dispatch(reset());
    };
  }, [employer, navigate, message, isError, isSuccess, dispatch]);

  if (isLoading) {
    <h1>loading......</h1>;
  }

  return (
    <div className="employer-dashboard">
      <div className="employer-dashboard-content">
        <p>Welcome {employer ? employer.first_name : ""}</p>
        <div>
          <GrContactInfo />
          <Link
            to="/employer-dashboard/account/"
            className="employer-dashboard-link"
          >
            Account
          </Link>
        </div>
        <div>
          <MdHomeRepairService />
          <Link
            to="/employer-dashboard/search-services/"
            className="employer-dashboard-link"
          >
            Search Services
          </Link>
        </div>
        <div>
          <AiOutlineSchedule />
          <Link
            to="/employer-dashboard/appointments/"
            className="employer-dashboard-link"
          >
            Appointments
          </Link>
        </div>
        <button onClick={Logout}>Logout</button>
      </div>
      <div className="employer-dashboard-extention">
        <Routes>
          <Route path="/account/" element={<EmployerProfile />} />
          <Route
            path="/search-services/*"
            element={<SearchSevices services={services} />}
          />
          <Route path="/appointments/*" element={<EmployerAppointments />} />
        </Routes>
      </div>
    </div>
  );
};

export default EmployerDashboard;
