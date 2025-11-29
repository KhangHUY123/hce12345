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
          ...product,
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
    const tempUpdated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );

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
        maxWidth: "750px", // Giảm kích thước tối đa của container
        margin: "20px auto", // Giảm margin
        padding: "15px", // Giảm padding
        backgroundColor: "#f0f2f5",
        borderRadius: "8px", // Giảm bo tròn
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Arial', sans-serif",
      }}
    >
           {" "}
      <h2
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "20px", // Giảm margin
          fontSize: "1.8em", // Giảm cỡ chữ tiêu đề
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px", // Giảm gap
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
        <p style={{ textAlign: "center", fontSize: "1em", color: "#666" }}>
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
                padding: "15px", // Giảm padding item
                borderBottom: "1px solid #e0e0e0",
                gap: "20px", // Giảm gap
                backgroundColor: "#fff",
                borderRadius: "6px", // Giảm bo tròn
                marginBottom: "10px",
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
                           {" "}
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "80px", // Thu nhỏ ảnh
                  height: "80px", // Thu nhỏ ảnh
                  objectFit: "cover",
                  borderRadius: "6px",
                  border: "1px solid #e0e0e0",
                }}
              />
                           {" "}
              <div style={{ flex: 1 }}>
                               {" "}
                <h4
                  style={{
                    margin: "0 0 5px 0",
                    fontSize: "1.1em", // Giảm cỡ chữ
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
                    fontSize: "1em", // Giảm cỡ chữ
                  }}
                >
                                    {formatCurrency(item.price)}               {" "}
                </p>
                             {" "}
              </div>
                           {" "}
              {/* Cấu trúc Quantity (đã giữ nguyên kích thước nhỏ) */}         
                 {" "}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "4px", // Giảm bo tròn
                  overflow: "hidden",
                  minWidth: "90px",
                }}
              >
                               {" "}
                <button
                  onClick={() => decreaseQty(item.id)}
                  style={{
                    background: "#f0f0f0",
                    border: "none",
                    padding: "6px 8px",
                    cursor: "pointer",
                    fontSize: "1em",
                    borderRight: "1px solid #ccc",
                  }}
                >
                                    -                {" "}
                </button>
                               {" "}
                <span
                  style={{
                    padding: "6px 0",
                    textAlign: "center",
                    width: "30px",
                    fontSize: "1em",
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
                    padding: "6px 8px",
                    cursor: "pointer",
                    fontSize: "1em",
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
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "4px", // Giảm bo tròn
                  cursor: "pointer",
                  fontSize: "0.9em",
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
              marginTop: "20px", // Giảm margin
              borderTop: "1px solid #e0e0e0", // Giảm độ dày border
              paddingTop: "15px", // Giảm padding
              gap: "10px",
            }}
          >
                       {" "}
            <h3 style={{ margin: 0, fontSize: "1.3em", color: "#333" }}>
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
              padding: "12px 20px", // Giảm padding
              backgroundColor: "#2ecc71",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "15px", // Giảm margin
              width: "100%",
              fontSize: "1.1em", // Giảm cỡ chữ
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
