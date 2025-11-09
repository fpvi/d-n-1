// admin/views/categories.js
import * as Mcategory from "../models/categories.js";
export async function listCategories() {
    const table = document.getElementById("categoryTable");
    if (!table) return;

    const categories = await Mcategory.getCategories();

    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Mô tả</th>
            <th>Sửa</th>
            <th>Xóa</th>
        </tr>
    `;

    categories.forEach(c => {
        table.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>${c.description}</td>
                <td><a href="#" class="edit-btn" data-id="${c.id}">Sửa</a></td>
                <td><a href="#" class="delete-btn" data-id="${c.id}">Xóa</a></td>
            </tr>
        `;
    });

    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const id = btn.dataset.id;
            editCategories(id);
        });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            const id = btn.dataset.id;
            if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
                const ok = await Mcategory.deleteCategories(id);
                if (ok) {
                    alert("Xóa thành công!");
                    listCategories();
                } else {
                    alert("Xóa thất bại!");
                }
            }
        });
    });
}


export function addCategories() {
    const btnAdd = document.querySelector(".submit-link");
    if (!btnAdd) return;

    btnAdd.addEventListener("click", async (e) => {
        e.preventDefault();

        const id = document.getElementById("catId").value.trim();
        const name = document.getElementById("catName").value.trim();
        const description = document.getElementById("catDesc").value.trim();

        if (!id || !name || !description) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const category = { id, name, description };

        const ok = await Mcategory.addCategories(category);
        if (ok) {
            alert("Thêm danh mục thành công!");
            listCategories();
        } else {
            alert("Thêm thất bại!");
        }

       
        document.getElementById("catId").value = "";
        document.getElementById("catName").value = "";
        document.getElementById("catDesc").value = "";
    });
}


async function editCategories(id) {
    const category = await Mcategory.getCategoryById(id);
    const name = prompt("Nhập tên danh mục mới:", category.name);
    const description = prompt("Nhập mô tả mới:", category.description);

    if (name !== null && description !== null) {
        const updated = { ...category, name, description };
        const ok = await Mcategory.editCategories(id, updated);
        if (ok) {
            alert("Cập nhật thành công!");
            listCategories();
        } else {
            alert("Cập nhật thất bại!");
        }
    }
}
