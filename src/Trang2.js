import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const HomePage = () => {
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();

  // === SLIDER DATA ===
  const slides = [
    {
      image:
        "https://thietkewebchuyen.com/wp-content/uploads/thiet-ke-banner-website-anh-bia-Facebook-shop-thoi-trang-quan-ao-4.jpg",
      title: "Chào mừng đến với trang chủ của chúng tôi!",
      subtitle: "Khám phá các sản phẩm nổi bật!",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXaHf1hHNZ4-ardGu1OK7m9XQEEkC9YVTJ4Q&s",
      title: "Khuyến mãi hấp dẫn!",
      subtitle: "Sản phẩm giảm giá sốc hôm nay!",
    },
    {
      image: "https://via.placeholder.com/1200x350/00ccff",
      title: "Sản phẩm mới cập bến!",
      subtitle: "Xu hướng mới nhất dành cho bạn!",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  const navBtnStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255, 255, 255, 0.7)",
    border: "none",
    padding: "10px 15px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "bold",
    transition: "0.3s",
  };

  // === FETCH PRODUCT ===
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .order("id", { ascending: true })
          .limit(4);
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
      {/* ==== SLIDER ==== */}
      <div style={{ width: "100%", marginBottom: "30px" }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "10px",
            height: "350px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: `${slides.length * 100}%`,
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: "transform 0.6s ease",
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                style={{
                  width: "100%",
                  flexShrink: 0,
                  height: "350px",
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#000",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <div>
                  <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                    {slide.title}
                  </h1>
                  <p style={{ fontSize: "1.25rem" }}>{slide.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Nút Prev */}
          <button onClick={prevSlide} style={{ ...navBtnStyle, left: "10px" }}>
            ❮
          </button>

          {/* Nút Next */}
          <button onClick={nextSlide} style={{ ...navBtnStyle, right: "10px" }}>
            ❯
          </button>
        </div>

        {/* Dots */}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          {slides.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrentSlide(i)}
              style={{
                height: "12px",
                width: "12px",
                margin: "0 5px",
                backgroundColor: currentSlide === i ? "#333" : "#bbb",
                borderRadius: "50%",
                display: "inline-block",
                cursor: "pointer",
                transition: "0.3s",
              }}
            ></span>
          ))}
        </div>
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
        Sản phẩm nổi bật
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

export default HomePage;
