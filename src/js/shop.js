import productList from "./data/products.json";

import generateProductCard from "./shop/generateProductCard";

function generateShop(productList) {
    const shop = document.querySelector(".shop");
    productList.forEach((productObj) => {
        shop.appendChild(generateProductCard(productObj));
    })
}

generateShop(productList);
