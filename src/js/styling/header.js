import { toggleShoppingCart, getShoppingCartAmountTotal, shoppingCartEl } from "/js/shop/shoppingCart.js";

const headerElement = document.querySelector("header");

const headerDiv = headerElement.querySelector("div.header");
const headerLogo = headerElement.querySelector(".header__logo");
const headerBurgerMenu = headerElement.querySelector(".header__menu>img");
const headerShoppingCart = headerElement.querySelectorAll(".header__shopping-cart"); 
const headerShoppingCartImg = Array.from(headerShoppingCart).map( div => div.querySelector("img"));
const navigation = headerElement.querySelector(".navigation");

const shoppingCartPatchDiv = generateShoppingCartPatch();

const hero = document.querySelector(".hero");

function headerShoppingCartImgSetProp(propsToChange = { src: undefined, toggleClass: undefined, onClick: undefined }) {
    const imgList = headerShoppingCartImg;
    if (propsToChange.src) {
        imgList.forEach(imgObj => imgObj.src = propsToChange.src);
    }
    if (propsToChange.toggleClass) {
        imgList.forEach(imgObj => imgObj.classList.toggle(propsToChange.toggleClass));
    }
    if (propsToChange.onClick) {
        imgList.forEach(imgObj => imgObj.addEventListener("click", propsToChange.onClick));
    }
}

function changeHeaderToOriginal() {
    if (hero === null) {
        changeHeaderToWhite();
    } else {
        if (headerDiv.classList.contains("header--white")) {
            headerDiv.classList.remove("header--white");
        }
        if (navigation.classList.contains("navigation--black")) {
            navigation.classList.remove("navigation--black");
        }
        headerLogo.src = "/images/icons/Logo-white.svg";
        headerBurgerMenu.src = "/images/icons/Burger-Menu-white.svg";
        headerShoppingCartImgSetProp({src: "/images/icons/Shopping-bag-white.svg"});
    }
}

function changeHeaderToWhite() {

    if (!headerDiv.classList.contains("header--white")){
        headerDiv.classList.add("header--white");
    }
    if (!navigation.classList.contains("navigation--black")) {
        navigation.classList.add("navigation--black");
    }
    headerLogo.src = "/images/icons/Logo-black.svg";
    headerBurgerMenu.src = "/images/icons/Burger-Menu-black.svg";
    headerShoppingCartImgSetProp({ src: "/images/icons/Shopping-bag-black.svg" });

}

function makeHeaderScrollResponsive() {  
    //Debouncing! set-debounce.
    document.addEventListener("scroll", () => {
        if (window.scrollY >= 100) {
            changeHeaderToWhite();
        } else {
            changeHeaderToOriginal();
        }
    });

    //TODO Add Movement of the header, from top down!
}

function styleShoppingCartButton() {
    
    const activateShoppingCart = () => {
        const shoppingCart = shoppingCartEl;
        if (shoppingCart.classList.contains("hidden")) {
            headerShoppingCartImgSetProp({
                src: "/images/icons/Shopping-bag-petrol.svg",
                toggleClass: "activated"
            })
        } else {
            if (headerDiv.classList.contains("header--white")) {
                headerShoppingCartImgSetProp({ src: "/images/icons/Shopping-bag-black.svg" });
            } else {
                headerShoppingCartImgSetProp({ src: "/images/icons/Shopping-bag-white.svg" });
            } 
            headerShoppingCartImgSetProp({ toggleClass: "activated" });
        }

        toggleShoppingCart();
        headerElement.classList.toggle("header--shopping-cart-visible");

    }
    
    headerShoppingCartImgSetProp({ onClick: activateShoppingCart });

}

export function generateShoppingCartPatch() {
    const amountProducts = 0;
    
    const patchDiv = document.createElement("div");
    patchDiv.classList.add("header__shopping-cart__patch");
    patchDiv.classList.add("hidden");
    
    const patchText = document.createElement("p");
    patchText.innerText = amountProducts;
    
    patchDiv.appendChild(patchText);

    const patchDivList = [];
    
    headerShoppingCart.forEach(elem => {
        const oldDivs = elem.querySelectorAll(".header__shopping-cart__patch");
        oldDivs.length > 0 ? oldDivs.forEach(item => item.remove()) : 0;
        const clonePatch = patchDiv.cloneNode(true);
        elem.appendChild(clonePatch);
        patchDivList.push(clonePatch);
    })
    return patchDivList;
}

export function updateShoppingCartPatch() {
    const amount = getShoppingCartAmountTotal();
    const patchDivList = shoppingCartPatchDiv;

    const updateSinglePatch = (patchDiv) => {
        if (amount > 0) {
            patchDiv.classList.contains("hidden") ? patchDiv.classList.remove("hidden") : 0;
        } else if (!patchDiv.classList.contains("hidden")) {
            patchDiv.classList.add("hidden");
        } else {
            console.log("Error!")
            return;
        }
        patchDiv.querySelector("p").innerHTML = amount;
    };

    patchDivList.forEach(singlePatch => updateSinglePatch(singlePatch));
    //TODO generate little Animation
}

export function styleHeader() {
    changeHeaderToOriginal();
    if (headerElement !== null) {
        makeHeaderScrollResponsive();
    }
    styleShoppingCartButton();
}
