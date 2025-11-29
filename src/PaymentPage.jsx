// src/PaymentPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient"; // Import Supabase Client

// Hàm định dạng giá tiền (Giả định là VNĐ)
const formatCurrency = (number) => {
  if (isNaN(number)) return "0 ₫"; // Sử dụng Intl.NumberFormat để hiển thị VNĐ đẹp hơn
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

// Style cho Input (Để tránh lặp lại)
const inputStyle = {
  padding: "12px 15px",
  margin: "8px 0",
  width: "100%",
  borderRadius: "4px",
  border: "1px solid #dcdcdc",
  boxSizing: "border-box",
  fontSize: "15px",
  transition: "border-color 0.2s",
};

const PaymentPage = () => {
  const navigate = useNavigate(); // State cho Form

  const [email, setEmail] = useState("");
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [detailedAddress, setDetailedAddress] = useState(""); // State cho Logic Thanh toán/Đơn hàng

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const shippingFee = 0; // Thay đổi nếu cần // --- Logic Tải dữ liệu giỏ hàng từ Supabase ---

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      setIsLoading(false);
      return;
    }

    const ids = cart.map((item) => item.id);

    const fetchProducts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("product1")
        .select("id, title, price, category, image")
        .in("id", ids);

      if (error) {
        console.error("Lỗi tải dữ liệu sản phẩm:", error);
        setIsLoading(false);
        return;
      }

      const merged = data
        .map((product) => {
          const cartItem = cart.find((c) => c.id === product.id);
          return {
            ...product,
            quantity: cartItem ? cartItem.quantity : 0,
            price: parseFloat(product.price),
          };
        })
        .filter((item) => item.quantity > 0);

      setCartItems(merged);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const itemsTotal = cartItems.reduce(
      (sum, item) => sum + (item.price * item.quantity || 0),
      0
    );
    setTotal(itemsTotal);
  }, [cartItems]);

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống! Vui lòng thêm sản phẩm.");
      setIsSubmitting(false);
      return;
    }

    if (
      !email ||
      !province ||
      !district ||
      !ward ||
      !firstName ||
      !lastName ||
      !detailedAddress
    ) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng và liên hệ.");
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      setPaymentSuccess(true);
      localStorage.removeItem("cart");
      setCartItems([]);
    }, 2000);
  };

  useEffect(() => {
    if (paymentSuccess) {
      const redirectTimer = setTimeout(() => {
        navigate("/");
      }, 5000);
      return () => clearTimeout(redirectTimer);
    }
  }, [paymentSuccess, navigate]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
                <h2>Đang tải thông tin đơn hàng... 📦</h2>     {" "}
      </div>
    );
  }
  if (cartItems.length === 0 && !paymentSuccess) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
                <h2>Giỏ hàng trống. Vui lòng quay lại trang mua sắm.</h2>       {" "}
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            marginTop: "15px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
                    Quay lại trang chủ        {" "}
        </button>
             {" "}
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px",
        backgroundColor: "#f9f9f9", // Màu nền trang
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
            {/* Cột trái: Thông tin liên lạc & Địa chỉ giao hàng */}     {" "}
      <div
        style={{
          flex: 2,
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
                        {/* Breadcrumb */}       {" "}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
            fontSize: "14px",
          }}
        >
                    <span style={{ color: "#3498db" }}>Giỏ hàng</span>         {" "}
          <span>&gt;</span>         {" "}
          <span style={{ fontWeight: "bold", color: "#333" }}>Thông tin</span> 
                  <span>&gt;</span>          <span>Vận chuyển</span>         {" "}
          <span>&gt;</span>          <span>Thanh toán</span>       {" "}
        </div>
               {" "}
        <form onSubmit={handleSubmit}>
                              {/* Thông tin liên lạc */}         {" "}
          <div style={{ marginBottom: "30px" }}>
                       {" "}
            <h3
              style={{
                paddingBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "1.2em",
                margin: "0 0 15px 0",
              }}
            >
                            Thông tin liên lạc              {" "}
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "normal",
                  color: "#3498db",
                  cursor: "pointer",
                }}
              >
                Đăng nhập
              </span>
                         {" "}
            </h3>
                       {" "}
            <input
              type="email"
              value={email}
              onChange={handleChange(setEmail)}
              placeholder="Email"
              required
              style={inputStyle}
            />
                       {" "}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
                           {" "}
              <input
                type="checkbox"
                id="receive-updates"
                checked={receiveUpdates}
                onChange={() => setReceiveUpdates(!receiveUpdates)}
                style={{ marginRight: "10px", transform: "scale(1.2)" }}
              />
                           {" "}
              <label
                htmlFor="receive-updates"
                style={{ fontSize: "15px", color: "#666" }}
              >
                                Gửi cho tôi tin tức và ưu đãi qua email        
                     {" "}
              </label>
                         {" "}
            </div>
                     {" "}
          </div>
                    {/* Địa chỉ giao hàng */}         {" "}
          <div>
                       {" "}
            <h3
              style={{
                paddingBottom: "10px",
                fontSize: "1.2em",
                margin: "0 0 15px 0",
              }}
            >
              Địa chỉ giao hàng
            </h3>
                       {" "}
            <p
              style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}
            >
                            Địa chỉ này cũng sẽ được dùng làm địa chỉ thanh toán
              cho đơn hàng này.            {" "}
            </p>
                        {/* Tỉnh/Thành phố */}           {" "}
            <select
              value={province}
              onChange={handleChange(setProvince)}
              required
              style={{ ...inputStyle, color: province ? "#333" : "#999" }}
            >
                           {" "}
              <option value="" disabled>
                Chọn Tỉnh/Thành phố
              </option>
                            <option value="hcm">TP. Hồ Chí Minh</option>       
                 {" "}
            </select>
                        {/* Quận/Huyện, Phường/Xã */}           {" "}
            <div style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                           {" "}
              <select
                value={district}
                onChange={handleChange(setDistrict)}
                required
                style={{
                  ...inputStyle,
                  flex: 1,
                  color: district ? "#333" : "#999",
                }}
              >
                               {" "}
                <option value="" disabled>
                  Chọn Quận/Huyện
                </option>
                                <option value="q1">Quận 1</option>             {" "}
              </select>
                           {" "}
              <select
                value={ward}
                onChange={handleChange(setWard)}
                required
                style={{
                  ...inputStyle,
                  flex: 1,
                  color: ward ? "#333" : "#999",
                }}
              >
                               {" "}
                <option value="" disabled>
                  Chọn Phường/Xã
                </option>
                                <option value="pw">Phường X</option>           
                 {" "}
              </select>
                         {" "}
            </div>
                        {/* Quốc gia/Khu vực */}           {" "}
            <select
              disabled
              style={{
                ...inputStyle,
                color: "#333",
                backgroundColor: "#f0f0f0",
              }}
            >
                           {" "}
              <option value="vn">Quốc gia/Khu vực: Việt Nam</option>           {" "}
            </select>
                        {/* Tên, Họ */}           {" "}
            <div style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                           {" "}
              <input
                type="text"
                value={lastName}
                onChange={handleChange(setLastName)}
                placeholder="Họ"
                required
                style={{ ...inputStyle, flex: 1 }}
              />
                           {" "}
              <input
                type="text"
                value={firstName}
                onChange={handleChange(setFirstName)}
                placeholder="Tên"
                required
                style={{ ...inputStyle, flex: 1 }}
              />
                         {" "}
            </div>
                                    {/* Địa chỉ chi tiết */}
                       {" "}
            <input
              type="text"
              value={detailedAddress}
              onChange={handleChange(setDetailedAddress)}
              placeholder="Địa chỉ nhận hàng (số nhà, đường phố, hẻm, Căn hộ...)"
              required
              style={inputStyle}
            />
                     {" "}
          </div>
                              {/* Thông báo thành công */}         {" "}
          {paymentSuccess && (
            <div
              style={{
                marginTop: "30px",
                padding: "15px",
                backgroundColor: "#2ecc71",
                color: "white",
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
                            Thanh toán thành công! Cảm ơn bạn đã mua sắm.      
                   {" "}
            </div>
          )}
                 {" "}
        </form>
             {" "}
      </div>
            {/* Cột phải: Tóm tắt đơn hàng (Hiển thị dữ liệu thực tế) */}     {" "}
      <div
        style={{
          flex: 1,
          backgroundColor: "#f9f9f9",
          padding: "30px",
          borderRadius: "8px",
          border: "1px solid #eee",
          alignSelf: "flex-start",
        }}
      >
                       {" "}
        <h3 style={{ margin: "0 0 20px 0", fontSize: "1.4em", color: "#333" }}>
          Tóm tắt đơn hàng
        </h3>
                        {/* Danh sách sản phẩm */}       {" "}
        {cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
              paddingBottom: "15px",
              borderBottom: "1px solid #eee",
            }}
          >
                       {" "}
            <div style={{ display: "flex", alignItems: "center" }}>
                           {" "}
              <div style={{ position: "relative", marginRight: "10px" }}>
                               {" "}
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "60px",
                    height: "60px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    objectFit: "cover",
                  }}
                />
                               {" "}
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#3498db", // Màu xanh dương
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                  }}
                >
                                    {item.quantity}               {" "}
                </span>
                             {" "}
              </div>
                           {" "}
              <div>
                               {" "}
                <p
                  style={{
                    margin: "0 0 5px 0",
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#333",
                  }}
                >
                  {item.title}
                </p>
                               {" "}
                <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>
                  {item.category}
                </p>
                             {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                            {formatCurrency(item.price * item.quantity)}       
                 {" "}
            </span>
                     {" "}
          </div>
        ))}
                {/* Mã khuyến mãi */}       {" "}
        <div
          style={{ display: "flex", marginBottom: "30px", marginTop: "10px" }}
        >
                   {" "}
          <input
            type="text"
            placeholder="Nhập mã khuyến mãi"
            style={{
              ...inputStyle,
              padding: "10px 15px",
              margin: 0,
              borderRadius: "4px 0 0 4px",
              borderRight: "none",
            }}
          />
                   {" "}
          <button
            style={{
              padding: "10px 18px",
              backgroundColor: "#ecf0f1",
              border: "1px solid #dcdcdc",
              borderRadius: "0 4px 4px 0",
              cursor: "pointer",
              fontWeight: "bold",
              color: "#666",
              transition: "background-color 0.2s",
            }}
          >
                        Áp dụng          {" "}
          </button>
                 {" "}
        </div>
                {/* Tóm tắt chi phí */}       {" "}
        <div
          style={{
            borderTop: "1px solid #ddd",
            paddingTop: "15px",
            marginBottom: "20px",
          }}
        >
                   {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
                       {" "}
            <span style={{ fontSize: "15px", color: "#666" }}>
              Tổng tiền hàng
            </span>
                       {" "}
            <span style={{ fontSize: "15px", color: "#333" }}>
              {formatCurrency(total)}
            </span>
                     {" "}
          </div>
                   {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
                       {" "}
            <span style={{ fontSize: "15px", color: "#666" }}>
              Phí vận chuyển
            </span>
                       {" "}
            <span
              style={{
                fontSize: "15px",
                color: shippingFee === 0 ? "#2ecc71" : "#333",
                fontWeight: shippingFee === 0 ? "bold" : "normal",
              }}
            >
                           {" "}
              {shippingFee === 0 ? "MIỄN PHÍ" : formatCurrency(shippingFee)}   
                     {" "}
            </span>
                     {" "}
          </div>
                 {" "}
        </div>
                {/* Tổng thanh toán */}       {" "}
        <div
          style={{
            borderTop: "1px solid #ddd",
            paddingTop: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
                   {" "}
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>
            Tổng thanh toán
          </span>
                   {" "}
          <span style={{ fontWeight: "bold", fontSize: "22px", color: "#333" }}>
                        {formatCurrency(total + shippingFee)}         {" "}
          </span>
                 {" "}
        </div>
                {/* Nút Thanh toán/ Tiếp tục đến vận chuyển */}       {" "}
        <button
          type="submit"
          onClick={handleSubmit}
          style={{
            padding: "14px 25px",
            backgroundColor: "#3498db", // Màu xanh dương nổi bật
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
            marginTop: "25px",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#2980b9")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#3498db")
          }
          disabled={isSubmitting || paymentSuccess || cartItems.length === 0}
        >
                    {isSubmitting ? "Đang xử lý..." : "Tiếp tục đến vận chuyển"}
                 {" "}
        </button>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default PaymentPage;
