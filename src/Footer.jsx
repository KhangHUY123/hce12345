// src/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Cột 1: Thông tin Cửa hàng */}
        <div className="footer-column info-column">
          <h3>KH Store</h3>
          <p>Chúng tôi mang đến những thiết kế thời trang độc đáo.</p>
        </div>

        {/* Cột 2: Danh mục */}
        <div className="footer-column nav-column">
          <h3>Danh mục</h3>
          <ul>
            <li>
              <Link to="/shop">Sản phẩm</Link>
            </li>
            <li>
              <Link to="/trang1">Về chúng tôi</Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div className="footer-column contact-column">
          <h3>Hỗ trợ</h3>
          <ul>
            <li>
              <Link to="/contact">Liên hệ</Link>
            </li>
            <li>
              <Link to="/login">Tài khoản</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="footer-bottom">
        <p>© 2025 KH Store. Bảo lưu mọi quyền.</p>
      </div>
    </footer>
  );
};

export default Footer;
