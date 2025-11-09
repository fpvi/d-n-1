const product = [
  {
    id: 1,
    name: "Yacht–Master 42",
    image: "img/sp1.png",
    description: "42mm • Black Golden",
    price: 9200000,
    quantity: 1
  },
  {
    id: 2,
    name: "The Mirror",
    image: "img/sp2.png",
    description: "42mm • Silver Platinum",
    price: 5100000,
    quantity: 1
  },
  {
    id: 3,
    name: "Panerai",
    image: "img/sp3.png",
    description: "40mm • Silver Platinum",
    price: 4900000,
    quantity: 1
  },
  {
    id: 4,
    name: "Yacht–Master",
    image: "img/sp4.png",
    description: "37mm • Copper Platinum",
    price: 11250000,
    quantity: 1
  },
  {
    id: 5,
    name: "Submariner Date",
    image: "img/sp5.png",
    description: "42mm • Silver Platinum",
    price: 12100000,
    quantity: 1
  },
  {
    id:6,
    name: "Sky–Dweller Dark",
    image: "img/sp6.png",
    description: "42mm • Golden Platinum",
    price: 10250000,
    quantity: 1
  },
];


const vouchers = [
  { code: "BLACKFRIDAY", discount: 20, maxDiscount: 50000 },
  { code: "NEWYEAR", discount: 15, maxDiscount: 30000 },
  { code: "SUMMER2023", discount: 10, maxDiscount: 10000 }
];

let cart = [];

window.onload = () => {
  renderViewCart();
}

let renderViewCart = () => {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cart-list");
  if (cart.length === 0) {
    cartList.innerHTML = "<p>Giỏ hàng trống.</p>";
    return;
  }
  let viewCart_html = ``;
  let tamtinh = 0;
  cart.forEach((item, idx) => {
    viewCart_html += `<article class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="item-info">
            <div class="item-name">${item.name}</div>
            <div class="item-meta">Size: 50ml • Màu: Trắng</div>
            <div class="small">Mã SP: ${item.id}</div>
          </div>
          <div class="item-controls">
            <div class="price">₫${item.price.toLocaleString()}</div>
            <div class="qty">
              <label class="small">SL</label>
              <button onclick="changequantity(0,${idx})">-</button>
              <input type="number" min="1" value="${item.quantity}">
              <button onclick="changequantity(1,${idx})">+</button>
              <button class="remove" title="Xóa" onclick="removeItem(${idx})">✕</button>
            </div>
            <div class="subtotal">Thành: ₫${(item.price * item.quantity).toLocaleString()}</div>
          </div>
        </article>`;
    tamtinh += item.price * item.quantity;
  });

  let voucherOptions = `<option value="">-- Chọn voucher --</option>`;
  vouchers.forEach(v => {
    voucherOptions += `<option value="${v.code}">${v.code} - Giảm ${v.discount}% (tối đa ₫${v.maxDiscount.toLocaleString()})</option>`;
  });

  const shippingFee = 30000;
  let tongdon = tamtinh + shippingFee;

  let viewCart_html2 = `
    <h3>Tạm tính</h3>
    <div class="line"><div class="small">Tổng tiền hàng</div><div>₫${tamtinh.toLocaleString()}</div></div>

    <div>
      <div class="small" style="margin-bottom:8px">Chọn voucher</div>
      <div class="voucher">
        <select id="voucher-select">${voucherOptions}</select>
        <button class="btn ghost" onclick="applyVoucher()">Áp dụng</button>
      </div>
    </div> 

    <div class="line"><div class="small">Phí vận chuyển</div><div>₫${shippingFee.toLocaleString()}</div></div>
    <div class="line" style="border-bottom:0;padding-top:10px">
      <div class="total">Tổng đơn hàng</div>
      <div class="total" id="order-total">₫${tongdon.toLocaleString()}</div>
    </div>

    <div style="display:flex;flex-direction:column;gap:10px;margin-top:12px">
      <button class="btn" onclick="goCheckout()">Tiếp tục thanh toán</button>
      <button class="btn ghost" onclick="goIndex()" >Tiếp tục mua sắm</button>
    </div>

    <div class="small" style="margin-top:12px;color:var(--muted)">
      Có thể thay đổi số lượng hoặc xóa sản phẩm trước khi thanh toán.
    </div>`;

  document.getElementById("cart-list").innerHTML = viewCart_html;
  document.getElementById("summary-box").innerHTML = viewCart_html2;
} 

let changequantity = (num, index) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (num === 0) {
    if (cart[index].quantity > 1) cart[index].quantity--;
  } else {
    cart[index].quantity++;
  }
  // Lưu lại vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  renderViewCart();
};

function applyVoucher() {
  let select = document.getElementById("voucher-select");
  let code = select.value;
  let tamtinh = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;
  const shippingFee = 30000;

  if (code) {
    let v = vouchers.find(v => v.code === code);
    if (v) {
      discount = Math.min((tamtinh * v.discount) / 100, v.maxDiscount);
    }
  }

  let tongdon = tamtinh - discount + shippingFee;
  document.getElementById("order-total").innerText = "₫" + tongdon.toLocaleString();
  // lưu voucher vào localStorage
  localStorage.setItem("selectedVoucher", code);
}

function removeItem(index) {
  // Lấy giỏ hàng hiện tại
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Xóa phần tử tại vị trí index
  cart.splice(index, 1);

  // Lưu lại vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Hiển thị lại giỏ hàng
  renderViewCart();
}



function goCheckout(){
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "checkout.html";
}
function goIndex(){
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "index.html";
}



