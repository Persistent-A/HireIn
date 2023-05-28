import { useEffect, useState } from "react";
import axios from "axios";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const getInquiries = async () => {
      await axios
        .get("/contact/get-inquiries/")
        .then((response) => setInquiries(response.data));
    };

    getInquiries();
  });
  return (
    <div className="inquiry-cards overflow-auto">
      {inquiries &&
        inquiries.map((inquiry) => (
          <div key={inquiry._id} className="mb-5 rounded-3 border border-primary p-3">
            <p>Name: {inquiry.name}</p>
            <p>Email: {inquiry.email}</p>
            <p>Phone: {inquiry.phone}</p>
            <p>Message: {inquiry.message}</p>
          </div>
        ))}
    </div>
  );
};

export default Inquiries;
