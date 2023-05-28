import { useDispatch } from "react-redux";
import { useState } from "react";
import ServiceDashboard from "./ServiceDashboard";
import "../Styles/adminDashboard.css";
import axios from "axios";

const AddService = () => {
     const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [services, setServices] = useState([]);
  const handleSubmit = async (event) => {
      event.preventDefault();
      const newService = {
        service_name: serviceName,
        service_description: serviceDescription,
      };
      const response = await axios.post("/admin/add-service/", newService);
      console.log(response.data);
      setServices([...services, newService]);
      setServiceName("");
      setServiceDescription("");
    };

    const handleDelete = (id) => {
      setServices(services.filter((service) => service.id !== id));
    };

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Welcome to the Admin Dashboard</h2>
      <div className="admin-dashboard-form-container">
        <h3 className="admin-dashboard-form-title">Add Service</h3>
        <form className="admin-dashboard-form" onSubmit={handleSubmit}>
          <label htmlFor="serviceName" className="admin-dashboard-form-label">
            Service Name:
            <input
              type="text"
              id="serviceName"
              className="admin-dashboard-form-input"
              value={serviceName}
              onChange={(event) => setServiceName(event.target.value)}
            />
          </label>
          <label
            htmlFor="serviceDescription"
            className="admin-dashboard-form-label"
          >
            Service Description:
            <textarea
              id="serviceDescription"
              className="admin-dashboard-form-textarea"
              value={serviceDescription}
              onChange={(event) => setServiceDescription(event.target.value)}
            />
          </label>
          <input
            className="admin-dashboard-submit-btn"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
      <ServiceDashboard services={services} onDelete={handleDelete} />
    </div>
  );
};

export default AddService;
