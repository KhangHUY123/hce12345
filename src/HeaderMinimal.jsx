import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImage from "./assets/images/logo.png";

const HeaderMinimal = ({ cartItemCount }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user từ localStorage khi mở trang
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // ROLE admin = 1
  const isAdmin = user && user.role === 1;

  // Khi bấm vào Admin Dashboard
  const handleAdminClick = (e) => {
    if (!isAdmin) {
      e.preventDefault(); // chặn điều hướng
      alert("❌ Bạn không có quyền truy cập trang Admin!");
    }
  };

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

      <nav className="nav-menu">
        <NavLink to="/Trang2" className="nav-item">
          Home
        </NavLink>

        <NavLink to="/about" className="nav-item">
          About Us
        </NavLink>

        <NavLink to="/" className="nav-item">
          Shop
        </NavLink>

        <NavLink to="/Trang1" className="nav-item">
          Contact Us
        </NavLink>

        {/* luôn hiện Admin Dashboard */}
        <NavLink
          to="/admin/products"
          className={`nav-item nav-admin ${!isAdmin ? "disabled-admin" : ""}`}
          onClick={handleAdminClick}
        >
          Admin Dashboard
        </NavLink>

        {/* Hiện login / logout */}
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
          <NavLink to="/login" className="nav-item">
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
