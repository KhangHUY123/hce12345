import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    setUser(userData ? JSON.parse(userData) : null);
    setLoading(false);
  }, []); // <= DÒNG CỰC QUAN TRỌNG

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Đang kiểm tra quyền...
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "⚠️ Vui lòng đăng nhập để tiếp tục!" }}
      />
    );
  }

  if (roleRequired === "admin" && user.role !== 1) {
    alert("❌ Bạn không có quyền truy cập trang quản trị!");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
