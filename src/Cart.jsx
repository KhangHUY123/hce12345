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

  // HÀM XỬ LÝ THANH TOÁN: Vẫn giữ nguyên chuyển hướng đến "/payment"
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      // Thay thế alert() bằng một thông báo trên UI thực tế (dùng modal hoặc toast)
      console.log("Giỏ hàng trống!");
      return;
    }
    navigate("/payment");
  };

  return (
    <div
      style={{
        maxWidth: "600px", // Thu nhỏ kích thước tối đa
        margin: "10px auto", // Giảm margin
        padding: "15px 20px",
        backgroundColor: "#ffffff", // Nền trắng hiện đại
        borderRadius: "12px", // Bo tròn hơn
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)", // Shadow tinh tế
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#2c3e50",
          marginBottom: "20px",
          fontSize: "1.5em", // Giảm cỡ chữ tiêu đề
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          fontWeight: "600",
          borderBottom: "1px solid #e0e0e0",
          paddingBottom: "15px",
        }}
      >
        <span role="img" aria-label="shopping cart">
          🛒
        </span>
        Giỏ hàng của bạn
      </h2>

      {cartItems.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontSize: "1em",
            color: "#666",
            padding: "20px",
          }}
        >
          Chưa có sản phẩm nào trong giỏ hàng.
        </p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0", // Giảm padding item
                borderBottom: "1px solid #f0f0f0", // Đường kẻ mỏng
                gap: "15px", // Giảm gap
                marginBottom: "0",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "60px", // Thu nhỏ ảnh
                  height: "60px", // Thu nhỏ ảnh
                  objectFit: "cover",
                  borderRadius: "4px", // Giảm bo tròn
                  border: "1px solid #e0e0e0",
                }}
              />

              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "1em", // Giảm cỡ chữ
                    color: "#333",
                    fontWeight: "600",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    margin: 0,
                    color: "#c0392b", // Màu đỏ đậm hơn
                    fontWeight: "bold",
                    fontSize: "0.95em", // Giảm cỡ chữ
                  }}
                >
                  {formatCurrency(item.price)}
                </p>
              </div>

              {/* Quantity Control */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "6px", // Bo tròn hơn
                  overflow: "hidden",
                  minWidth: "80px", // Thu hẹp min width
                  backgroundColor: "#f7f7f7",
                }}
              >
                <button
                  onClick={() => decreaseQty(item.id)}
                  style={{
                    background: "#e0e0e0",
                    border: "none",
                    padding: "6px 8px",
                    cursor: "pointer",
                    fontSize: "1em",
                    borderRight: "1px solid #ccc",
                    transition: "background 0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#ccc")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "#e0e0e0")
                  }
                >
                  −
                </button>
                <span
                  style={{
                    padding: "6px 0",
                    textAlign: "center",
                    width: "30px",
                    fontSize: "0.9em",
                    color: "#333",
                  }}
                >
                  {item.quantity || 0}
                </span>
                <button
                  onClick={() => increaseQty(item.id)}
                  style={{
                    background: "#e0e0e0",
                    border: "none",
                    padding: "6px 8px",
                    cursor: "pointer",
                    fontSize: "1em",
                    borderLeft: "1px solid #ccc",
                    transition: "background 0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#ccc")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "#e0e0e0")
                  }
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                style={{
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "8px 10px", // Rút gọn padding
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.85em", // Giảm cỡ chữ
                  fontWeight: "500",
                  transition: "background-color 0.2s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#c0392b")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e74c3c")
                }
              >
                Xóa
              </button>
            </div>
          ))}

          {/* Total Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between", // Căn 2 bên
              alignItems: "center",
              marginTop: "15px",
              borderTop: "2px dashed #e0e0e0", // Đường kẻ dashed
              paddingTop: "15px",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1.2em", color: "#333" }}>
              Tổng tiền:
            </h3>
            <span
              style={{
                color: "#c0392b",
                fontWeight: "bold",
                fontSize: "1.3em",
              }}
            >
              {formatCurrency(total)}
            </span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            style={{
              padding: "14px 20px", // Tăng chiều cao nút checkout
              backgroundColor: "#3498db", // Màu xanh dương cho hành động
              color: "white",
              border: "none",
              borderRadius: "10px", // Bo tròn nhiều hơn
              cursor: "pointer",
              marginTop: "20px",
              width: "100%",
              fontSize: "1.1em",
              fontWeight: "600",
              transition: "background-color 0.2s ease, transform 0.1s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#2980b9")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#3498db")
            }
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.99)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Tiến hành Thanh toán
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
