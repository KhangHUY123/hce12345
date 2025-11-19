import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import crypto from "crypto-js";
import anhlogo1 from "./assets/images/keylogin.png";
import "./assets/css/login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Lấy user theo email trong tbl_user
    const { data: users, error } = await supabase
      .from("tbl_user")
      .select("*")
      .eq("email", email)
      .limit(1);

    if (!users || users.length === 0) {
      alert("❌ Email không tồn tại!");
      setLoading(false);
      return;
    }

    const user = users[0];

    // 2. Hash mật khẩu nhập vào bằng SHA-256
    const inputHash = crypto.SHA256(password).toString();

    if (inputHash !== user.password_hash) {
      alert("❌ Mật khẩu sai!");
      setLoading(false);
      return;
    }

    // 3. Lưu user vào localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: user.id,
        username: user.username,
        role: user.role,
      })
    );

    // 4. Điều hướng theo role
    if (user.role === 1) {
      alert("✅ Đăng nhập Admin thành công!");
      navigate("/admin/products");
    } else {
      alert("✅ Đăng nhập thành công!");
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={anhlogo1} alt="logo" className="login-logo" />

        <h2 className="login-title">Đăng nhập</h2>

        <form onSubmit={handleLogin} className="login-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Nhập email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Mật khẩu</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
