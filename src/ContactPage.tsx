import React, { useState, ChangeEvent, FormEvent } from "react";

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("🎉 Gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Liên Hệ Với Chúng Tôi</h2>

      <div className="contact-content">
        {/* Form liên hệ */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Tên của bạn</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Tin nhắn</label>
          <textarea
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="contact-btn">
            Gửi Ngay
          </button>
        </form>

        {/* Thông tin + Google Map */}
        <div className="contact-info">
          <h3>Địa Chỉ Cửa Hàng</h3>
          <p>Trường Cao đẳng Kinh tế TP.HCM</p>
          <p>📞 0123 456 789</p>
          <p>📧 support@khclothing.com</p>

          {/* MAP ĐÚNG LINK BẠN ĐƯA */}
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.4957378682593!2d106.6707558748567!3d10.764870089383205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ee10bef3c07%3A0xfd59127e8c2a3e0!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEtpbmggdOG6vyBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e1!3m2!1svi!2s!4v1764858947534!5m2!1svi!2s"
            width="100%"
            height="260"
            style={{ border: 0, marginTop: "10px", borderRadius: "8px" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
