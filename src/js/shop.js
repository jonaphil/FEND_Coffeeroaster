const iconsList = [
    {
        name: "frenchPress",
        sourceWhite: "/images/icons/Icon French Press.svg",
        sourceBlack: "/images/icons/Icon French Press-black.svg",
        alt: "Icon French Press",
        cssClass: "shop__product__icon-french-press",
    },
    {
        name: "coffeeBeans",
        sourceWhite: "/images/icons/Icon Kaffee Bohnen.svg",
        sourceBlack: "/images/icons/Icon Kaffee Bohnen-black.svg",
        alt: "Icon Coffee Bean",
        cssClass: "shop__product__icon",
    },
    {
        name: "coffeeShovel",
        sourceWhite: "/images/icons/Icon Kaffee Schaufel-white.svg",
        sourceBlack: "/images/icons/Icon Kaffee Schaufel-black.svg",
        alt: "Icon Coffee Shovel",
        cssClass: "shop__product__icon",
    }
]

const productList = [
    {
        id:
            0,
        name:
            "Äthiopien",
        variants:
            [
                {
                    name: "500g",
                    weight: 500,
                    price: 690
                },
                {
                    name: "1kg",
                    weight: 1000,
                    price: 1000
                },
                {
                    name: "5kg",
                    weight: 5000,
                    price: 5000
                }
            ],
        icons:
            [
                "frenchPress",
                "coffeeBeans",
                "coffeeShovel"
            ],
        picture:
            {
                desktop: "/images/desktop/FEND_Coffee_Costa-Rica 1.png",
                mobile: "/images/mobile/FEND_Coffee_Costa-Rica 1-512px.png",
                alt: "The Picture of our Äthiopien-Coffee."
            },
        description:
            "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft."
    },
    {
        id:
            1,
        name:
            "Brasilien",
        variants: [
          {
            name: "500g",
            weight: 500,
            price: 880
          },
          {
            name: "1kg",
            weight: 1000,
            price: 1200
          },
          {
            name: "5kg",
            weight: 5000,
            price: 6500
          }
        ],
        icons:
            [
                "frenchPress",
                "coffeeBeans",
                "coffeeShovel"
            ],
        picture:
            {
                desktop: "/images/desktop/FEND_Coffee_Costa-Rica 1.png",
                mobile: "/images/mobile/FEND_Coffee_Costa-Rica 1-512px.png",
                alt: "the Picture of our Brasilien-Coffee."
            },
        description:
            "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft."
      }
]

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
        
        console.log(productIcons);
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

        // const html =
        //     `<picture>
        //         <source media="(min-width: 992px)" srcset="${productPicture.desktop}">
        //         <img class="shop__product__image" src="${productPicture.mobile}" alt="${productPicture.alt}">
        //     </picture>`;
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
   
    // const generateShop = (arg1, arg2) => {
    //     console.log(arg1 + arg2);
    //     return 0;
    // }   
    // generateShop();
    // generateProduct();
}

generateShop(productList);
