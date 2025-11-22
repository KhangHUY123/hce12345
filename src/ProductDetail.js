import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  // ⭐ Lấy dữ liệu sản phẩm theo ID từ Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", err.message);
      }
    };

    fetchProduct();
  }, [id]);

  // ⭐ Thêm sản phẩm vào giỏ hàng
  const addToCart = () => {
    if (!product) {
      alert("Sản phẩm không hợp lệ.");
      return;
    }

    // Lấy giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Nếu có, tăng số lượng
      cart[existingProductIndex].quantity += 1;
      console.log(
        `Sản phẩm ${product.title} đã có trong giỏ hàng, số lượng đã được tăng.`
      );
    } else {
      // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
      console.log(`Đã thêm sản phẩm ${product.title} vào giỏ hàng.`);
    }

    // Lưu lại giỏ hàng vào localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  };

  if (!product) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Quay lại danh sách
      </button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          alignItems: "flex-start",
        }}
      >
        {/* Hình ảnh sản phẩm */}
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Thông tin chi tiết */}
        <div style={{ flex: "1 1 300px" }}>
          <h2 style={{ marginBottom: "10px" }}>{product.title}</h2>
          <p
            style={{ fontSize: "1.2rem", color: "#e63946", fontWeight: "bold" }}
          >
            ${product.price}
          </p>

          <p style={{ marginTop: "10px", color: "#555" }}>
            ⭐ {product.rating_rate} ({product.rating_count} đánh giá)
          </p>

          <p
            style={{
              marginTop: "20px",
              lineHeight: "1.6",
              color: "#333",
              textAlign: "justify",
            }}
          >
            {product.description || "Chưa có mô tả cho sản phẩm này."}
          </p>

          {/* NÚT THÊM VÀO GIỎ HÀNG */}
          <button
            style={{
              marginTop: "20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={addToCart}
          >
            🛒 Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
