import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // ⚠️ ĐIỂM QUAN TRỌNG: Thêm dependency array rỗng []
  // Điều này đảm bảo việc kiểm tra localStorage chỉ chạy 1 lần khi component được mount.
  useEffect(() => {
    const userData = localStorage.getItem("user");
    setUser(userData ? JSON.parse(userData) : null);
    setLoading(false);
  }, []); // 👈 KHẮC PHỤC: Dependency array rỗng

  // 1. Nếu loading = true, luôn hiển thị loading, không kiểm tra điều kiện khác.
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Đang kiểm tra quyền...
      </div>
    );
  }

  // 2. Kiểm tra chưa login
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "⚠️ Vui lòng đăng nhập để tiếp tục!" }}
      />
    );
  }

  // 3. Kiểm tra quyền admin
  if (roleRequired === "admin" && user.role !== 1) {
    alert("❌ Bạn không có quyền truy cập trang quản trị!");
    return <Navigate to="/" replace />;
  }

  // 4. Truy cập hợp lệ
  return children;
};

export default ProtectedRoute;
