window.onload = () => {
    load_dssp();
     //làm bổ xung thêm
}
let load_dssp=() => {
    let getdssp=getproductlist();
    
    //DOM
    let html_ID_productlist=document.getElementById("product-list");
    let html_ID_productlist_kq=``;
    
    //biến html css thành mảng
    let arr_kq=getdssp.map(item => { 
      return `<article class="product-card">
        <img 
        class="product-image placeholder-thumb" 
        src="${item.image}" 
        alt="${item.name}" 
        onclick="window.location.href='product-detail.html?id=${item.id}'"
      >
        <h3 class="product-name">${item.name}</h3>
        <div class="product-meta">${item.description}</div>
        <div class="product-price">${(item.price).toLocaleString()}đ</div>
        <div class="actions">
        <button class="btn" onclick="window.location.href='product-detail.html?id=${item.id}'">Mua ngay</button>
        <button class="btn" onclick="addToCart(${item.id})">🛒</button>
        </div>
      </article>`;
    });

    
    html_ID_productlist.innerHTML=arr_kq.join(""); //nối mảng thành chuỗi
}

let getproductlist=(x) => {
    let arr_productlist=localStorage.getItem("product");
    if(arr_productlist && arr_productlist != "undefined"){
      try{
        let products=JSON.parse(arr_productlist);
        return products.slice(0, 3); // ✅ Chỉ lấy 3 sản phẩm đầu
      } catch(e){
        console.error("Lỗi phân tích JSON:", e);
        
      }
    }else{
        let product=[
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
        localStorage.setItem("product",JSON.stringify(product)); //vì Products là mảng nên phải dùng, đưa mảng lên localstorage
        return product.slice(0, 3); // ✅ chỉ trả về 3 sản phẩm đầu
    }
    // return arr_productlist? JSON.stringify(arr_productlist):[]; //giống như if else(toán tử 3 ngôi)
}


function addToCart(id) {
  // 1. Lấy danh sách cart hiện tại (nếu có)
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const products = getproductlist();
  // 2. Tìm sản phẩm theo id
  const product = products.find(p => p.id === id);
  if (!product) return;

  // 3. Kiểm tra xem sản phẩm đã có trong giỏ chưa
  const exist = cart.find(item => item.id === id);
  if (exist) {
    exist.quantity += 1; // tăng số lượng
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  // 4. Lưu lại vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // 5. Thông báo (tùy chọn)
  alert(`Đã thêm ${product.name} vào giỏ hàng!`);
}

function viewDetail(id) {
  // Lưu id sản phẩm vào localStorage
  localStorage.setItem("selectedProductId", id);

  // Chuyển qua trang chi tiết
  window.location.href = "product-detail.html";
}