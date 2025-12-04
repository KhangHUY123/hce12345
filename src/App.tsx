import "./styles.css";
// @ts-ignore
import Home from "./Home";
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import Trang1 from "./Trang1";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";
// @ts-ignore
import ListProducts_SP from "./ListProducts_SP";
// @ts-ignore
import Trang2 from "./Trang2";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// @ts-ignore
import LoginPage from "./LoginPage";
// @ts-ignore
import LogoutPage from "./LogoutPage";
// @ts-ignore
import ProtectedRoute from "./ProtectedRoute";
// @ts-ignore
import ListProducts_SP_Admin from "./ListProducts_SP_Admin";

import AboutPage from "./AboutPage";

// ⭐ GIỎ HÀNG
// @ts-ignore
import Cart from "./Cart";
// @ts-ignore
import PaymentPage from "./PaymentPage";

// ⭐⭐ TRANG LIÊN HỆ — vừa thêm
import ContactPage from "./ContactPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROUTE CHA (có header + footer) */}
        <Route path="/" element={<Layout />}>
          {/* Trang Home */}
          <Route index element={<ListProducts_SP />} />

          {/* About Page */}
          <Route path="about" element={<AboutPage />} />

          {/* ⭐⭐ Contact Page */}
          <Route path="contact" element={<ContactPage />} />

          {/* Trang chi tiết sản phẩm */}
          <Route path="sanpham/:id" element={<Chitietsanpham />} />
          <Route path="Chitietsanpham" element={<Chitietsanpham />} />

          {/* Trang khác */}
          <Route path="trang2" element={<Trang2 />} />

          {/* Giỏ hàng */}
          <Route path="cart" element={<Cart />} />

          {/* Thanh toán */}
          <Route path="payment" element={<PaymentPage />} />

          {/* Login / Logout */}
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LogoutPage />} />

          {/* Admin */}
          <Route
            path="admin/products"
            element={
              <ProtectedRoute roleRequired="admin">
                <ListProducts_SP_Admin />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
