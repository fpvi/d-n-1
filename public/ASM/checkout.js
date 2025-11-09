const vouchers = [
  { code: "BLACKFRIDAY", discount: 20, maxDiscount: 50000 },
  { code: "NEWYEAR", discount: 15, maxDiscount: 30000 },
  { code: "SUMMER2023", discount: 10, maxDiscount: 10000 }
];

const cart = JSON.parse(localStorage.getItem("cart") || "[]");
let selectedVoucherCode = localStorage.getItem("selectedVoucher") || "";

function calcSubtotal() {
  return cart.reduce((s, p) => s + p.price * p.quantity, 0);
}

function updateSummary() {
  const sub = calcSubtotal();
  const ship = parseInt(document.getElementById("shipping").value || 0);
  let discount = 0;
  if (selectedVoucherCode) {
    let v = vouchers.find(v => v.code === selectedVoucherCode);
    if (v) {
      discount = Math.min((sub * v.discount) / 100, v.maxDiscount);
    }
  }
  document.getElementById("subtotal").textContent = "₫" + sub.toLocaleString();
  document.getElementById("shipfee").textContent = "₫" + ship.toLocaleString();
  document.getElementById("discount").textContent = "-₫" + discount.toLocaleString();
  document.getElementById("grandtotal").textContent = "₫" + (sub + ship - discount).toLocaleString();
}

// gán tạm giá trị mã đơn hàng và ngày đặt khi load
document.getElementById("orderid").textContent = "DH" + Math.floor(Math.random() * 1000000);
document.getElementById("orderdate").textContent = new Date().toLocaleString("vi-VN");

// hiển thị tóm tắt
updateSummary();

function goBackCart() {
  window.location.href = "card.html";
}

function placeOrder() {
  alert("Đặt hàng thành công!");
}

// Mảng phí vận chuyển (ví dụ)
const shippingOptions = [
  { id: "fast", name: "Giao nhanh (1-2 ngày)", price: 30000 },
  { id: "standard", name: "Giao tiêu chuẩn (3-5 ngày)", price: 15000 },
  { id: "free", name: "Giao tiết kiệm (5-7 ngày)", price: 0 }
];

// Đổ dữ liệu khi load trang
document.addEventListener("DOMContentLoaded", () => {
  // Đổ phí vận chuyển
  const shipSelect = document.getElementById("shipping");
  shippingOptions.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt.price; // value là giá ship
    option.textContent = `${opt.name} - ₫${opt.price.toLocaleString()}`;
    shipSelect.appendChild(option);
  });

  // Đổ voucher
  const voucherSelect = document.getElementById("voucher");
  vouchers.forEach(v => {
    const option = document.createElement("option");
    option.value = v.code;
    option.textContent = `${v.code} - Giảm ${v.discount}% (tối đa ₫${v.maxDiscount.toLocaleString()})`;
    if (v.code === selectedVoucherCode) option.selected = true;
    voucherSelect.appendChild(option);
  });

  // Event change cho select
  shipSelect.addEventListener("change", updateSummary);
  voucherSelect.addEventListener("change", e => {
    selectedVoucherCode = e.target.value;
    localStorage.setItem("selectedVoucher", selectedVoucherCode);
    updateSummary();
  });
});
