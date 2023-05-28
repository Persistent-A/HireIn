import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
import { logout, reset } from "../features/auth/authSlice";
// import { useNavigate, useSearchParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { MdHomeRepairService } from 'react-icons/md'
import { GrContactInfo } from 'react-icons/gr'
import { AiOutlineSchedule } from 'react-icons/ai'
 import AddService from "./AddService";
import ManageUsers from "./ManageUsers";
import Inquiries from "./Inquiries";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const { admin } = useSelector((state) => state.auth);

  const Logout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/admin");
  };

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
        <Routes>
          <Route path="/inquiries/*" element={<Inquiries />} />
          <Route
              path="/services/*"
              element={<AddService />}
            />
          <Route path="/users/*" element={<ManageUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
