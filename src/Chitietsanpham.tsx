import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//@ts-ignore
import { supabase } from "./supabaseClient";

// 1. ĐỊNH NGHĨA INTERFACE (KIỂU DỮ LIỆU) CHO SẢN PHẨM
interface ProductData {
  id: number;
  title: string;
  price: number | string;
  image: string;
  description: string;
  rating_rate: number;
  rating_count: number;
}

type ProductState = ProductData | null;

const Chitietsanpham: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductState>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Giỏ hàng - state localStorage hoặc context nếu cần
  const [cart, setCart] = useState<ProductData[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (!id) {
      setError("Không tìm thấy ID sản phẩm.");
      setLoading(false);
      return;
    }

    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .eq("id", id)
          .single();

        if (error && error.code !== "PGRST116") {
          throw error;
        }

        if (data) {
          setProduct(data as ProductData);
        } else {
          setProduct(null);
        }
      } catch (err: unknown) {
        const errorMessage =
          (err as Error)?.message || "Đã xảy ra lỗi không xác định.";
        console.error("Lỗi khi lấy chi tiết sản phẩm:", errorMessage);
        setError("Lỗi khi tải dữ liệu chi tiết sản phẩm: " + errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [id]);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product: ProductData) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Lưu giỏ hàng vào localStorage
      return updatedCart;
    });
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Đang tải chi tiết sản phẩm...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          color: error ? "red" : "inherit",
        }}
      >
        <h3>{error || "Sản phẩm không tồn tại."}</h3>
        <button
          onClick={() => navigate(-1)}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "8px 15px",
          cursor: "pointer",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        &larr; Quay lại danh sách
      </button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          border: "1px solid #eee",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ flex: "1 1 300px" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        <div style={{ flex: "2 1 400px" }}>
          <h1 style={{ fontSize: "2rem", margin: "0 0 10px" }}>
            {product.title}
          </h1>

          <p
            style={{
              color: "#e74c3c",
              fontWeight: "bold",
              fontSize: "1.8rem",
              margin: "5px 0 15px",
            }}
          >
            $
            {typeof product.price === "number"
              ? product.price.toFixed(2)
              : product.price}
          </p>

          <div style={{ margin: "15px 0" }}>
            <span
              style={{
                color: "#f39c12",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              Đánh giá: ⭐ {product.rating_rate}
            </span>
            <small style={{ color: "#7f8c8d" }}>
              ({product.rating_count} lượt đánh giá)
            </small>
          </div>

          <h3
            style={{
              borderBottom: "2px solid #eee",
              paddingBottom: "5px",
              marginBottom: "10px",
              fontSize: "1.2rem",
              marginTop: "20px",
            }}
          >
            Mô tả
          </h3>
          <p style={{ lineHeight: "1.6", color: "#333" }}>
            {product.description || "Không có mô tả chi tiết."}
          </p>

          <button
            onClick={() => addToCart(product)} // Gọi hàm thêm vào giỏ hàng khi nhấn nút
            style={{
              padding: "12px 25px",
              backgroundColor: "#2ecc71",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chitietsanpham;
