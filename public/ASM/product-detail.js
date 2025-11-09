const productList = [
  {
    id: 1,
    name: "Yacht–Master 42",
    image: "img/sp1.png",
    description: "42mm • Black Golden",
    price: 9200000,
    quantity: 1,
    category: 42
  },
  {
    id: 2,
    name: "The Mirror",
    image: "img/sp2.png",
    description: "42mm • Silver Platinum",
    price: 5100000,
    quantity: 1,
    category: 42
  },
  {
    id: 3,
    name: "Panerai",
    image: "img/sp3.png",
    description: "40mm • Silver Platinum",
    price: 4900000,
    quantity: 1,
    category: 40
  },
  {
    id: 4,
    name: "Yacht–Master",
    image: "img/sp4.png",
    description: "37mm • Copper Platinum",
    price: 11250000,
    quantity: 1,
    category: 37
  },
  {
    id: 5,
    name: "Submariner Date",
    image: "img/sp5.png",
    description: "42mm • Silver Platinum",
    price: 12100000,
    quantity: 1,
    category: 42
  },
  {
    id: 6,
    name: "Sky–Dweller Dark",
    image: "img/sp6.png",
    description: "40mm • Golden Platinum",
    price: 10250000,
    quantity: 1,
    category: 40
  },
];

//  Ép kiểu id sang số
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id")); // <--- dòng quan trọng

//  Tìm sản phẩm đúng theo id
const selected = productList.find(p => p.id === productId);

//  Render ra giao diện chi tiết sản phẩm
if (selected) {
  document.querySelector(".detail-image img").src = selected.image;
  document.querySelector(".detail-title").textContent = selected.name;
  document.querySelector(".detail-meta").textContent = selected.description;
  document.querySelector(".detail-price").textContent = "₫" + selected.price.toLocaleString();
  document.querySelector(".detail-desc").textContent =
    "Chiếc đồng hồ " + selected.name +
    " mang phong cách tinh tế, được chế tác từ chất liệu cao cấp — phù hợp với người yêu thích sự đẳng cấp và bền bỉ.";

  // === Hiển thị sản phẩm liên quan ===
  const relatedGrid = document.getElementById("related-grid");
  const relatedProducts = productList.filter(p => p.category === selected.category && p.id !== selected.id);

  relatedGrid.innerHTML = relatedProducts.map(p => `
    <div class="detail-related-card">
      <div class="detail-related-img">
        <img src="${p.image}" alt="${p.name}"
        onclick="window.location.href='product-detail.html?id=${p.id}'"
        >
      </div>
      <h3 class="detail-related-name">${p.name}</h3>
      <p class="detail-related-meta">${p.description}</p>
      <p class="detail-related-price">₫${p.price.toLocaleString()}</p>
      <button class="detail-buy-btn" onclick="window.location.href='product-detail.html?id=${p.id}'">Buy Now</button>
    </div>
  `).join("");

  if (relatedProducts.length === 0) {
    relatedGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#666;">Không có sản phẩm liên quan.</p>`;
  }

} else {
  document.querySelector(".detail-wrapper").innerHTML =
    `<p style="padding:20px;font-size:18px;">Sản phẩm không tồn tại hoặc đã bị xóa.</p>`;
}
