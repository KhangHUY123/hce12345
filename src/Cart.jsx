import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

// Hàm định dạng giá tiền (Giả định là VND, có thể thay đổi tùy ý)
const formatCurrency = (number) => {
  if (isNaN(number) || number === null) return "0 ₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) return;

    const ids = cart.map((item) => item.id);

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("product1")
        .select("*")
        .in("id", ids);

      if (error) {
        console.error("Lỗi tải dữ liệu:", error);
        return;
      }

      const merged = data.map((product) => {
        const cartItem = cart.find((c) => c.id === product.id);
        return {
          ...product, // Đảm bảo quantity là số hợp lệ, mặc định là 1
          quantity: parseInt(cartItem.quantity) || 1,
          price: parseFloat(product.price),
        };
      });

      setCartItems(merged);
    };

    fetchProducts();
  }, []);

  const updateLocalStorage = (items) => {
    const cart = items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + (item.price * Math.max(0, item.quantity) || 0),
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);
    updateLocalStorage(updated);
  };

  const decreaseQty = (id) => {
    // 1. Tính toán số lượng mới (có thể là 0)
    const tempUpdated = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity - 1 } // KHÔNG dùng Math.max(1, ...)
        : item
    ); // 2. Lọc bỏ các sản phẩm có số lượng <= 0

    const finalUpdated = tempUpdated.filter((item) => item.quantity > 0);

    setCartItems(finalUpdated);
    updateLocalStorage(finalUpdated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    updateLocalStorage(updated);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }
    navigate("/payment");
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
        backgroundColor: "#f0f2f5", // Màu nền nhẹ
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Arial', sans-serif",
      }}
    >
           {" "}
      <h2
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "30px",
          fontSize: "2.2em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
          fontWeight: "600",
        }}
      >
               {" "}
        <span role="img" aria-label="shopping cart">
          🛒
        </span>{" "}
        Giỏ hàng của bạn      {" "}
      </h2>
           {" "}
      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.1em", color: "#666" }}>
                    Chưa có sản phẩm nào trong giỏ hàng.        {" "}
        </p>
      ) : (
        <div>
                   {" "}
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "20px",
                borderBottom: "1px solid #e0e0e0",
                gap: "30px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                marginBottom: "15px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              }}
            >
                           {" "}
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                }}
              />
                           {" "}
              <div style={{ flex: 1 }}>
                               {" "}
                <h4
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "1.2em",
                    color: "#333",
                  }}
                >
                                    {item.title}               {" "}
                </h4>
                               {" "}
                <p
                  style={{
                    margin: 0,
                    color: "#e63946",
                    fontWeight: "bold",
                    fontSize: "1.1em",
                  }}
                >
                                    {formatCurrency(item.price)}               {" "}
                </p>
                             {" "}
              </div>
                            {/* Cấu trúc Quantity */}             {" "}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  overflow: "hidden",
                  minWidth: "120px",
                }}
              >
                               {" "}
                <button
                  onClick={() => decreaseQty(item.id)}
                  style={{
                    background: "#f0f0f0",
                    border: "none",
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: "1.1em",
                    borderRight: "1px solid #ccc",
                  }}
                >
                                    -                {" "}
                </button>
                               {" "}
                <span
                  style={{
                    padding: "8px 0",
                    textAlign: "center",
                    width: "40px",
                    fontSize: "1.1em",
                    color: "#333",
                  }}
                >
                                    {item.quantity || 0}               {" "}
                </span>
                               {" "}
                <button
                  onClick={() => increaseQty(item.id)}
                  style={{
                    background: "#f0f0f0",
                    border: "none",
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: "1.1em",
                    borderLeft: "1px solid #ccc",
                  }}
                >
                                    +                {" "}
                </button>
                             {" "}
              </div>
                            {/* Nút Xóa */}             {" "}
              <button
                onClick={() => removeItem(item.id)}
                style={{
                  background: "#e74c3c", // Màu đỏ nổi bật
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "1em",
                  transition: "background-color 0.2s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#c0392b")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e74c3c")
                }
              >
                                Xóa              {" "}
              </button>
                         {" "}
            </div>
          ))}
                   {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "baseline",
              marginTop: "30px",
              borderTop: "2px solid #e0e0e0",
              paddingTop: "20px",
              gap: "20px",
            }}
          >
                       {" "}
            <h3 style={{ margin: 0, fontSize: "1.5em", color: "#333" }}>
                            Tổng tiền:              {" "}
              <span style={{ color: "#e63946", fontWeight: "bold" }}>
                                {formatCurrency(total)}             {" "}
              </span>
                         {" "}
            </h3>
                     {" "}
          </div>
                   {" "}
          <button
            onClick={handleCheckout}
            style={{
              padding: "15px 30px",
              backgroundColor: "#2ecc71", // Màu xanh lá cây
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "25px",
              width: "100%",
              fontSize: "1.2em",
              fontWeight: "600",
              transition: "background-color 0.2s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#27ae60")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#2ecc71")
            }
          >
                        Tiến hành Thanh toán          {" "}
          </button>
                 {" "}
        </div>
      )}
         {" "}
    </div>
  );
};

export default Cart;
