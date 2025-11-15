import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
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

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("product1")
      .select("*")
      .order("id", { ascending: true });
    if (error) console.error("Lỗi khi tải sản phẩm:", error.message);
    else setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
    if (error) alert("❌ Lỗi khi thêm sản phẩm: " + error.message);
    else {
      alert("✅ Thêm sản phẩm thành công!");
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
    if (error) alert("❌ Lỗi khi cập nhật sản phẩm: " + error.message);
    else {
      alert("✅ Cập nhật sản phẩm thành công!");
      setEditingProduct(null);
      fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      const { error } = await supabase.from("product1").delete().eq("id", id);
      if (error) alert("❌ Lỗi khi xóa sản phẩm: " + error.message);
      else {
        alert("🗑️ Đã xóa sản phẩm!");
        fetchProducts();
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold mb-8 text-center text-blue-600">
        🛠️ Quản lý sản phẩm (Admin)
      </h2>

      {/* Form thêm/sửa sản phẩm */}
      <form
        onSubmit={editingProduct ? handleEdit : handleAdd}
        className="bg-white shadow-md rounded-lg p-6 mb-10 max-w-2xl mx-auto"
      >
        <h3 className="text-xl font-medium mb-4">
          {editingProduct ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm mới"}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="title"
            placeholder="Tên sản phẩm"
            value={editingProduct ? editingProduct.title : newProduct.title}
            onChange={handleChange}
            className="border rounded-md p-2"
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Giá"
            value={editingProduct ? editingProduct.price : newProduct.price}
            onChange={handleChange}
            className="border rounded-md p-2"
            required
          />
          <input
            name="image"
            placeholder="URL hình ảnh"
            value={editingProduct ? editingProduct.image : newProduct.image}
            onChange={handleChange}
            className="border rounded-md p-2 col-span-2"
          />
          <input
            name="rating_rate"
            type="number"
            step="0.1"
            placeholder="Đánh giá (0–5)"
            value={
              editingProduct
                ? editingProduct.rating_rate
                : newProduct.rating_rate
            }
            onChange={handleChange}
            className="border rounded-md p-2"
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
            className="border rounded-md p-2"
          />
        </div>

        <div className="flex justify-end mt-4 gap-2">
          {editingProduct && (
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Hủy
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {editingProduct ? "Lưu thay đổi" : "Thêm sản phẩm"}
          </button>
        </div>
      </form>

      {/* Danh sách sản phẩm dạng Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-sm rounded-xl p-4 border hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-center mb-3">
              <img
                src={p.image}
                alt={p.title}
                width="80"
                className="w-20 h-20 object-cover rounded-md border"
              />
            </div>
            <h4 className="font-semibold text-md mb-1 text-gray-800 truncate">
              {p.title}
            </h4>
            <p className="text-red-500 font-bold mb-1">${p.price}</p>
            <p className="text-sm text-gray-600 mb-3">
              ⭐ {p.rating_rate} ({p.rating_count})
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => setEditingProduct(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 text-sm"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
              >
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
