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
    <div>
      {inquiries &&
        inquiries.map((inquiry) => <div key={inquiry._id}>{inquiry.name}</div>)}
    </div>
  );
};

export default Inquiries;
