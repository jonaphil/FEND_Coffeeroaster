import { productList } from "/js/shop/general";
import { updateShoppingCartPatch } from "/js/styling/header.js";

export const shoppingCartArray = [];

function getProductCartSpecs(productId, variantId) {
    const productDetails = productList.find((productObj) => productObj.id === productId);
    const variantDetails = productDetails.variants.find((variantObj) => variantObj.id === variantId);
    const cartIdCounter = shoppingCartArray.slice(-1).pop();
    const cartProductSpecs = {
        id: cartIdCounter ? cartIdCounter + 1 : 0,
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
    const shoppingCart = localStorage.getItem("shoppingCart");
    if (shoppingCart) {
        // FIXME: quicker approch to circumvent 2 times forEach?
        shoppingCart.forEach((cartProductShort) => {
            cartProductShort.variants.forEach((cartVariantShort) => {
                const cartObject = {
                    ...getProductCartSpecs(cartProductShort.id, cartVariantShort.id),
                    amount: cartVariantShort.amount,
                }
                shoppingCartArray.push(cartObject);               
            })
        })
        console.log("finished array");
        console.log(shoppingCartArray);
        return;
    } else {
        return;
    }
}

function createShoppingCartProductNode(cartProductObj) {
    const cartProductHtml = document.createElement("div");
        cartProductHtml.classList.add("shopping-cart__product");
        cartProductHtml.dataset.cartId = cartProductObj.id;

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
            priceHtml.innerHTML = `${asMoney(cartProductObj.variety.price)}`;

            specsWrapper.appendChild(name);
            specsWrapper.appendChild(details);
            specsWrapper.appendChild(availability);
            specsWrapper.appendChild(priceHtml);

            return specsWrapper;

        }

        const deleteButton = document.createElement("img");
        deleteButton.classList.add("shopping-cart__product__delete");
        deleteButton.dataset.cartId = cartProduct.id;
        deleteButton.addEventListener("click", removeFromShoppingCart);

        cartProductHtml.appendChild(getPictureHtml());
        cartProductHtml.appendChild(getSpecsHtml());
        cartProductHtml.appendChild(deleteButton);
        
        return cartProductHtml;
}

function createShoppingCartHtml() { 
    const shoppingCartDiv = document.createElement("div");
    shoppingCartDiv.classList.add("shopping-cart");
    shoppingCartDiv.classList.add("hidden");

    const divHeading = document.createElement("div");
    divHeading.classList.add("shopping-cart__heading");

    const h2Heading = document.createElement("h2");
    h2Heading.innerHTML = "Warenkorb";
    const pHeading = document.createElement("p");
    pHeading.innerHTML = `6 Produkte`; //FIXME Insert right total amount of products.
    
    divHeading.appendChild(h2Heading);
    divHeading.appendChild(pHeading);

    shoppingCartDiv.appendChild(divHeading);

    const shoppingCartProductsAllHtml = shoppingCartArray.map((cartProduct) => {
        return createShoppingCartProductNode(cartProduct);
    });

    shoppingCartProductsAllHtml.forEach((obj) => {
        console.log("append shoppingCartProductObj");
        shoppingCartDiv.appendChild(obj);
    });

    document.querySelector("header").appendChild(shoppingCartDiv);
}

function getShoppingCartNode() {
    const nodeList = document.querySelector(".shopping-cart");
    return nodeList;
    // -> return existingNodeList
}

function getShoppingCartNodeListItem(productId, variantId) {

    // -> return specific Node
}

export function toggleShoppingCart() {
    const mainNode = document.querySelector("main");

    getShoppingCartNode().classList.toggle("hidden");
    mainNode.classList.toggle("mobile-hidden");
 }

// export function hideShoppingCart() { }

export function addToShoppingCart(productId, variantId, amount = 1) {
    // Add to shopping Cart Array
    // Remove and newly add to shoppingCartDiv
    // Update or Add the cart in the localStorage

    const productInCartIndex = shoppingCartArray.findIndex((cartProduct) =>
        cartProduct.productId === productId && cartProduct.variantId == variantId);
    const cartId = productInCartIndex > -1 ? shoppingCartArray[productInCartIndex].cartId : null;
    const oldProduct = cartId ? document.querySelector(`[data-cart-id="${cartId}"]`) : null;
    const newProduct = oldProduct ? oldProduct : { ...getProductCartSpecs (productId, variantId), amount: amount };
    const shoppingCartElement = getShoppingCartNode();

    const localStoredCart = localStorage.getItem("shoppingCart");
    const cartShort = localStoredCart ? localStoredCart : [];

    if (productInCartIndex > -1) {
        shoppingCartArray[productInCartIndex].amount += amount;
        
        oldProduct.querySelector(".shopping-cart__product__specs__details").innerHTML = `${shoppingCartArray[productInCartIndex].amount} Stück<br>${shoppingCartArray[productInCartIndex].variantName}`;
        
        cartShort.find((product) =>
            product.id === productId).variants.find((variant) =>
                variant.id === variantId).amount += amount; //Good Style?
    } else {
        shoppingCartArray.push();
        const productInCartShort = cartShort.findIndex((product) => product.id === productId);
        if (productInCartShort > -1) {
            const variant = { id: variantId, amount: amount };
            cartShort[productInCartShort].variants.push(variant);
        } else {
            const shortProduct = { id: productId, variants: { id: variantId, amount: amount } };
            cartShort.push(shortProduct);
        }
    }
    shoppingCartElement.appendChild(createShoppingCartProductNode(newProduct));

    localStorage.setItem("shoppingCart", cartShort);
    // updateShoppingCartPatch
 }

export function removeFromShoppingCart(productId, variantId, amonut) { 
    // remove from shoppingCartArray
    // remove from shoppingCartNodeList
    // remove from LocalStorage
    // uptdateShoppingCartPatch
}

export function getShoppingCartAmountTotal() {
    const totalAmount = shoppingCartArray.reduce((preSum, cartProduct) => preSum + cartProduct.amount);
    return totalAmount;
}

export function getShoppingCartPriceTotal(shippingCost = 0) {
    const totalPrice = shoppingCartArray.reduce((preSum, cartProduct) => preSum + cartProduct.variant.price, shippingCost);
    return totalPrice;
 }

export function generateShoppingCart() {
    loadShoppingCartFromLocalStorage();

    createShoppingCartHtml();
}