// import React from "react";
// import { Link } from "react-router-dom";
import "./Footer.css";
import { RxGithubLogo } from "react-icons/rx";
import { FaReact } from "react-icons/fa6";
import { PiFileHtmlDuotone } from "react-icons/pi";
import { PiFileCssFill } from "react-icons/pi";
import { IoLogoJavascript } from "react-icons/io";
import { SiPython } from "react-icons/si";

function Footer() {
  return (

    <div className="footer-content">
      <div className="footer-top">
          <h1 className="footer-branding">Mock Make</h1>
          <p className="tagline">Bringing creativity and community together.</p>
        </div>

        <div className="team-section">
          {/* <h2 className="team-heading">Meet Our Creators</h2> */}
           <div className="team-member">
            <h4>Teagan Stutsman</h4>
            <div className="social-links">
              <a href="https://github.com/TStutsman">
              <RxGithubLogo />
              </a>
              <a href="">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          <div className="team-member">
            <h4>Nur Unlu</h4>
            <div className="social-links">
              <a href="https://github.com/NurCodeWiz">
              <RxGithubLogo />
              </a>
              <a href="">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          <div className="team-member">
            <h4>Finn Beilke</h4>
            <div className="social-links">
              <a href="https://github.com/fbeilke">
              <RxGithubLogo />
              </a>
              <a href="">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

        </div>
        <div className="footer-bottom">
          <div className="copyright">
            <p>©Mock Make. All rights reserved. Crafted with care and passion.</p>
          </div>
          <div className="technologies-used">
            <h3>Powered by:</h3>
            <div className="tech-icons">
              <i className="fab fa-react"><FaReact /></i>
              <i className="fab fa-html5"><PiFileHtmlDuotone /></i>
              <i className="fab fa-css3-alt"><PiFileCssFill /></i>
              <i className="fab fa-js-square"><IoLogoJavascript /></i>
              <i className="fab fa-python"><SiPython /></i>
            </div>
          </div>
        </div>
    </div>

  );
}

export default Footer;
