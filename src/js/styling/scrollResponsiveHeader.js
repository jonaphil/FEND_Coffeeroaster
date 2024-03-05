function makeHeaderScrollResponsive(header) {
    

    const changeHeaderToWhite = () => {

    }
    
    const changeHeaderToOriginal = () => {

    }
}

export default function styleHeader() {
    const headerElement = document.querySelector("header");
    if (headerElement !== null) {
        makeHeaderScrollResponsive(headerElement);
    } else {
        console.log("No header to style!");
    }
}
