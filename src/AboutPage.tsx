import React from "react";

const AboutPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* ===== BANNER ===== */}
      <div
        style={{
          width: "100%",
          height: "350px",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519744792095-2f2205e87b6f')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          position: "relative",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            color: "#fff",
            fontSize: "2.5rem",
            fontWeight: "bold",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
          }}
        >
          Giới Thiệu Về Chúng Tôi
        </div>
      </div>

      {/* ===== SECTION GIỚI THIỆU ===== */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h1 style={{ fontSize: "2.3rem", marginBottom: "20px" }}>
          Chào Mừng Bạn Đến Với{" "}
          <span style={{ color: "#e63946" }}>Z Sneaker Store</span>
        </h1>

        <p style={{ fontSize: "1.15rem", lineHeight: "1.8", color: "#444" }}>
          Z Sneaker Store là hệ thống bán lẻ giày thể thao uy tín tại Việt Nam,
          mang đến những mẫu giày hot nhất từ các thương hiệu nổi tiếng như
          <strong> Nike, Adidas, Jordan, Puma</strong> và nhiều hơn nữa.
          <br />
          <br />
          Chúng tôi cung cấp các sản phẩm chính hãng, kiểu dáng xu hướng, phù
          hợp với mọi phong cách từ tập luyện, chạy bộ cho đến thời trang đường
          phố.
        </p>
      </div>

      {/* ===== TẦM NHÌN – SỨ MỆNH ===== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "30px",
          marginBottom: "50px",
        }}
      >
        {/* Tầm nhìn */}
        <div
          style={{
            padding: "20px",
            borderRadius: "10px",
            background: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            🎯 Tầm Nhìn
          </h3>
          <p style={{ color: "#555", lineHeight: "1.7" }}>
            Trở thành một trong những cửa hàng giày thể thao hàng đầu, mang đến
            sự thoải mái và phong cách cho mọi khách hàng.
          </p>
        </div>

        {/* Sứ mệnh */}
        <div
          style={{
            padding: "20px",
            borderRadius: "10px",
            background: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            🚀 Sứ Mệnh
          </h3>
          <p style={{ color: "#555", lineHeight: "1.7" }}>
            Mang đến sản phẩm chính hãng, chất lượng tốt nhất, dịch vụ chăm sóc
            khách hàng tận tâm và nhanh chóng.
          </p>
        </div>

        {/* Giá trị cốt lõi */}
        <div
          style={{
            padding: "20px",
            borderRadius: "10px",
            background: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            💎 Giá Trị Cốt Lõi
          </h3>
          <p style={{ color: "#555", lineHeight: "1.7" }}>
            Chất lượng – Uy tín – Tận tâm – Đổi mới để phục vụ khách hàng tốt
            nhất.
          </p>
        </div>
      </div>

      {/* ===== HÌNH ẢNH GIÀY ===== */}
      <h2
        style={{
          fontSize: "2rem",
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        Bộ Sưu Tập Đặc Trưng
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {[
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmrr19xljjnzqXjOvrYGzMQT3TDQ_8l5Qvaw&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRafj8bBu7g7O582CGNOnNAEsaA30Q-jfVi1w&s",
        ].map((img, index) => (
          <div
            key={index}
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={img}
              alt="product"
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>

      {/* ===== CAM KẾT ===== */}
      <div
        style={{
          marginTop: "50px",
          padding: "30px",
          backgroundColor: "#000",
          color: "#fff",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Cam Kết Từ Z Sneaker Store</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          ✔ Sản phẩm chính hãng 100%
          <br />
          ✔ Bảo hành 365 ngày
          <br />
          ✔ Hỗ trợ đổi trả linh hoạt
          <br />✔ Giao hàng nhanh toàn quốc
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
