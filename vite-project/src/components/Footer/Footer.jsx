import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

function Footer() {
  return (
    <div className='footer' id = 'footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>kjvnsdfanflfndd jdnjdjdfdfjdjd dddkdkkkkkd kdkkdkdkdkdkkdksnjskjks sjksjksjksjs ksjksskjskjskjksjsk</p>
            <div className="footer-social-icon">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+XX-12209-29932-1292</li>
                <li>contact@tomato.com</li>
            </ul>

        </div>
      </div>
      <hr />
      <p className='footer-copyright'>copyright @ tomato.com</p>
    </div>
  )
}

export default Footer
