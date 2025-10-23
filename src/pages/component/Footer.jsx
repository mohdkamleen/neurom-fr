import React from 'react'
import { Link } from 'react-router-dom';
import '../../css/Footer.css'
function Footer() {
    return (
        <>
            <div className='footer-section bg-dark' >
                <div>
                    <h4>Our Website</h4>
                    <Link className='footer-item' to="/terms">Privacy Policy </Link> <br />
                    <Link className='footer-item' to="/terms">Terms and conditions</Link> <br />
                    <Link className='footer-item' to="#">Sitemap</Link> <br />
                    <Link className='footer-item' to="#">Security</Link>
                </div><br />
                <div>
                    <h4>Our Company</h4>
                    <Link to="/services" className='footer-item'>Services</Link><br />
                    <Link to="/contact" className='footer-item'>Contact Us</Link><br />
                    <Link to="/rules" className='footer-item'>FAQ's</Link><br />
                    <Link to="/career" className='footer-item'>Carrers</Link><br />
                    <Link to="/blog" className='footer-item'>Blogs</Link> <br />
                </div><br />
                <div>
                    <h4>Contact Us</h4>
                    <p style={{ wordBreak: "break-word" }}> +91 95806 50975</p>
                    <p>tbclaleague@gmail.com</p>
                    <p>Ambedkar Nagar, Uttar Pradesh India.</p>
                    <br />
                    <p>
                        <a href="https://www.facebook.com/share/1CHowRZmGV/"><font color="skyblue">facebook</font></a> &nbsp;
                        {/* <a href="#"><font color="skyblue">twitter</font></a> &nbsp; */}
                        <a href="https://www.instagram.com/tbcla_league?igsh=MW5qYjZrNmU3dGgzeg=="><font color="skyblue">instagram</font></a>
                    </p>
                </div>
            </div>
            <p className='copyright bg-dark'>&copy; {new Date().getFullYear()} Inhsor. All Rights Reserved. <br /><br /></p>
        </>
    );
}

export default Footer;