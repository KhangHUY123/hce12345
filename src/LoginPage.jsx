import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import anhlogo1 from "./assets/images/keylogin.png";
import "./assets/css/login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    // Thêm kiểu cho TS
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // 1. KIỂM TRA TÀI KHOẢN ADMIN ĐẶC BIỆT
      if (username === "admin" && password === "123") {
        localStorage.setItem(
          "user",
          JSON.stringify({ username: "admin", role: "admin" }) // <--- LƯU ROLE LÀ ADMIN
        );
        alert("✅ Đăng nhập Admin thành công!");
        navigate("/admin/products"); // Chuyển đến trang Admin

        // 2. KIỂM TRA TÀI KHOẢN USER THÔNG THƯỜNG
      } else if (username.trim() && password.trim()) {
        localStorage.setItem(
          "user",
          JSON.stringify({ username, role: "user" }) // <--- LƯU ROLE LÀ USER
        );
        alert("✅ Đăng nhập thành công!");
        navigate("/"); // Chuyển về trang chủ
      } else {
        alert("❌ Vui lòng nhập đầy đủ thông tin!");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    // ... (Phần giao diện giữ nguyên)
    <div className="login-wrapper">
      <div className="login-card">
        <img src={anhlogo1} alt="Logo.png" className="login-logo" />

        <h2 className="login-title">Đăng nhập vào tài khoản</h2>
        <p className="login-subtitle">Sử dụng tài khoản của bạn để tiếp tục</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "⏳ Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <p className="register-link">
          Bạn chưa có tài khoản? <a href="#">Tạo tài khoản mới</a>
        </p>

        <div className="social-login">
          <button className="social-btn google">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
              alt="Google"
            />
            <span>Đăng nhập Google</span>
          </button>

          <button className="social-btn facebook">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
            />
            <span>Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
