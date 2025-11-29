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
import ListProducts from "./ListProducts";
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

// ⭐ THÊM GIỎ HÀNG
// @ts-ignore
import Cart from "./Cart";
// @ts-ignore
import PaymentPage from "./PaymentPage"; // Import the PaymentPage component

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROUTE CHA: LAYOUT */}
        <Route path="/" element={<Layout />}>
          {/* Trang Chủ */}
          <Route index element={<ListProducts_SP />} />
          {/* Trang Chi tiết Sản phẩm */}
          <Route path="sanpham/:id" element={<Chitietsanpham />} />
          {/* ROUTE THỪA - vẫn giữ */}
          <Route path="Chitietsanpham" element={<Chitietsanpham />} />
          <Route path="trang2" element={<Trang2 />} />
          {/* ⭐ TRANG GIỎ HÀNG */}
          <Route path="cart" element={<Cart />} />
          {/* Trang thanh toán */}
          <Route path="payment" element={<PaymentPage />} />{" "}
          {/* Added PaymentPage route */}
          {/* Trang đăng nhập */}
          <Route path="login" element={<LoginPage />} />
          {/* Trang đăng xuất */}
          <Route path="logout" element={<LogoutPage />} />
          {/* Trang Admin */}
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
