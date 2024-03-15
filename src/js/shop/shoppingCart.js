import { productList, asMoney } from "/js/shop/general";
import { updateShoppingCartPatch } from "/js/styling/header.js";

const shoppingCartArray = []; 
export const shoppingCartEl = createShoppingCartWrapperEl();

/* dataFormat of shoppingCart in localStorage:
    [{
        id: int, -> this is optional. is it using to much memory???
        productId: int, 
        variantId: int, 
        amount: int
    }]
*/

function getCartIndex(productId, variantId) {
    const index = shoppingCartArray.findIndex((cartProduct) =>
        cartProduct.productId === productId && cartProduct.variantId == variantId);
    return index;
}

function getProductCartSpecs(productId, variantId) {
    const productDetails = productList.find((productObj) => productObj.id === productId);
    const variantDetails = productDetails.variants.find((variantObj) => variantObj.id === variantId);
    const lastElement = shoppingCartArray.slice(-1).pop();
    const cartProductSpecs = {
        id: lastElement ? lastElement.id + 1 : 0, // Is the cartId counter really necessary? i think not!
        productId: productDetails.id,
        variantId: variantDetails.id,
        name: `${productDetails.name} [${productDetails.id}]`,
        variantName: variantDetails.name,
        price: variantDetails.price,
        weight: variantDetails.weight,
        picture: productDetails.picture,
        availability: "sofort versandbereit",
    };
    return cartProductSpecs;
}

function loadShoppingCartFromLocalStorage() { 
    const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    shoppingCartArray.splice(0);
    if (shoppingCart) {
        // FIXME: quicker approch to circumvent 2 times forEach?
        shoppingCart.forEach(item => createShoppingCartEntry(item.productId, item.variantId, item.amount));
        console.log("finished loading shoppingCart");
        updateShoppingCartPatch();
        updateShoppingCartWrapperEl();
        return;
    } else {
        return;
    }
}

function saveCartToLocalStorage() { 
    const localStorageList = shoppingCartArray.map(({ id, productId, variantId, amount }) => ({ id, productId, variantId, amount }));
    localStorage.setItem("shoppingCart", JSON.stringify(localStorageList));
};

function createShoppingCartProductNode(cartProductObj) {
    const cartProductWrapper = document.createElement("div");
    cartProductWrapper.classList.add("shopping-cart__product__wrapper");

    const cartProductHtml = document.createElement("div");
    cartProductHtml.classList.add("shopping-cart__product");
    // cartProductHtml.dataset.cartId = cartProductObj.id;

    const getPictureHtml = () => {
        const productPicture = document.createElement("picture");
        const productPictureSource = document.createElement("source");
        const productPictureImg = document.createElement("img");
        
        productPictureSource.media = "(min-width: 992px)";
        productPictureSource.srcset = cartProductObj.picture.desktop;
        
        productPictureImg.src = cartProductObj.picture.mobile;
        productPictureImg.alt = cartProductObj.picture.alt;
        productPictureImg.classList.add("shopping-cart__product__image");

        productPicture.appendChild(productPictureSource);
        productPicture.appendChild(productPictureImg);

        return productPicture;
    }
    const getSpecsHtml = () => {
        const specsWrapper = document.createElement("div");
        specsWrapper.classList.add("shopping-cart__product__specs");

        const name = document.createElement("h3");
        name.innerHTML = cartProductObj.name;

        const details = document.createElement("p");
        details.classList.add("shopping-cart__product__specs__details");
        details.innerHTML = `${cartProductObj.amount} Stück<br>${cartProductObj.variantName}`;

        const availability = document.createElement("p");
        availability.classList.add("shopping-cart__product__specs__availability");
        availability.innerHTML = `${cartProductObj.availability}`;

        const priceHtml = document.createElement("h5");
        priceHtml.classList.add("shopping-cart__product__specs__price")
        priceHtml.innerHTML = `${asMoney(cartProductObj.price)}`;

        specsWrapper.appendChild(name);
        specsWrapper.appendChild(details);
        specsWrapper.appendChild(availability);
        specsWrapper.appendChild(priceHtml);

        return specsWrapper;

    }

    const deleteButton = document.createElement("img");
    deleteButton.src = "/images/icons/Burger-Menu-Close-black.svg";
    deleteButton.classList.add("shopping-cart__product__delete");
    // deleteButton.dataset.cartIndex = shoppingCartArray.findIndex((item) => item === cartProductObj);
    const removeByButton = () => {
        removeFromShoppingCart(getCartIndex(cartProductObj.productId, cartProductObj.variantId));
    };
    deleteButton.addEventListener("click", removeByButton);

    cartProductHtml.appendChild(getPictureHtml());
    cartProductHtml.appendChild(getSpecsHtml());
    cartProductHtml.appendChild(deleteButton);

    cartProductWrapper.appendChild(cartProductHtml);
    cartProductWrapper.appendChild(document.createElement("hr"));
    
    return cartProductWrapper;
}

