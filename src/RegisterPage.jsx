import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import crypto from "crypto-js";
import anhlogo1 from "./assets/images/keylogin.png";
import "./assets/css/login.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Kiểm tra email đã tồn tại chưa
    const { data: existingUser, error: checkError } = await supabase
      .from("tbl_user")
      .select("email")
      .eq("email", email)
      .limit(1);

    if (existingUser && existingUser.length > 0) {
      alert("❌ Email đã tồn tại!");
      setLoading(false);
      return;
    }

    // 2. Hash mật khẩu
    const passwordHash = crypto.SHA256(password).toString();

    // 3. Insert vào Supabase
    const { error } = await supabase.from("tbl_user").insert([
      {
        username: username,
        email: email,
        password_hash: passwordHash,
        role: 0, // user bình thường
      },
    ]);

    if (error) {
      alert("❌ Lỗi đăng ký: " + error.message);
      setLoading(false);
      return;
    }

    alert("🎉 Đăng ký thành công! Hãy đăng nhập.");
    navigate("/login");

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={anhlogo1} alt="logo" className="login-logo" />

        <h2 className="login-title">Đăng ký tài khoản</h2>

        <form onSubmit={handleRegister} className="login-form">
          <label>Tên người dùng</label>
          <input
            type="text"
            placeholder="Nhập username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Nhập email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Mật khẩu</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 10 }}>
          Đã có tài khoản?{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Đăng nhập ngay
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
