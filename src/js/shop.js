import productList from "./data/products.json";

import generateProductCard from "./shop/generateProductCard";
import generateProductPage from "./shop/generateProductPage";
import { getShoppingCart, showShoppingCart } from "./shop/shoppingCart";
import { urlParams } from "./getURLInformation";

function generateShop(productList) {
    console.log("starting shop");
    const shop = document.querySelector(".shop");
    console.log("working on shop");
    if (shop !== null) { //check if there is some element as shop
        productList.forEach((productObj) => {
        shop.appendChild(generateProductCard(productObj));
        })
    }
    console.log("finishing shop");
}

localStorage.setItem("allProducts", JSON.stringify(productList));

const currentSubPage = window.location.pathname;

if (currentSubPage === "/sub-page/shop.html") {
    generateShop(productList);
} else if (currentSubPage === "/sub-page/product.html") {
    const productID = parseInt(urlParams.get("product"));
    generateProductPage(productID);
    showShoppingCart();
}



