export function asMoney(intCents, seperator = ",", currency = "€") {
    let moneyString = Array.from(intCents.toString());
    moneyString.splice(-2, 0, seperator);
    return moneyString.join("") + currency;
}

export function addToCart(productID, variantID) {
    console.log(`Sorte: ${productID}, Produkt: ${variantID}`);
}