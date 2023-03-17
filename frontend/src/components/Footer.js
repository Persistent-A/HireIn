import '../Styles/footer.css'
import { BsTwitter } from 'react-icons/bs'
import { MdMail } from 'react-icons/md'
import { ImFacebook2 } from 'react-icons/im'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-social-links'>
        <p>Follow us</p>
        <div>
          <a href='gmail' rel='noreferrer' target='"_blank'><MdMail/></a>
          <a href='twitter' rel='noreferrer' target='"_blank'><BsTwitter/></a>
          <a href='facebook' rel='noreferrer' target='"_blank'><ImFacebook2/></a>
        </div>
      </div>
      <hr/>
      <div className='footer-web-links'>
        <h2>HireIn</h2>
        <div>
          <ul>
            <li><a href="google" rel="norefferer" target="_blank">Services</a></li>
            <li><a href="google" rel="norefferer" target="_blank">About Us</a></li>
            <li><a href="google" rel="norefferer" target="_blank">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div>2023 &copy; Copyrights reserved</div>
    </footer>
  )
}

export default Footer

