// admin/models/categories.js

// Lấy toàn bộ danh mục
export async function getCategories() {
    const res = await fetch("http://localhost:3000/categories");
    return await res.json();
}

// Lấy 1 danh mục theo id
export async function getCategoryById(id) {
    const res = await fetch(`http://localhost:3000/categories/${id}`);
    return await res.json();
}

// Thêm danh mục mới
export async function addCategories(category) {
    const res = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category)
    });
    return res.ok;
}

// Sửa danh mục
export async function editCategories(id, category) {
    const res = await fetch(`http://localhost:3000/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category)
    });
    return res.ok;
}

// Xóa danh mục
export async function deleteCategories(id) {
    const res = await fetch(`http://localhost:3000/categories/${id}`, {
        method: "DELETE"
    });
    return res.ok;
}
