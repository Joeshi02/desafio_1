import fs from 'fs'
import Productmanager from './productManager.js';
class Cartmanager {
    #cart
    #path;
    static ids = 0
    constructor() {
        this.#path ='../src/data/cart.json'
        this.#cart = this.#readCart();
    }
    #assignId() {
        let id = 1
        if (this.#cart.length != 0)
            id = this.#cart[this.#cart.length - 1].id + 1;
        return id
    }
    #readCart() {
        try {
            if (fs.existsSync(this.#path)) {
                return JSON.parse(fs.readFileSync(this.#path, {encoding:'utf-8'}))
            }
            return [];
        } catch (error) {
            console.log(`ocurrio un error al leer el archivo, ${error}`);
        }
    }
    #saveFile() {
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#cart, null, 3))
        } catch (error) {
            console.log(`ocurrio un error al gurdar el archivo ${error}`);
        }
    }
    async createCart (){
        const newCart = {
            id: this.#assignId(),
            products : []
        }
        this.#cart.push(newCart)
        this.#saveFile()
        return newCart
    }
    getCartById(id) {
        const product = this.#cart.find(p => p.id == id)
        if (product)
            return product
        else
            return `Not Found`
    }
    addProductsInCart(cid, pid){
        let msg = `El carrito ${cid} no existe`
        
        const cartIndex = this.#cart.findIndex(c=>c.id === cid)
        
        if (cartIndex !==-1){
            const cartIndexProducts = this.#cart[cartIndex].products.findIndex(p=>p.id === pid)
            const p = new Productmanager()
            const product = p.getProductsById(pid)
            
            if(product.status && cartIndexProducts ===-1){
                this.#cart[cartIndex].products.push({id:pid, 'quantity':1})
                this.#saveFile()
                msg = 'Productos agregados correctamente'
            }else if (product.status && cartIndexProducts !==-1){
                ++this.#cart[cartIndex].products[cartIndexProducts].quantity
                this.#saveFile()
                msg = 'Productos agregados correctamente'
            }else{
                msg = `El producto con id ${pid} no existe`
            }
        }
        return msg
    }
}



export default Cartmanager