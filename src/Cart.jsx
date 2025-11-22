import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [total, setTotal] = useState(0);

  // Kiểm tra trạng thái đăng nhập với Supabase v2
  useEffect(() => {
    const checkLogin = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLogin();

    // Theo dõi thay đổi trạng thái đăng nhập
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Load giỏ hàng và fetch sản phẩm từ Supabase
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
        return { ...product, quantity: cartItem.quantity };
      });

      setCartItems(merged);
    };

    fetchProducts();
  }, []);

  // Cập nhật localStorage khi giỏ hàng thay đổi
  const updateLocalStorage = (items) => {
    const cart = items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Tính tổng tiền
  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  // Các hàm tăng/giảm/xóa sản phẩm
  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);
    updateLocalStorage(updated);
  };

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

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    updateLocalStorage(updated);
  };

  // Xử lý thanh toán
  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để thanh toán.");
      navigate("/login");
      return;
    }

    setPaymentSuccess(true);
    localStorage.removeItem("cart");
    setCartItems([]);
  };

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
              <img src={item.image} alt="" style={{ width: "80px" }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0 }}>{item.title}</h4>
                <p style={{ margin: 0, color: "#e63946" }}>${item.price}</p>
              </div>
              <div>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                }}
              >
                Xóa
              </button>
            </div>
          ))}

          <h3 style={{ marginTop: "20px" }}>
            Tổng tiền:{" "}
            <span style={{ color: "#e63946" }}>${total.toFixed(2)}</span>
          </h3>

          <button
            onClick={handleCheckout}
            style={{
              padding: "12px 25px",
              backgroundColor: "#2ecc71",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Thanh toán
          </button>

          {paymentSuccess && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                backgroundColor: "#2ecc71",
                color: "white",
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
              Thanh toán thành công! Cảm ơn bạn đã mua sắm.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
