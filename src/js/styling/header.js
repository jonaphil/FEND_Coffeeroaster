import { toggleShoppingCart, getShoppingCartAmountTotal, shoppingCartEl } from "/js/shop/shoppingCart.js";

const headerElement = document.querySelector("header");

const headerDiv = headerElement.querySelector("div.header");
const headerLogo = headerElement.querySelector(".header__logo");
const headerBurgerMenu = headerElement.querySelector(".header__menu>img");
const headerShoppingCart = headerElement.querySelector(".header__shopping-cart"); //FIXME two Shopping-Carts in the header, because of mobile/desktop difficulty
const headerShoppingCartImg = headerShoppingCart.querySelector("img");
const navigation = headerElement.querySelector(".navigation");

const shoppingCartPatchDiv = generateShoppingCartPatch();

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
    
    const activateShoppingCart = () => {
        const shoppingCart = shoppingCartEl;
        if (shoppingCart.classList.contains("hidden")) {
            headerShoppingCartImg.src = "/images/icons/Shopping-bag-petrol.svg";
            headerShoppingCartImg.classList.toggle("activated");
        } else {
            if (headerDiv.classList.contains("header--white")) {
                headerShoppingCartImg.src = "/images/icons/Shopping-bag-black.svg";
            } else {
                headerShoppingCartImg.src = "/images/icons/Shopping-bag-white.svg";
            } 
            headerShoppingCartImg.classList.toggle("activated");
        }
        toggleShoppingCart();

    }
    
    headerShoppingCartImg.addEventListener("click", activateShoppingCart);

}

export function generateShoppingCartPatch() {
    const amountProducts = getShoppingCartAmountTotal();
    
    const patchDiv = document.createElement("div");
    patchDiv.classList.add("header__shopping-cart__patch");
    patchDiv.classList.add("hidden");
    
    const patchText = document.createElement("p");
    patchText.innerText = amountProducts;
    
    patchDiv.appendChild(patchText);

    const oldDiv = headerShoppingCart.querySelector(".header__shopping-cart__patch");
    if (oldDiv !== null) {
        headerShoppingCart.removeChild(oldDiv);
    }
    if (amountProducts > 0) {
        patchDiv.classList.remove("hidden");
    }

    headerShoppingCart.appendChild(patchDiv);
    return patchDiv;
}

export function updateShoppingCartPatch() {
    const amount = getShoppingCartAmountTotal();
    const patchDiv = shoppingCartPatchDiv;

    if (amount > 0) {
        patchDiv.classList.contains("hidden") ? shoppingCartPatchDiv.classList.remove("hidden") : 0;
    } else if (!patchDiv.classList.contains("hidden")) {
        shoppingCartPatchDiv.classList.add("hidden");
    } else {
        console.log("Error!")
        return;
        //should be nothing to do, since .hidden is contained as a class and it doesn't need to be removed!
    }
    patchDiv.querySelector("p").innerHTML = amount;
    
    //TODO generate little Animation
}

export default function styleHeader() {
    changeHeaderToOriginal();
    if (headerElement !== null) {
        makeHeaderScrollResponsive();
    }
    styleShoppingCartButton();
}
