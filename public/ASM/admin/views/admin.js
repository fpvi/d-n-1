import * as Mproduct from "../models/products.js";

export async function renderProducts() {
  let products = await Mproduct.getProducts();

  // Nếu có localStorage thì ưu tiên lấy từ đó (vì có thể đã thêm sản phẩm mới)
  const stored = localStorage.getItem("products");
  if (stored) products = JSON.parse(stored);

  let html = `
    <table border="1" cellpadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên sản phẩm</th>
          <th>Hình ảnh</th>
          <th>Mô tả</th>
          <th>Giá</th>
          <th>Kích cỡ</th>
          <th>Sửa</th>
          <th>Xóa</th>
        </tr>
      </thead>
      <tbody>
  `;

  products.forEach((p) => {
    html += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td><img src="${p.image}" width="60"></td>
        <td>${p.description}</td>
        <td>${p.price.toLocaleString("vi-VN")}₫</td>
        <td>${p.size}</td>
        <td><button class="edit-btn" data-id="${p.id}">Sửa</button></td>
        <td><button class="delete-btn" data-id="${p.id}">Xóa</button></td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  document.getElementById("productTable").innerHTML = html;

  // Nút xóa
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      await Mproduct.deleteProduct(id);
      renderProducts();
    });
  });
}

// Thêm sản phẩm
document.getElementById("addProductForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const image = document.getElementById("image").value.trim();
  const description = document.getElementById("description").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const size = document.getElementById("size").value.trim();

  if (!name || !image || !description || !price || !size) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  await Mproduct.addProduct({ name, image, description, price, size });
  e.target.reset();
  renderProducts();
});

renderProducts();
