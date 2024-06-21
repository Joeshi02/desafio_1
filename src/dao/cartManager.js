import { cartModel } from './models/carts.js';

class Cartmanager {

  async getOneByPopulate(filtro={}){
    return await cartModel.findOne(filtro).populate("products.product").lean()
  }
  async createCart() {
    return await cartModel.create({})
  }
  async create(){
    let carrito=await cartModel.create({productos:[]})
    return carrito.toJSON()
}
  async getCartById(id) {
    try {
      return await cartModel.findById(id).populate("products.product");
    } catch (error) {
      console.error("Error al buscar el carrito por ID:", error);
      throw error;
    }
  }

  async getCart() {
    return await cartModel.find()
  }
  async addProducts(idCart, idProduct) {
    try {
      if (!idProduct) throw new Error('ID de producto no proporcionado.');
  
      let searchCart = await this.getCartById(idCart);
  
      if (!Array.isArray(searchCart.products)) throw new Error('Estructura de carrito inválida.');
  
      const existingProduct = searchCart.products.find(p => p.product && p.product.equals(idProduct));
  
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        searchCart.products.push({ product: idProduct, quantity: 1 });
      }
  
      await cartModel.updateOne({ _id: idCart }, searchCart);
    } catch (error) {
      console.error(error);
    }
  }
  
  async deleteProductInCart(cid, pid) {
    try {
      const cart = await cartModel.findById(cid);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
  
      const productIndex = cart.products.findIndex(p => p.product._id.toString() === pid);
      if (productIndex === -1) {
        throw new Error("Producto no encontrado en el carrito");
      }
  
      // Restar una unidad al quantity del producto
      cart.products[productIndex].quantity -= 1;
  
      // Si la cantidad llega a 0, eliminar el producto del carrito
      if (cart.products[productIndex].quantity <= 0) {
        cart.products.splice(productIndex, 1);
      }
  
      await cart.save();
      return { message: "Producto eliminado del carrito correctamente" };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async deleteCart(id) {
    return await cartModel.deleteOne({ _id: id })
  }
}



export default Cartmanager