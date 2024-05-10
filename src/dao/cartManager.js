import { cartModel } from './models/carts.js';
import Productmanager from './productManager.js';
class Cartmanager {
    // #cart
    // #path;
    // static ids = 0
    // constructor() {
    //     this.#path ='../src/data/cart.json'
    //     this.#cart = this.#readCart();
    // }
    // #assignId() {
    //     let id = 1
    //     if (this.#cart.length != 0)
    //         id = this.#cart[this.#cart.length - 1].id + 1;
    //     return id
    // }
    // #readCart() {
    //     try {
    //         if (fs.existsSync(this.#path)) {
    //             return JSON.parse(fs.readFileSync(this.#path, {encoding:'utf-8'}))
    //         }
    //         return [];
    //     } catch (error) {
    //         console.log(`ocurrio un error al leer el archivo, ${error}`);
    //     }
    // }
    // #saveFile() {
    //     try {
    //         fs.writeFileSync(this.#path, JSON.stringify(this.#cart, null, 3))
    //     } catch (error) {
    //         console.log(`ocurrio un error al gurdar el archivo ${error}`);
    //     }
    // }
    async createCart(){
        return await cartModel.create({})
    }
    async getCartById(filter) {
        return await cartModel.findById(filter)
    }
    async getCart (){
        return await cartModel.find()
    }
    async addProducts(idCart, idProduct) {
    try {
      let searchCart = await this.getCartById(idCart);
      let quantityValidation = searchCart.products.some(
        (p) => p.id == idProduct
      );

      if (quantityValidation) {
        let findProduct = searchCart.products.find((p) => p.id == idProduct);
        findProduct.quantity = findProduct.quantity + 1;
      } else {
        searchCart.products.push({ id: idProduct, quantity: 1 });
      }

      await searchCart.save();
    } catch (error) {
      console.error(error);
    }
  }
}



export default Cartmanager