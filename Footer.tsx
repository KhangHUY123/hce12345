// src/Footer.tsx

import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Cột 1: Thông tin Cửa hàng */}
        <div className="footer-column info-column">
          <h3>KH Store</h3>
          <p>
            Chúng tôi mang đến những thiết kế thời trang truyền thống và hiện
            đại, tôn vinh văn hóa và phong cách cá nhân.
          </p>
          <p>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</p>
          <p>Email: support@khstore.vn</p>
        </div>

        {/* Cột 2: Danh mục & Điều hướng */}
        <div className="footer-column nav-column">
          <h3>Danh mục</h3>
          <ul>
            <li>
              <Link to="/shop">Tất cả sản phẩm</Link>
            </li>
            <li>
              <Link to="/all-products">Bộ sưu tập mới</Link>
            </li>
            <li>
              <Link to="/trang1">Về chúng tôi</Link>
            </li>
            <li>
              <Link to="/trang2">Chính sách</Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Hỗ trợ & Liên hệ */}
        <div className="footer-column contact-column">
          <h3>Hỗ trợ</h3>
          <ul>
            <li>
              <Link to="/contact">Liên hệ</Link>
            </li>
            <li>
              <Link to="/login">Tài khoản</Link>
            </li>
            <li>
              <Link to="/cart">Giỏ hàng</Link>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} KH Store. Bảo lưu mọi quyền.</p>
      </div>
    </footer>
  );
};

export default Footer;
