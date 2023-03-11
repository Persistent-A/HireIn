import '../Styles/footer.css'

import { FiTwitter, FiMail, FiFacebook } from "react-icons/fi"

const Footer = () => {
  return (
    <div className="footer">
        <div>
            <div>Services</div>
            <div>About Us</div>
            <div>Contact Us</div>
        </div>
        <div>
            &copy; Developed By HireIn Team
        </div>
        <div className='follow-us'>
            <div>
                Follow Us
            </div>
            <div>
                <FiTwitter/>
                <FiMail/>
                <FiFacebook/>
            </div>
        </div>
    </div>
  )
}

export default Footer
