import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import "./assets/css/quanlysp.css";

const ListProducts_SP_Admin = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    rating_rate: "",
    rating_count: "",
  });

  const navigate = useNavigate();

  // ───────────────────────────────────────────
  // 🟦 KIỂM TRA QUYỀN ADMIN (BẮT BUỘC)
  // ───────────────────────────────────────────
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);
    if (user.role !== 1) {
      navigate("/");
    }
  }, []);
  // ───────────────────────────────────────────

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("product1")
      .select("*")
      .order("id", { ascending: true });
    if (!error) setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ───────────────────────────────────────────
  // 🟥 ĐĂNG XUẤT
  // ───────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("product1").insert([newProduct]);
    if (!error) {
      alert("Thêm sản phẩm thành công!");
      setNewProduct({
        title: "",
        price: "",
        image: "",
        rating_rate: "",
        rating_count: "",
      });
      fetchProducts();
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const { id, ...updated } = editingProduct;
    const { error } = await supabase
      .from("product1")
      .update(updated)
      .eq("id", id);

    if (!error) {
      alert("Cập nhật thành công!");
      setEditingProduct(null);
      fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa?")) {
      const { error } = await supabase.from("product1").delete().eq("id", id);
      if (!error) fetchProducts();
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Nút đăng xuất */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          Đăng xuất
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700 drop-shadow-sm">
        🛠️ Quản Lý Sản Phẩm (Admin)
      </h2>

      {/* Form Thêm / Sửa */}
      <form
        onSubmit={editingProduct ? handleEdit : handleAdd}
        className="bg-white shadow-xl rounded-xl p-6 mb-10 max-w-2xl mx-auto border border-gray-200"
      >
        <h3 className="text-xl font-semibold mb-5 text-gray-700 flex items-center gap-2">
          {editingProduct ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm mới"}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="title"
            placeholder="Tên sản phẩm"
            value={editingProduct ? editingProduct.title : newProduct.title}
            onChange={handleChange}
            className="input-admin"
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Giá"
            value={editingProduct ? editingProduct.price : newProduct.price}
            onChange={handleChange}
            className="input-admin"
            required
          />
          <input
            name="image"
            placeholder="URL ảnh"
            value={editingProduct ? editingProduct.image : newProduct.image}
            onChange={handleChange}
            className="input-admin col-span-2"
          />
          <input
            name="rating_rate"
            type="number"
            step="0.1"
            placeholder="Đánh giá"
            value={
              editingProduct
                ? editingProduct.rating_rate
                : newProduct.rating_rate
            }
            onChange={handleChange}
            className="input-admin"
          />
          <input
            name="rating_count"
            type="number"
            placeholder="Số lượt đánh giá"
            value={
              editingProduct
                ? editingProduct.rating_count
                : newProduct.rating_count
            }
            onChange={handleChange}
            className="input-admin"
          />
        </div>

        <div className="flex justify-end mt-6 gap-2">
          {editingProduct && (
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="btn-gray"
            >
              Hủy
            </button>
          )}
          <button type="submit" className="btn-blue">
            {editingProduct ? "Lưu thay đổi" : "Thêm sản phẩm"}
          </button>
        </div>
      </form>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="card-admin">
            <img src={p.image} alt={p.title} className="product-img" />
            <h4 className="product-title">{p.title}</h4>
            <p className="product-price">${p.price}</p>
            <p className="product-rating">
              ⭐ {p.rating_rate} ({p.rating_count})
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => setEditingProduct(p)}
                className="btn-yellow"
              >
                Sửa
              </button>
              <button onClick={() => handleDelete(p.id)} className="btn-red">
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts_SP_Admin;
