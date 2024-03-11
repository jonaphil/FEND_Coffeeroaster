import { showShoppingCart, hideShoppingCart, getPriceList } from "/js/shop/shoppingCart.js";

const headerElement = document.querySelector("header");

const headerDiv = headerElement.querySelector("div.header");
const headerLogo = headerElement.querySelector(".header__logo");
const headerBurgerMenu = headerElement.querySelector(".header__menu>img");
const headerShoppingCart = headerElement.querySelector(".header__shopping-cart")
const headerShoppingCartImg = headerShoppingCart.querySelector("img");
const navigation = headerElement.querySelector(".navigation");

const hero = document.querySelector(".hero");

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
        headerShoppingCartImg.src = "/images/icons/Shopping-bag-white.svg";
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
    headerShoppingCartImg.src = "/images/icons/Shopping-bag-black.svg";

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
    
    const toggleShoppingCart = () => {
        const shoppingCart = document.querySelector(".shopping-cart");
        if (shoppingCart === null || shoppingCart.classList.contains("hidden")) {
            showShoppingCart();
            headerShoppingCartImg.src = "/images/icons/Shopping-bag-petrol.svg";
            headerShoppingCartImg.classList.toggle("activated");
        } else {
            hideShoppingCart();
            if (headerDiv.classList.contains("header--white")) {
                headerShoppingCartImg.src = "/images/icons/Shopping-bag-black.svg";
            } else if (!headerDiv.classList.contains("header--white")) {
                headerShoppingCartImg.src = "/images/icons/Shopping-bag-white.svg";
            } else {
                console.log("error!");
            }
            
            headerShoppingCartImg.classList.toggle("activated");
        }
    }
    
    headerShoppingCartImg.addEventListener("click", toggleShoppingCart);

}

export function styleShoppingCartPatch() {

    // FIXME: number of cartProducts in Patch

    const amountProducts = getPriceList().length;
    
    const patchDiv = document.createElement("div");
    patchDiv.classList.add("header__shopping-cart__patch");
    
    const patchText = document.createElement("p");
    patchText.innerText = amountProducts;
    
    patchDiv.appendChild(patchText);

    const oldDiv = headerShoppingCart.querySelector(".header__shopping-cart__patch");
    if (oldDiv !== null) {
        headerShoppingCart.removeChild(oldDiv);
    }
    if (amountProducts > 0) {
        headerShoppingCart.appendChild(patchDiv);
    }

}

export default function styleHeader() {
    changeHeaderToOriginal();
    if (headerElement !== null) {
        makeHeaderScrollResponsive();
    }
    styleShoppingCartButton();
}
