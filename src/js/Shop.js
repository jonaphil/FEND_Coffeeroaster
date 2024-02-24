export class Shop {
    constructor({
        shopSelector = ".shop",
        productSelector = ".product",
        productTemplateSelector = "template",
    } = {}) {
        this.shop = document.querySelector(shopSelector);
        this.products = document.querySelectorAll(productSelector);
        
        this.productList = [{ key: 1 }] //productList.json;
        this.template = document.querySelector(productTemplateSelector);
    }

    generateShopView() {

        const productsHtml = this.productList.map(generateProductView).join("")

        for (let i = 0; i < this.products.length; i++) {
            // addProductElement(i)
        } 
    }

    addProductElement(i) {
        //this.products[i]
    }

    generateProductView(product, x) {
        
        // html;
        let productHtml = `<div>${product.title}</div>`;

        return 
    }

    irgendwas() {}
}

export class Product {
    constructor({} = {}) {
        
    }

}

const iconsAndSources = [
    {
        name: "frenchPress",
        sourceWhite: "/images/icons/Icon French Press.svg",
        sourceBlack: "/images/icons/Icon French Press-black.svg",
        alt: "Icon French Press",
        cssClass: "shop__product__icon shop__product__icon--french-press"
    },
    {
        name: "coffeeBean",
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
        cssClass: "shop__product__icon"
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
                desktop: "/images/desktop/FEND_Coffee_Costa-Rica 1.jpg",
                mobile: "/images/mobile/FEND_Coffee_Costa-Rica 1-512px.jpg",
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
                desktop: "/images/desktop/FEND_Coffee_Costa-Rica 1.jpg",
                mobile: "/images/mobile/FEND_Coffee_Costa-Rica 1-512px.jpg",
                alt: "the Picture of our Brasilien-Coffee."
            },
        description:
            "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft."
      }
]

function generateProduct(productObj) {
    
    const productName = productObj.name; //string
    const productWeight = weight; //Array(int) same size as price
    
    const productMinPrice = productObj.variants.map((self) => {return self.price}).min();
    const productMaxPrice = productObj.variants.map((self) => {return self.price}).max();

    // const productVarieties = Array(object) [ {name: "500g", weight: "500", price:"6,90"}, { }]
    const productIcons = productObj.icons; //Array(object)
    const productPicture = productObj.picture; //object {desktop: string-source-to-desktop-version, mobile: string-source-to-mobile-version}
    
    const getIconsHtml = () => {
        const createHtml = (iconObject) => {
            return `<img class="${iconObject.cssClass}" src="${iconObject.sourceBlack}" alt="${iconObject.alt}">`;
        }
        return productIcons.map(createHtml).join("");
    }

    const getPicturesHtml = () => {
        const html =
            `<picture>
                <source media="(min-width: 992px)" srcset="${productPicture.desktop}">
                <img class="shop__product__image" src="${productPicture.mobile}" alt="${productName.alt}">
            </picture>`;
    }

    const htmlProduct =
        `<div class="shop_product"
        ${getPicturesHtml()}
        <h5 class="shop__product__name">${productName}</h5>
        <p class="shop__product__price-tag">${productMinPrice}€ &ndash; ${productMaxPrice}€</p>
        <div class="shop__product__icon-wrapper">
            ${getIconsHtml()}
        </div>
    </div>`;

    return htmlProduct;
}

function shop() {
    const shopElement = document.querySelector(".shop");

   
   
    // const generateShop = (arg1, arg2) => {
    //     console.log(arg1 + arg2);
    //     return 0;
    // }   
    // generateShop();
    // generateProduct();
}

shop();
