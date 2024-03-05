function makeHeaderScrollResponsive(header) {

    const headerLogo = header.querySelector(".header__logo");
    const headerBurgerMenu = header.querySelector(".header__menu>img");

    const changeHeaderToWhite = () => {

    }
    
    const changeHeaderToOriginal = () => {

    }
}

export default function styleHeader() {
    console.log("styling header");
    const headerElement = document.querySelector("header");
    if (headerElement !== null) {
        makeHeaderScrollResponsive(headerElement);
    } else {
        console.log("No header to style!");
    }
}
