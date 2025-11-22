// src/Layout.jsx
import React from "react";
import HeaderMinimal from "./HeaderMinimal";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import heroImage from "./assets/images/banne.png";

const Layout = () => {
  const cartCount = JSON.parse(localStorage.getItem("cart") || "[]").length;

  return (
    <div className="layout-container">
      <HeaderMinimal cartItemCount={cartCount} />

      {/* Hero Banner */}
      <div
        className="hero-banner"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-content">
          <h1>FEEL YOUR STRENGTH</h1>
          <p>Join our strength community and unlock your training potential.</p>
          <div className="hero-footer-text">
            NHÀ BÁN LẺ QUẦN ÁO CỔ ĐIỂN - TỪ NĂM 1998
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
