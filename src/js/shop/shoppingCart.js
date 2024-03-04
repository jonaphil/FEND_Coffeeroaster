export function generateShoppingCart() {
    if (localStorage.getItem("shoppingCart") === null) {
        const shoppingCart = [];
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    } else {
        console.log(`Already existing shopping cart is used:`);
        console.log(JSON.parse(localStorage.getItem("shoppingCart")));
    }
        
}

export function addToShoppingCart(productID, variantID, amount) {
    if (localStorage.getItem("shoppingCart") === null) {
        generateShoppingCart();
    }
    const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
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