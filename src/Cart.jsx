import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Chức năng thanh toán đang cập nhật!");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto", padding: "20px" }}>
      <h2>🛒 Giỏ hàng của bạn</h2>

      {cartItems.length === 0 ? (
        <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #ddd",
                gap: "20px",
              }}
            >
              <img src={item.image} alt="" style={{ width: "80px" }} />

              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0 }}>{item.title}</h4>
                <p style={{ margin: 0, color: "#e63946" }}>${item.price}</p>
              </div>

              <p>Số lượng: {item.quantity}</p>
            </div>
          ))}

          <h3 style={{ marginTop: "20px" }}>Tổng tiền: ${total.toFixed(2)}</h3>

          <button
            onClick={handleCheckout}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            💳 Thanh toán
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
