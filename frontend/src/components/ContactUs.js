import "../Styles/contactus.css";

const ContactUs = () => {
  return (
    <div className="conatctus-conatiner">
      <div className="contactus-content">
        <p>GET IN TOUCH</p>
        <p>
          Heyo! We are located in montreal. Feel free to use the contact from to
          the left to reach us out, or write us in the traditional way
        </p>
      </div>
      <div className="contactus-secondcontent">
        <form className="contactus-form">
          NAME
          <input type="text" placeholder="Enter your name" />
          EMAIL
          <input type="text" placeholder="Enter your email" />
          PHONE
          <input type="text" placeholder="Enter your name" />
          MESSAGE
          <textarea row="5" cols="40"></textarea>
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
