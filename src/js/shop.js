import generateProductCard from "./shop/generateProductCard";
import generateProductPage from "./shop/generateProductPage";
import { generateShoppingCart } from "./shop/shoppingCart";
import { fetchProductList } from "./shop/general";
import { urlParams } from "./getURLInformation";

const productList = await fetchProductList();

function generateShop(productList) {
    console.log("starting shop");
    const shop = document.querySelector(".shop");
    console.log("working on shop");
    if (shop) { //check if there is some element as shop
        productList.forEach((productObj) => {
        shop.appendChild(generateProductCard(productObj));
        })
    }
    console.log("finishing shop");
}

// localStorage.setItem("allProducts", JSON.stringify(productList));

const currentSubPage = window.location.pathname;

generateShoppingCart();

if (currentSubPage === "/sub-page/shop.html") {
    generateShop(productList);
} else if (currentSubPage === "/sub-page/product.html") {
    const productID = parseInt(urlParams.get("product"));
    generateProductPage(productID);
}



