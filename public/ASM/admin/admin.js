import {listCategories, addCategories, editCategories, deleteCategories} from "./views/categories.js";
import {listProducts,showProducts} from "./views/products.js";

let string = window.location.search; // lấy url từ ? trở đi
let urlParams = new URLSearchParams(string); //lấy các tham số trong chuỗi
let ctrl = urlParams.get("ctrl")??"Categories"; //category, mặc định sẽ là category
let act = urlParams.get("act"); //edit
let id = urlParams.get("id")??""; //id sẽ là 0, không có sẽ là rỗng

// let func = action + ctrl;
// console.log(act+ctrl+"("+id+")");
try{
    eval(act+ctrl+"('"+id+"')");
}catch(err){
    document.querySelector("main").innerHTML = "Loi";
    console.log(err);
}