// import products from "./data/products";
import { products } from "./data/product";
import React from "react";
import { useNavigate } from "react-router-dom";
const Trang1 = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách sản phẩm</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/sanpham/${p.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />
            <h4>{p.title}</h4>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Trang1;
