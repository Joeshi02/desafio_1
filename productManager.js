
class Productmanager {
    #products
    constructor (){
        this.#products = []
    }
    addProduct(){

    }
    getProducts(){
        return this.#products
    }
    getProductsById(id){
        const product = this.#products.find(p => p.id == id)
        if (product)
            return producto
        else
            return `Not Found`
    }
}

// title
// description
// price
// thumbnail
// code
// stock

module.exports = Productmanager