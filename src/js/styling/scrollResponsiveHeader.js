const headerElement = document.querySelector("header");

const headerDiv = headerElement.querySelector("div.header");
const headerLogo = headerElement.querySelector(".header__logo");
const headerBurgerMenu = headerElement.querySelector(".header__menu>img");
const headerShoppingCart = headerElement.querySelector(".header__shopping-cart>img");
const navigation = headerElement.querySelector(".navigation");

const hero = document.querySelector(".hero");

const changeHeaderToOriginal = () => {
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
        headerShoppingCart.src = "/images/icons/Shopping-bag-white.svg";
    }
}

const changeHeaderToWhite = () => {

    if (!headerDiv.classList.contains("header--white")){
        headerDiv.classList.add("header--white");
    }
    if (!navigation.classList.contains("navigation--black")) {
        navigation.classList.add("navigation--black");
    }
    headerLogo.src = "/images/icons/Logo-black.svg";
    headerBurgerMenu.src = "/images/icons/Burger-Menu-black.svg";
    headerShoppingCart.src = "/images/icons/Shopping-bag-black.svg";

}

function makeHeaderScrollResponsive() {   
    document.addEventListener("scrollend", () => {
        if (window.scrollY >= 100) {
            changeHeaderToWhite();
        } else {
            changeHeaderToOriginal();
        }
    });

    //TODO Add Movement of the header, from top down!
}

export default function styleHeader() {
    changeHeaderToOriginal();

    if (headerElement !== null) {
        makeHeaderScrollResponsive();
    } else {
    }
}
