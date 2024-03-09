
class Productmanager {
    #products
    static ids = 0
    constructor (){
        this.#products = []
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock)
        return 'Todos los datos son necesarios (title, description, price, thumbnail, code, stock)'
     const codeRepeat = this.#products.some(p => p.code == code)
     if (codeRepeat)
        return `El codigo ${code} ya esta ocupado, intente nuevamente`
        
        Productmanager.ids = Productmanager.ids +1
        const id = Productmanager.ids
        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.#products.push(newProduct)
        
        return'Producto añaido con exito'
    }
    getProducts(){
        return this.#products
    }
    getProductsById(id){
        const product = this.#products.find(p => p.id == id)
        if (product)
            return product
        else
            return `Not Found`
    }
}



module.exports = Productmanager