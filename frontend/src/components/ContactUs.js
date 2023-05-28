import "../Styles/contactus.css";
import { useState } from "react";
import axios from "axios";

const ContactUs = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { name, email, phone, message } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitInquiry = async (e) => {
    e.preventDefault();
    await axios
      .post("/contact/register", formData)
      .then((response) => {
        setAlertMessage(response.data.message);
        setShowAlert(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      })
      .catch((error) => {
        setAlertMessage(error);
        setShowAlert(true);
      });
  };

  return (
    <div className="conatctus-conatiner">
      {showAlert && (
        <div
          className="alert alert-warning alert-dismissible fade show mb-3 d-flex justify-content-between"
          role="alert"
        >
          <div><strong>Alert: </strong> {alertMessage}</div>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => setShowAlert(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      <div className="contactus-content">
        <p>GET IN TOUCH</p>
        <p>
          Heyo! We are located in montreal. Feel free to use the contact from to
          the left to reach us out, or write us in the traditional way
        </p>
      </div>
      <div className="contactus-secondcontent">
        <form className="contactus-form" onSubmit={submitInquiry}>
          NAME
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
          />
          EMAIL
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
          />
          PHONE
          <input
            type="text"
            name="phone"
            value={phone}
            placeholder="Enter your phone number"
            onChange={onChange}
          />
          MESSAGE
          <textarea
            row="5"
            cols="40"
            name="message"
            value={message}
            onChange={onChange}
          >
            {" "}
          </textarea>
          <input type="submit" value="Send Enquiry" />
        </form>
        <div className="contactus-contacts">
          <div>
            <p>SEND EMAIL</p>
            <p>6333 Decarie Bvld,</p>
            <p>Montreal, QC H3S 1S5</p>
          </div>
          <div>
            <p>ELECTRONIC EMAIL</p>
            <p>team@hirein.com</p>
          </div>
          <div>
            <p>PHONE SUPPORT</p>
            <p>Hours: 9am-5pm</p>
            <p>Monday - Friday</p>
            <p>+1(123)456-5678</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
