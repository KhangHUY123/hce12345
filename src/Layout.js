// src/Layout.jsx

import React from "react";
// Import component HeaderMinimal mới
import HeaderMinimal from "./HeaderMinimal";
import { Outlet } from "react-router-dom";
// Nếu bạn muốn import ảnh nền hero, đây là nơi phù hợp:
import heroImage from "./assets/images/banne.png";
import Footer from "./Footer"; // <--- IMPORT COMPONENT FOOTER

const Layout = () => {
  // Giả định số lượng item trong giỏ hàng
  const cartCount = 2;

  return (
    <div className="layout-container">
      {/* Truyền props vào HeaderMinimal */}
      <HeaderMinimal cartItemCount={cartCount} />

      {/* Hero Banner */}
      <div
        className="hero-banner"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-content">
          <h1>FEEL YOUR STRENGTH</h1>
          <p>
            Join our strength community and unlock your training potentikal.
          </p>

          {/* ĐÃ LOẠI BỎ: Nút "SHOP NOW" */}
          {/* <button className="shop-btn">SHOP NOW</button> */}

          {/* Phần "NHÀ BÁN LẺ QUẦN ÁO..." */}
          <div className="hero-footer-text">
            NHÀ BÁN LẺ QUẦN ÁO CỔ ĐIỂN - TỪ NĂM 1998
          </div>
        </div>
      </div>

      {/* Vùng nội dung chính */}
      <main id="container" className="main-content">
        <Outlet />
      </main>

      {/* Component Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
