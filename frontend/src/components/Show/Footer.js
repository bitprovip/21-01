import React from "react";
import "./Footer.css";
import { FaFacebook, FaYoutube,FaMailBulk } from "react-icons/fa";

const Footer = (props) => {
  return (
    <div className="footer">
      <div className="footer-left">
        <div className="header-footer-left">Hỗ trợ khách hàng</div>
        <div className="content-footer-left ">
          <a href="#">Trung tâm trợ giúp</a>
          <a href="#">Liên hệ hỗ trợ</a>
        </div>
      </div>
      <div className="footer-center">
        <div className="header-footer-center">Bản quyền</div>
        <p>&copy; 2023 Your Website. All rights reserved.</p>
      </div>
      <div className="footer-right">
        <div className="header-footer-right">Liên hệ</div>
        <div className="content-footer-right">
          <a href="https://www.facebook.com">
            <FaFacebook />
          </a>
          <a href="https://mail.google.com">
            <FaYoutube />
          </a>
          <a href="https://mail.google.com">
            <FaMailBulk />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Footer;
