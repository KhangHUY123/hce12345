import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // ⭐ Load giỏ hàng + fetch sản phẩm từ Supabase
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

      // Gộp quantity với data Supabase
      const merged = data.map((product) => {
        const cartItem = cart.find((c) => c.id === product.id);
        return { ...product, quantity: cartItem.quantity };
      });

      setCartItems(merged);
    };

    fetchProducts();
  }, []);

  // ⭐ Lưu giỏ hàng vào localStorage khi cập nhật
  const updateLocalStorage = (items) => {
    const cart = items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // ⭐ Tăng số lượng
  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCartItems(updated);
    updateLocalStorage(updated);
  };

  // ⭐ Giảm số lượng (không giảm dưới 1)
  const decreaseQty = (id) => {
    const updated = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updated);
    updateLocalStorage(updated);
  };

  // ⭐ Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    updateLocalStorage(updated);
  };

  // ⭐ Tổng tiền
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto", padding: "20px" }}>
      <h2>🛒 Giỏ hàng của bạn</h2>

      {cartItems.length === 0 ? (
        <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #ddd",
                gap: "20px",
              }}
            >
              {/* Hình ảnh */}
              <img src={item.image} alt="" style={{ width: "80px" }} />

              {/* Tên & giá */}
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0 }}>{item.title}</h4>
                <p style={{ margin: 0, color: "#e63946" }}>${item.price}</p>
              </div>

              {/* Tăng giảm số lượng */}
              <div>
                <button
                  onClick={() => decreaseQty(item.id)}
                  style={{
                    padding: "4px 8px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  -
                </button>

                <span style={{ margin: "0 10px", fontSize: "18px" }}>
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item.id)}
                  style={{
                    padding: "4px 8px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>

              {/* Nút xóa */}
              <button
                onClick={() => removeItem(item.id)}
                style={{
                  marginLeft: "20px",
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Xóa
              </button>
            </div>
          ))}

          {/* Tổng tiền */}
          <h3 style={{ marginTop: "20px" }}>
            Tổng tiền:{" "}
            <span style={{ color: "#e63946" }}>${total.toFixed(2)}</span>
          </h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
