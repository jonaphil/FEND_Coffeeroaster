import {asMoney, addToCart, getMinMaxPrice} from "/js/shop/general";

export default function generateProductPage(productID) {
    const productList = JSON.parse(localStorage.getItem("allProducts"));
    const productIndex = productList.findIndex((product) => product.id === productID);
    const product = productList[productIndex];

    const minMaxPrice = getMinMaxPrice(product.variants);

    const picture = document.querySelector(".product__image");
    picture.childNodes[1].srcset = product.picture.desktop;
    picture.childNodes[3].src = product.picture.mobile;
    picture.childNodes[3].alt = product.picture.alt;
    
    const productOverview = document.querySelector(".product__overview");
    productOverview.querySelector("h2").innerText = product.name;
    productOverview.querySelector("h5").innerHTML = `${asMoney(minMaxPrice[0])} &ndash; ${asMoney(minMaxPrice[1])}`;
    productOverview.querySelector("p").innerText = product.teaser;
    
    const selectToCart = document.querySelector(".product__select-to-cart");
    const selectToCartMenu = selectToCart.querySelector("select");
    product.variants.forEach((variant) => {
        const option = document.createElement("option");
        option.value = variant.id;
        option.innerText = variant.name;
        selectToCartMenu.appendChild(option);
    })
    selectToCart.addEventListener("submit", (event) => {
        event.preventDefault();
        const variantID = parseInt(selectToCartMenu.value, 10);
        if (variantID >= 0) {
            addToCart(productIndex, variantID);
        } else {
            alert("Bitte wählen Sie eine Kaffee-Sorte aus, um sie dem Einkaufswagen hinzuzufügen!")
        }
    })

    const productProperties = document.querySelector(".product__properties__wrapper");
    //TODO Generate Property-Icons

    const productDescription = document.querySelector(".product__description");
    productDescription.querySelector("p").innerText = product.description;



    
}