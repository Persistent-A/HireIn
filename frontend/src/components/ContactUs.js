import "../Styles/contactus.css";
import { useState } from "react";
import axios from "axios";

import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsPhone } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { GoMail } from "react-icons/go";

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
    <div className="contactus-container">
      {/* Alert Section */}
      {showAlert && (
        <div
          className="alert alert-warning alert-dismissible fade show mb-3 d-flex justify-content-between"
          role="alert"
        >
          <div>
            <strong>Alert: </strong> {alertMessage}
          </div>
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

      {/* Contact us content */}
      <div className="contactus-content">
        <p className="contactus-content-title">Get in touch!</p>
        <p>
          Heyo! We are located in montreal. <br />
          Feel free to use the contact form to reach us out.
        </p>
        <div className="contactus-content-links">
          <a
            href="geo:45.491303252238524, -73.64341031965458"
            target="_blank"
            rel="noreferrer"
          >
            <FaMapMarkerAlt className="contactus-content-links-icon" />
            <span>6333 Bd Décarie</span>
          </a>
          <a href="tel:+14388555466" target="_blank" rel="noreferrer">
            <FaPhoneAlt className="contactus-content-links-icon" />
            <span>+1 (438) 855-5466</span>
          </a>
          <a
            href="mailto:apurva.mili@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <MdEmail className="contactus-content-links-icon" />
            <span>apurva.mili@gmail.com</span>
          </a>
        </div>
      </div>
      <form className="contactus-form" onSubmit={submitInquiry}>
        <p className="contactus-form-title">Contact Form</p>
        <div className="contactus-form-fields-container">
          <div>
            <div className="contactus-form-field">
              <label>Your Name</label>
              <div className="contactus-form-field-input">
                <CiUser className="contactus-form-field-input-icon" />
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="contactus-form-field">
              <label>Email</label>
              <div className="contactus-form-field-input">
                <GoMail className="contactus-form-field-input-icon" />
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="contactus-form-field">
              <label>Phone</label>
              <div className="contactus-form-field-input">
                <BsPhone className="contactus-form-field-input-icon" />
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="contactus-form-field">
            <label>Message</label>
            <textarea
              row="5"
              cols="40"
              name="message"
              value={message}
              onChange={onChange}
            ></textarea>
          </div>
        </div>
        <input
          type="submit"
          value="Send Enquiry"
          className="contactus-submit-btn"
        />
      </form>
    </div>
  );
};

export default ContactUs;
