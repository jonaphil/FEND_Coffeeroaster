import productList from "/js/data/products.json";

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

function removeFromShoppingCart(productID, variantID, amount) {

}

function getShoppingCartHtml() {
    const shoppingCart = getShoppingCart();

    const shoppingCartDetailedList = new Array;
        /*
        name (mit id für mich), string
        picture, {}
        variety, {}
        amount,
        Verfügbarkeit

        */
    shoppingCart.forEach((cartProduct, index) => {
        cartProduct.variants.forEach(
        (cartVariant) => {
            const productSpecs = productList.find((productObj) => productObj.id === cartProduct.id);
            const shoppingCartProduct = {
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

        const productPicture = document.createElement("picture");
        productPicture.classList.add("shopping-cart__product__image");

        const productPictureSource = document.createElement("source");
        const productPictureImg = document.createElement("img");

        productPictureSource.media = "(min-width: 992px)";
        productPictureSource.srcset = cartProductObj.picture.desktop;

        productPictureImg.src = product.picture.mobile;
        productPictureImg.alt = product.picture.alt;

    }

    console.log(shoppingCartDetailedList);

    const divWrapper = document.createElement("div");
    divWrapper.classList.add("shopping-cart");

    const divHeading = document.createElement("div");
    divHeading.classList.add("shopping-cart__heading");

    const h2Heading = document.createElement("h2");
    const pHeading = document.createElement("p");
    divHeading.appendChild(h2Heading);
    divHeading.appendChild(pHeading);

    


}

export function showShoppingCart() {
    // ---    
    getShoppingCartHtml();

}
