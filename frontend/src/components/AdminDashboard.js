import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { logout, reset } from "../features/auth/authSlice";
// import { useNavigate, useSearchParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { MdHomeRepairService } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import { AiOutlineSchedule } from "react-icons/ai";
import AddService from "./AddService";
import ManageUsers from "./ManageUsers";
import Inquiries from "./Inquiries";

const AdminDashboard = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setIsAlert] = useState(false);

  const populateAlert = (message) => {
    setAlertMessage(message);
    setIsAlert(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admin } = useSelector((state) => state.auth);

  const Logout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  useEffect(() => {
    if (!admin) {
      navigate("/admin");
    }
  }, [admin, navigate]);

  return (
    <div className="employer-dashboard">
      <div className="employer-dashboard-content">
        <p>Welcome {admin ? admin.first_name : ""}</p>
        <div>
          <GrContactInfo />
          <Link
            to="/admin-dashboard/inquiries/"
            className="employer-dashboard-link"
          >
            Inquiries
          </Link>
        </div>
        <div>
          <MdHomeRepairService />
          <Link
            to="/admin-dashboard/services/"
            className="employer-dashboard-link"
          >
            Services
          </Link>
        </div>
        <div>
          <AiOutlineSchedule />
          <Link
            to="/admin-dashboard/users/"
            className="employer-dashboard-link"
          >
            Manage Users
          </Link>
        </div>
        <button onClick={Logout}>Logout</button>
      </div>
      <div className="employer-dashboard-extention">
        {showAlert && (
          <div
            className="alert alert-warning alert-dismissible fade show d-flex justify-content-between alert-container"
            role="alert"
          >
            <p>
              <strong>Alert: </strong> {alertMessage}
            </p>
            <button
              type="button"
              className="close btn btn-danger"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => setIsAlert(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <Routes>
          <Route
            path="/inquiries/*"
            element={<Inquiries populateAlert={populateAlert} />}
          />
          <Route
            path="/services/*"
            element={<AddService populateAlert={populateAlert} />}
          />
          <Route
            path="/users/*"
            element={<ManageUsers populateAlert={populateAlert} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
