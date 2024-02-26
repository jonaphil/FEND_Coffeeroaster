import iconsList from "./data/icons.json"; //assert??
import productList from "./data/products.json";

function asMoney(intCents, seperator = ",") {

    let moneyString = Array.from(intCents.toString());
    moneyString.splice(-2, 0, seperator);
    return moneyString.join("");
}

function generateProductHtml(productObj) {
    
    const productName = productObj.name; //string
    
    const productVariants = productObj.variants; //Array(object)

    const productPriceList = productVariants.map(
        (variant) => {
        return variant.price;
    });
    
    const productMinPrice =
        Math.min.apply(
            null,
            productPriceList
        );
    const productMaxPrice =
        Math.max.apply(
            null,
            productPriceList
        );
    
    const productIcons = productObj.icons.map((iconName) => {
        return iconsList.find((iconObj) => iconObj.name === iconName );
    }); //Array(object)

    const productPicture = productObj.picture; //object {desktop: string-source-to-desktop-version, mobile: string-source-to-mobile-version}
    
    const getIconsHtml = () => {
        const iconsAllHtml = document.createElement("div");
        iconsAllHtml.classList.add("shop__product__icon-wrapper");
        
        const createIconHtml = (iconObject) => {
            const iconSingleHtml = document.createElement("img");
            iconSingleHtml.classList.add(iconObject.cssClass);
            iconSingleHtml.src = iconObject.sourceBlack;
            iconSingleHtml.alt = iconObject.alt;
            iconsAllHtml.appendChild(iconSingleHtml);
        }
        
        productIcons.forEach(createIconHtml);
        return iconsAllHtml;
    }

    const getPicturesHtml = () => {
        const wrapperHtml = document.createElement("div");

        const pictureHtml = document.createElement("picture");
        const sourceHtml = document.createElement("source");
        const imgHtml = document.createElement("img");
        
        wrapperHtml.classList.add("shop__product__image-wrapper");

        sourceHtml.media = "(min-width: 992px)";
        sourceHtml.srcset = `${productPicture.desktop}`;

        imgHtml.classList.add("shop__product__image");
        imgHtml.src = `${productPicture.mobile}`;
        imgHtml.alt = `${productPicture.alt}`;

        pictureHtml.appendChild(sourceHtml);
        pictureHtml.appendChild(imgHtml);

        wrapperHtml.appendChild(pictureHtml);

        return wrapperHtml;
    }

    // HTML-Creation:
    const productHtml = document.createElement("div");
    const productNameHtml = document.createElement("h5");
    const productPriceTagHtml = document.createElement("p");
    
    productNameHtml.classList.add("shop__product__name");
    productNameHtml.innerHTML = productName;

    productPriceTagHtml.classList.add("shop__product__price-tag");
    productPriceTagHtml.innerHTML = `${asMoney(productMinPrice)}€ &ndash; ${asMoney(productMaxPrice)}€`;

    productHtml.appendChild(getPicturesHtml());
    productHtml.appendChild(productNameHtml);
    productHtml.appendChild(productPriceTagHtml);
    productHtml.appendChild(getIconsHtml());

    return productHtml;

}

function generateShop(productList) {
    const shop = document.querySelector(".shop");
    productList.forEach((productObj) => {
        shop.appendChild(generateProductHtml(productObj));
    })
}

generateShop(productList);
