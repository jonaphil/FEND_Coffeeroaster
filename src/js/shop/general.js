import { addToShoppingCart } from "/js/shop/shoppingCart";

export function asMoney(intCents, seperator = ",", currency = "€") {
    let moneyString = Array.from(intCents.toString());
    moneyString.splice(-2, 0, seperator);
    return moneyString.join("") + currency;
}

export function addToCart(productID, variantID) {
    addToShoppingCart(productID, variantID, 1);
    console.log(`Successfully Added To Cart:\nSorte: ${productID}, Produkt: ${variantID}`);
}

export function getMinMaxPrice(variantsList) {
    const productPriceList = variantsList.map(
        (variant) => {
        return variant.price;
    });
    
    const MinMaxPrice =[
        Math.min.apply(null, productPriceList),
        Math.max.apply(null, productPriceList)];

    return MinMaxPrice;
}