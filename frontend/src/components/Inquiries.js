import { useEffect, useState } from "react";
import axios from "axios";

const Inquiries = ({ populateAlert }) => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const getInquiries = async () => {
      await axios
        .get("/contact/get-inquiries/")
        .then((response) => setInquiries(response.data));
    };

    getInquiries();
  });

  const markResolveAppointment = async (appointment_id) => {
    await axios
      .put(`/contact/resolve-inquiry/${appointment_id}`)
      .then((response) => populateAlert(response.data.message));
  };

  return (
    <div className="inquiry-cards overflow-auto">
      {inquiries[0] ? (
        inquiries.map((inquiry) => (
          <div
            key={inquiry._id}
            className="mb-5 rounded-3 border border-primary p-3"
          >
            <p>Name: {inquiry.name}</p>
            <p>Email: {inquiry.email}</p>
            <p>Phone: {inquiry.phone}</p>
            <p>Message: {inquiry.message}</p>
            <button onClick={() => markResolveAppointment(inquiry._id)}>
              Resolved
            </button>
          </div>
        ))
      ) : (
        <div>No Inquiries</div>
      )}
    </div>
  );
};

export default Inquiries;
