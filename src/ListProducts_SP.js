import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Đảm bảo file này tồn tại và được export (hoặc bạn đã tạo custom.d.ts)
import { supabase } from "./supabaseClient";

const ListProducts_SP = () => {
  const [listProduct, setListProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState(""); // Bộ lọc theo loại
  const [gender, setGender] = useState(""); // Bộ lọc theo giới tính (Nam, Nữ)
  const navigate = useNavigate();

  // Hàm lấy sản phẩm từ Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .order("id", { ascending: true });
        if (error) throw error;

        setListProduct(data);
        setFilteredProducts(data); // Cập nhật filtered products
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err.message);
      }
    };
    fetchProducts();
  }, []);

  // Hàm lọc sản phẩm theo tìm kiếm và bộ lọc
  useEffect(() => {
    const filterProducts = () => {
      let filtered = listProduct;

      // Lọc theo tên sản phẩm (tìm kiếm)
      if (searchQuery) {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Lọc theo danh mục (Áo vest, Áo khoác, ...)
      if (category) {
        filtered = filtered.filter((product) => product.category === category);
      }

      // Lọc theo giới tính (Nam, Nữ)
      if (gender) {
        filtered = filtered.filter((product) => product.gender === gender);
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [searchQuery, category, gender, listProduct]);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2
        style={{
          marginBottom: "25px",
          fontSize: "1.8rem",
          color: "#333",
          textAlign: "center",
        }}
      >
        Danh sách sản phẩm
      </h2>

      {/* Tìm kiếm */}
      <div style={{ marginBottom: "20px", textAlign: "left" }}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            fontSize: "1rem",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      {/* Bộ lọc sản phẩm */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        >
          <option value="">Chọn danh mục</option>
          <option value="Áo vest">Áo vest</option>
          <option value="Áo khoác">Áo khoác</option>
          <option value="Quần">Quần</option>
          <option value="Giày">Giày</option>
        </select>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        >
          <option value="">Chọn giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>

      {/* Danh sách sản phẩm */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "25px",
          justifyContent: "center",
        }}
      >
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/sanpham/${p.id}`)}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "15px",
              textAlign: "center",
              cursor: "pointer",
              background: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              display: "flex",
              flexDirection: "column",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            }}
          >
            <div
              style={{
                width: "100%",
                height: "220px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
                marginBottom: "10px",
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <h4
              style={{
                margin: "10px 0 8px",
                fontSize: "1.1rem",
                color: "#333",
                flexGrow: "1",
              }}
            >
              {p.title}
            </h4>
            <p
              style={{
                color: "#e63946",
                fontWeight: "bold",
                margin: "0 0 5px",
                fontSize: "1.15rem",
              }}
            >
              ${typeof p.price === "number" ? p.price.toFixed(2) : p.price}
            </p>
            <small style={{ color: "#777", fontSize: "0.9rem" }}>
              ⭐ {p.rating_rate} | ({p.rating_count} đánh giá)
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts_SP;
