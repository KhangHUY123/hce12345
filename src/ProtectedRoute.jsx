import React, { useState, useEffect } from "react"; // <--- Cần import useEffect và useState
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  useEffect(() => {
    // Chỉ chạy khi component mount
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false); // Đánh dấu đã đọc xong localStorage
  }, []);

  const required = roleRequired || "user";

  // --- 1. CHỜ ĐỌC DỮ LIỆU ---
  if (loading) {
    // Hiển thị màn hình chờ (hoặc null) trong khi đọc localStorage
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Đang kiểm tra quyền...
      </div>
    );
  }

  // --- 2. KIỂM TRA ĐĂNG NHẬP ---
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "⚠️ Vui lòng đăng nhập để tiếp tục!" }}
      />
    );
  }

  // --- 3. KIỂM TRA QUYỀN TRUY CẬP (ROLE) ---
  // if (required === "admin" && user.role !== "admin") {
  //   alert("❌ Bạn không có quyền truy cập trang quản trị!");
  //   return <Navigate to="/" replace />;
  // }

  // --- 4. TRUY CẬP HỢP LỆ ---
  return children;
};

export default ProtectedRoute;
