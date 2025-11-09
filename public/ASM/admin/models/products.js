// models/products.js

const getAllProducts = async () => {
    try {
        let res = await fetch("http://localhost:3000/products");
        if (!res.ok) throw new Error("Lỗi mạng khi lấy sản phẩm");
        return await res.json();
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getProductById = async (id) => {
    try {
        let res = await fetch(`http://localhost:3000/products/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
        return await res.json();
    } catch (err) {
        console.log(err);
        return null;
    }
};

const addProduct = async (product) => {
    try {
        let res = await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        return res.ok;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const editProduct = async (id, product) => {
    try {
        let res = await fetch(`http://localhost:3000/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        return res.ok;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const deleteProduct = async (id) => {
    try {
        let res = await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE",
        });
        return res.ok;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export { getAllProducts, getProductById, addProduct, editProduct, deleteProduct };
