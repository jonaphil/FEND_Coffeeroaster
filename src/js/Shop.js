export class Shop {
    constructor({
        shopSelector = ".shop",
        productSelector = ".product",
    } = {}) {
        this.shop = document.querySelector(shopSelector);
        this.products = document.querySelectorAll(productSelector);
        this.productList = [{key: 1}] //productList.json;
    }

    generateShopView() {
        for (let i = 0; i < this.products.length; i++) {
            // addProductElement(i)
        } 
    }

    addProductElement(i) {
        //this.products[i]
    }

    generateProductView(product) {
        
        // html;
        let productHtml = 0;

        return 
    }
}

export class Product {
    constructor({} = {}) {
        
    }

}