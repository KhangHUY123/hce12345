import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImage from "./assets/images/logo.png";

const HeaderMinimal = ({ cartItemCount }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Đọc trạng thái người dùng từ localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData)); // Đồng bộ trạng thái user từ localStorage
    }
  }, []); // Chỉ chạy một lần khi component mount

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa thông tin người dùng khỏi localStorage
    setUser(null); // Cập nhật lại trạng thái người dùng trong ứng dụng
    navigate("/"); // Điều hướng về trang chủ
  };

  const isAdmin = user && user.role === "admin";

  return (
    <header className="header-minimal">
      <div className="logo-section">
        <Link to="/" className="logo-text">
          <img
            src={logoImage}
            alt="K.H Clothing Store Logo"
            className="header-logo-image"
          />
        </Link>
      </div>

      {/* Menu */}
      <nav className="nav-menu">
        <NavLink
          to="/Trang2"
          className="nav-item"
          activeClassName="active-nav-item"
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className="nav-item"
          activeClassName="active-nav-item"
        >
          About Us
        </NavLink>
        <NavLink to="/" className="nav-item" activeClassName="active-nav-item">
          Shop
        </NavLink>
        <NavLink
          to="/Trang1"
          className="nav-item"
          activeClassName="active-nav-item"
        >
          Contact Us
        </NavLink>

        {/* Hiển thị Admin Dashboard khi là Admin */}
        {isAdmin && (
          <NavLink
            to="/admin/products"
            className="nav-item nav-admin"
            activeClassName="active-nav-item"
          >
            Admin Dashboard
          </NavLink>
        )}

        {/* Hiển thị Login/Logout */}
        {user ? (
          <button
            onClick={handleLogout}
            className="nav-item nav-logout"
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            Logout ({user.username})
          </button>
        ) : (
          <NavLink
            to="/login"
            className="nav-item"
            activeClassName="active-nav-item"
          >
            Login
          </NavLink>
        )}
      </nav>

      {/* Giỏ hàng */}
      <div className="cart-section">
        <Link to="/cart" className="cart-icon-link">
          🛒
          <span className="cart-count">{cartItemCount || 0}</span>
        </Link>
      </div>
    </header>
  );
};

export default HeaderMinimal;
