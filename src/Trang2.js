import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const HomePage = () => {
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();

  // === FETCH PRODUCT (Limit to 4 products) ===
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .order("id", { ascending: true })
          .limit(4); // Now it limits the product to only 4
        if (error) throw error;

        setListProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "0 20px" }}>
      {/* ==== CATEGORY BUTTONS ==== */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            marginRight: "20px",
          }}
        >
          <option value="Adidas">Adidas</option>
        </button>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          <option value="Nike nữ">Nike</option>
        </button>
      </div>

      {/* ==== PROMOTIONAL BANNER ==== */}
      <div
        style={{
          width: "100%",
          height: "350px",
          backgroundImage:
            "url('https://cdn.shopify.com/s/files/1/0456/5070/6581/files/LP_NIKE_T9_VOMERO18_MB_V.jpg?v=1758013163&width=1280')", // Replace with your banner image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            color: "#fff",
            fontSize: "2rem",
            fontWeight: "bold",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
          }}
        >
          Bộ Sưu Tập Mới
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "20px",
            color: "#fff",
            fontSize: "1.2rem",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
          }}
        >
          VOMERO 18 - Đệm Tối Ưu Cho Trải Nghiệm Tối Ưu
        </div>
        <button
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            padding: "10px 15px",
            backgroundColor: "#e63946",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Mua Ngay
        </button>
      </div>

      {/* ==== PRODUCT LIST ==== */}
      <h2
        style={{
          marginBottom: "25px",
          fontSize: "2rem",
          color: "#333",
          textAlign: "center",
        }}
      >
        Bộ Sưu Tập Nổi Bật
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "25px",
          justifyContent: "center",
        }}
      >
        {listProduct.map((p) => (
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
              {p.price.toLocaleString()}₫
            </p>
            {/* Promotion Badge */}
            <div
              style={{
                backgroundColor: "#f1c40f",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "5px",
                fontWeight: "bold",
                fontSize: "0.9rem",
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            >
              50% OFF
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
