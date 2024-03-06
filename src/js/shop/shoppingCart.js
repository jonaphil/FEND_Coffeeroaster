import productList from "/js/data/products.json";
import { asMoney } from "/js/shop/general.js";

export function getShoppingCart() {
    const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    if (shoppingCart === null) {
        console.log("No shopping cart found, starting to use a new one.");
        return [];
    } else {
        console.log(`Already existing shopping cart is used:`);
        console.log(shoppingCart);
        return shoppingCart;
    }
}

function getShoppingCartHtml() {
    const shoppingCart = getShoppingCart();

    const shoppingCartDetailedList = new Array;
        /*
        name (mit id für mich), string
        picture, {}
        variety, {}
        amount,
        availability

        */
    const priceList = new Array; //TODO Generate this!
    let amount = 0;

    shoppingCart.forEach((cartProduct, index) => {
        cartProduct.variants.forEach(
        (cartVariant) => {
            const productSpecs = productList.find((productObj) => productObj.id === cartProduct.id);
                const shoppingCartProduct = {
                id: productSpecs.id,
                name: `${productSpecs.name}[${productSpecs.id}]`,
                picture: productSpecs.picture,
                variety: productSpecs.variants.find((variantObj) => variantObj.id === cartVariant.id),
                amount: cartVariant.amount,
                availability: "sofort versandbereit"
            }
            shoppingCartDetailedList.push(shoppingCartProduct);

        }
        )        
    }
    );


    const getCartProductHtml = (cartProductObj) => {
        const productWrapper = document.createElement("div");
        productWrapper.classList.add("shopping-cart__product");

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
            details.innerHTML = `${cartProductObj.amount} Stück<br>${cartProductObj.variety.name}`;

            const availability = document.createElement("p");
            availability.classList.add("shopping-cart__product__specs__availability");
            availability.innerHTML = `${cartProductObj.availability}`;

            const priceHtml = document.createElement("h5");
            priceHtml.classList.add("shopping-cart__product__specs__price")
            priceHtml.innerHTML = `je ${asMoney(cartProductObj.variety.price)}`;

            specsWrapper.appendChild(name);
            specsWrapper.appendChild(details);
            specsWrapper.appendChild(availability);
            specsWrapper.appendChild(priceHtml);

            return specsWrapper;

        }

        const deleteButton = document.createElement("img");
        deleteButton.classList.add("shopping-cart__product__delete");
        deleteButton.src = "/images/icons/Burger-Menu-Close-black.svg";
        deleteButton.addEventListener("click", removeFromShoppingCart.bind(null, cartProductObj.id, cartProductObj.variety.id));

        productWrapper.appendChild(getPictureHtml());
        productWrapper.appendChild(getSpecsHtml());
        productWrapper.appendChild(deleteButton);

        return productWrapper;
    }

    console.log(shoppingCartDetailedList);

    const divWrapper = document.createElement("div");
    divWrapper.classList.add("shopping-cart");

    const divHeading = document.createElement("div");
    divHeading.classList.add("shopping-cart__heading");

    const h2Heading = document.createElement("h2");
    h2Heading.innerHTML = "Warenkorb";
    const pHeading = document.createElement("p");
    pHeading.innerHTML = `Anzahl Artikel`; //FIXME Insert right total amount of products.
    
    divHeading.appendChild(h2Heading);
    divHeading.appendChild(pHeading);

    divWrapper.appendChild(divHeading);

    shoppingCartDetailedList.forEach((shoppingCartProductObj, index) => {
        if (index > 0) {
            divWrapper.appendChild(document.createElement("hr"));
        }
        divWrapper.appendChild(getCartProductHtml(shoppingCartProductObj));
    })
    
    return divWrapper;

}

export function addToShoppingCart(productID, variantID, amount) {
    const shoppingCart = getShoppingCart();
    const cartProductIndex = shoppingCart.findIndex((product) => product.id === productID);
    if (cartProductIndex >= 0) {
        const cartProductVariantIndex = shoppingCart[cartProductIndex].variants.findIndex((variant) => variant.id === variantID);
        if (cartProductVariantIndex >= 0) {
            shoppingCart[cartProductIndex].variants[cartProductVariantIndex].amount += amount;
        } else {
            const variantSpecs = { id: variantID, amount: amount };
            shoppingCart[cartProductIndex].variants.push(variantSpecs);
        }
    } else {
        const productSpecs = {id: productID, variants: [ {id: variantID, amount: amount} ] };
        shoppingCart.push(productSpecs);
    }
    console.log(shoppingCart);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
} 

function removeFromShoppingCart(productID, variantID) {

    const shoppingCart = getShoppingCart();
    const productToRemove = shoppingCart.findIndex((productObj) => productObj.id === productID);
    const variantToRemove = shoppingCart[productToRemove].variants.findIndex((variantObj) => variantObj.id === variantID);

    shoppingCart[productToRemove].variants.splice(variantToRemove, 1);
    if (shoppingCart[productToRemove].variants.length === 0) {
        shoppingCart.splice(productToRemove, 1);
    }

    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    reloadShoppingCart();
}

function reloadShoppingCart(){
    const oldShoppingCart = document.querySelector(".shopping-cart");
    oldShoppingCart.remove();
    showShoppingCart();
}

export function showShoppingCart() {
    // ---    
    
    const shoppingCart = getShoppingCartHtml();
    const mainNode = document.querySelector("main");
    if (!mainNode.classList.contains("mobile-hidden")) {
        mainNode.classList.add("mobile-hidden");
    }

    document.querySelector("body").insertBefore(shoppingCart, mainNode);

}
