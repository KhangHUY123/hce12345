import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Kiểm tra user mỗi lần render
  useEffect(() => {
    const userData = localStorage.getItem("user");
    setUser(userData ? JSON.parse(userData) : null);
    setLoading(false);
  });

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Đang kiểm tra quyền...
      </div>
    );
  }

  // Chưa login
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "⚠️ Vui lòng đăng nhập để tiếp tục!" }}
      />
    );
  }

  // Kiểm tra quyền admin
  if (roleRequired === "admin" && user.role !== 1) {
    alert("❌ Bạn không có quyền truy cập trang quản trị!");
    return <Navigate to="/" replace />;
  }

  // Truy cập hợp lệ
  return children;
};

export default ProtectedRoute;
