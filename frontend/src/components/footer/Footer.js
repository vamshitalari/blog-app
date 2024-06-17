import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="section bg-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="">
              <h6 className="footer-heading text-uppercase text-white">
                Information
              </h6>
              <ul className="list-unstyled footer-link mt-4">
                <li>
                  <NavLink to="/pages">Pages</NavLink>
                </li>
                <li>
                  <NavLink to="/our-team">Our Team</NavLink>
                </li>
                <li>
                  <NavLink to="/features">Features</NavLink>
                </li>
                <li>
                  <NavLink to="/pricing">Pricing</NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="">
              <h6 className="footer-heading text-uppercase text-white">
                Resources
              </h6>
              <ul className="list-unstyled footer-link mt-4">
                <li>
                  <NavLink to="/wikipedia">Wikipedia</NavLink>
                </li>
                <li>
                  <NavLink to="/react-blog">React Blog</NavLink>
                </li>
                <li>
                  <NavLink to="/terms-and-services">Terms &amp; Service</NavLink>
                </li>
                <li>
                  <NavLink to="/angular-dev">Angular Dev</NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2">
            <div className="">
              <h6 className="footer-heading text-uppercase text-white">Help</h6>
              <ul className="list-unstyled footer-link mt-4">
                <li>
                  <NavLink to="/signup">Sign Up</NavLink>
                </li>
                <li>
                  <NavLink to="/signin">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/terms-of-services">Terms of Services</NavLink>
                </li>
                <li>
                  <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="">
              <h6 className="footer-heading text-uppercase text-white">
                Contact Us
              </h6>
              <p className="contact-info mt-4">
                Contact us if need help with anything
              </p>
              <p className="contact-info">+91 9999999999</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="footer-alt mb-0 f-14">2019 © VNR, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
