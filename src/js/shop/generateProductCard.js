import {asMoney, addToCart, getMinMaxPrice, iconsList} from "/js/shop/general";
import { addToShoppingCart } from "./shoppingCart";

export default function generateProductCard(productObj) {
    const productName = productObj.name; //string
    const productVariants = productObj.variants; //Array(object)
    const minMaxPrice = getMinMaxPrice(productVariants);
    
    const productIcons = productObj.icons.map((iconName) => {
        return iconsList.find((iconObj) => iconObj.name === iconName );
    }); //Array(object)
    const productPicture = productObj.picture; //object {desktop: string-source-to-desktop-version, mobile: string-source-to-mobile-version}
    
    // Functions:
    const quickAdd = () => {
        const quickMenuWrapper = document.createElement("div");
        quickMenuWrapper.classList.add("shop__product__quick-add");
        
        const quickAddButton = document.createElement("button");
        quickAddButton.innerHTML = "quick add <strong>+</strong>";

        const quickAddSelection = () => {
            const selectionHtml = document.createElement("div");
            selectionHtml.classList.add("shop__product__quick-add__selection");

            productVariants.forEach((variant) => {
                const varietyHtml = document.createElement("button");
                const quickAddClick = (event) => {
                    event.preventDefault();
                    addToShoppingCart(productObj.id, variant.id);
                }
                varietyHtml.addEventListener("click", quickAddClick); 
                varietyHtml.innerHTML = `${variant.name}`;
                
                selectionHtml.appendChild(varietyHtml);
            })
            selectionHtml.onmouseout = showButton;
            return selectionHtml;
        }

        quickMenuWrapper.appendChild(quickAddButton);

        const showSelection = () => {
            quickMenuWrapper.innerText = "";
            quickMenuWrapper.appendChild(quickAddSelection());
        }

        const showButton = () => {
            quickMenuWrapper.innerText = "";
            quickMenuWrapper.appendChild(quickAddButton);
            quickAddButton.onmouseover = showSelection;
        }
        
        quickAddButton.onmouseover = showSelection;

        return quickMenuWrapper;

    }
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
        const wrapperHtml = document.createElement("a");
        wrapperHtml.href = `/sub-page/product.html?product=${productObj.id}`;

        const pictureHtml = document.createElement("picture");
        const sourceHtml = document.createElement("source");
        const imgHtml = document.createElement("img");
        
        wrapperHtml.classList.add("shop__product__image-wrapper");
        wrapperHtml.tabIndex = "0";

        sourceHtml.media = "(min-width: 992px)";
        sourceHtml.srcset = `${productPicture.desktop}`;

        imgHtml.classList.add("shop__product__image");
        imgHtml.src = `${productPicture.mobile}`;
        imgHtml.alt = `${productPicture.alt}`;

        pictureHtml.appendChild(sourceHtml);
        pictureHtml.appendChild(imgHtml);

        wrapperHtml.appendChild(pictureHtml);
        wrapperHtml.appendChild(quickAdd());

        return wrapperHtml;
    }

    // Final HTML-Creation:
    const productHtml = document.createElement("div");
    const productNameHtml = document.createElement("h5");
    const productPriceTagHtml = document.createElement("p");
    const productLink = document.createElement("a");
    
    productLink.href = `/sub-page/product.html?product=${productObj.id}`;
    productLink.classList.add("shop__product__link");

    productNameHtml.classList.add("shop__product__name");
    productNameHtml.innerHTML = productName;

    productLink.appendChild(productNameHtml);

    productPriceTagHtml.classList.add("shop__product__price-tag");
    productPriceTagHtml.innerHTML = `${asMoney(minMaxPrice[0])} &ndash; ${asMoney(minMaxPrice[1])}`;

    productHtml.appendChild(getPicturesHtml());
    productHtml.appendChild(productLink);
    productHtml.appendChild(productPriceTagHtml);
    productHtml.appendChild(getIconsHtml());

    return productHtml;

}
