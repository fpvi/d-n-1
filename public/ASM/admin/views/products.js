// views/products.js
import * as Product from "../models/products.js"; 

const table = document.getElementById("productTable");
const form = document.querySelector(".product-form");

// Hiển thị danh sách sản phẩm
export const listProducts = async () => {
    const products = await Product.getAllProducts();

    if (!products || products.length === 0) {
        table.innerHTML = `
        <tr><td colspan="7">Không có sản phẩm nào</td></tr>`;
        return;
    }

    table.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Tên</th>
        <th>Mô tả</th>
        <th>Giá</th>
        <th>Ảnh</th>
        <th colspan="2">Hành động</th>
      </tr>
    `;

    products.forEach((p) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${p.id}</td>
          <td>${p.name}</td>
          <td>${p.description}</td>
          <td>${p.price.toLocaleString("vi-VN")}đ</td>
          <td><img src="${p.image}" width="60"></td>
          <td><a href="#" class="edit-btn" data-id="${p.id}">Sửa</a></td>
          <td><a href="#" class="delete-btn" data-id="${p.id}">Xóa</a></td>
        `;
        table.appendChild(row);
    });

    attachEventListeners();
};

// Gán sự kiện sửa / xóa
const attachEventListeners = () => {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            const id = e.target.dataset.id;
            if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
                const ok = await Product.deleteProduct(id);
                if (ok) listProducts();
            }
        });
    });

    document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            const id = e.target.dataset.id;
            const product = await Product.getProductById(id);
            if (!product) return;
            form.dataset.editId = id;
            form.querySelector("[name='name']").value = product.name;
            form.querySelector("[name='description']").value = product.description;
            form.querySelector("[name='price']").value = product.price;
            form.querySelector("[name='image']").value = product.image;
        });
    });
};


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.querySelector("[name='name']").value.trim();
    const description = form.querySelector("[name='description']").value.trim();
    const price = Number(form.querySelector("[name='price']").value);
    const image = form.querySelector("[name='image']").value.trim();

    if (!name || !description || !price || !image) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    const product = { name, description, price, image };

    if (form.dataset.editId) {
        const ok = await Product.editProduct(form.dataset.editId, product);
        if (ok) {
            alert("Đã cập nhật sản phẩm!");
            delete form.dataset.editId;
        }
    } else {
        const ok = await Product.addProduct(product);
        if (ok) alert("Đã thêm sản phẩm mới!");
    }

    form.reset();
    listProducts();
});


document.addEventListener("DOMContentLoaded", listProducts);
