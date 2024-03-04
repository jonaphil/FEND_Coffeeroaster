import productList from "./data/products.json";

import generateProductCard from "./shop/generateProductCard";
import {generateShoppingCart} from "./shop/shoppingCart";

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


generateShop(productList);
generateShoppingCart();