function createShoppingCartWrapperEl() { 
    const oldShoppingCart = document.querySelector(".shopping-cart");
    if (oldShoppingCart) {
        console.log("Error generating shopping Cart. Shopping Cart already exists.");
        return -1;
    }
    const shoppingCartDiv = document.createElement("div");
    shoppingCartDiv.classList.add("shopping-cart");
    shoppingCartDiv.classList.add("hidden");

    const divHeading = document.createElement("div");
    divHeading.classList.add("shopping-cart__heading");

    const h2Heading = document.createElement("h2");
    h2Heading.innerHTML = "Warenkorb";
    const pHeading = document.createElement("p");
    pHeading.innerHTML = `${getShoppingCartAmountTotal()} Produkte`;
    
    divHeading.appendChild(h2Heading);
    divHeading.appendChild(pHeading);

    shoppingCartDiv.appendChild(divHeading);

    document.querySelector("header").appendChild(shoppingCartDiv);

    return shoppingCartDiv;
}

function updateShoppingCartWrapperEl() {
    shoppingCartEl.querySelector(".shopping-cart__heading p").innerHTML = `${getShoppingCartAmountTotal()} Produkte`;
}

function createShoppingCartEntry(productId, variantId, amount) {
    const shoppingCartItemObj = {
        ...getProductCartSpecs(productId, variantId),
        amount,
    };
    shoppingCartArray.push(shoppingCartItemObj);

    const shoppingCartItemDiv = createShoppingCartProductNode(shoppingCartItemObj);
    shoppingCartEl.appendChild(shoppingCartItemDiv);

    saveCartToLocalStorage();
 };

function updateShoppingCartEntry(cartIndex, amount) {
    // const cartIndex = shoppingCartArray.findIndex(({ id }) => cartId === id);
    if (cartIndex < 0) {
        console.log("Trying to update non existing cartEntry");
        return -1;
    }
    shoppingCartArray[cartIndex].amount = amount;

    const cartEntryNodes = shoppingCartEl.children[cartIndex + 1]; //the index in the NodeList has to be adjusted by one, because there is the preceding shoppingCartHeader
    cartEntryNodes.querySelector(".shopping-cart__product__specs__details").innerHTML =
        `${amount} Stück<br>${shoppingCartArray[cartIndex].variantName}`;

    saveCartToLocalStorage();
    return 0;


};

function removeShoppingCartEntry(cartIndex) {
    if (cartIndex < 0) {
        console.log("Trying to remove non existing cartEntry.");
        return -1;
    }
    console.log("Trying to remove" + cartIndex);
    shoppingCartArray.splice(cartIndex, 1);
    shoppingCartEl.children[cartIndex + 1].remove();

    saveCartToLocalStorage();
    return 0;
 };

export function toggleShoppingCart() {
    const mainNode = document.querySelector("main");

    shoppingCartEl.classList.toggle("hidden");
    mainNode.classList.toggle("mobile-hidden");
 }

export function addToShoppingCart(productId, variantId, amount = 1) {
    const indexInCart = getCartIndex(productId, variantId);
    if (indexInCart > -1) {
        const newAmount = shoppingCartArray[indexInCart].amount + amount;
        updateShoppingCartEntry(indexInCart, newAmount);
    } else {
        createShoppingCartEntry(productId, variantId, amount);
    }

    updateShoppingCartPatch();
    updateShoppingCartWrapperEl();
 }

export function removeFromShoppingCart(indexInCart, amount = null) { 
    
    const newAmount = amount === null ? 0 : shoppingCartArray[indexInCart].amount - amount;

    if (newAmount > 0) {
        updateShoppingCartEntry(indexInCart, newAmount);
    } else {
        removeShoppingCartEntry(indexInCart);
    }

    updateShoppingCartPatch();
    updateShoppingCartWrapperEl();
}

export function getShoppingCartAmountTotal() {
    const totalAmount = shoppingCartArray.length > 0 ? shoppingCartArray.reduce((preSum, cartProduct) => preSum + cartProduct.amount, 0) : 0;
    shoppingCartArray.length > 0 ? console.log(shoppingCartArray.reduce((preSum, cartProduct) => preSum + cartProduct.amount, 0)) : 0;
    console.log("total amount:" + totalAmount);
    return totalAmount;
}

export function getShoppingCartPriceTotal(shippingCost = 0) {
    const totalPrice = shoppingCartArray.reduce((preSum, cartProduct) => preSum + cartProduct.variant.price, shippingCost);
    return totalPrice;
}

export function generateShoppingCart() {
    // Is it necessary like this?
    loadShoppingCartFromLocalStorage();
}