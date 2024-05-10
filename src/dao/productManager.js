import {productModel} from './models/products.js';

class Productmanager {
   
    async addProduct(title, description, price, thumbnails, code, stock, category, status) {
        return await productModel.create({ title, description, price, thumbnails, code, stock, category, status });
    }
    
    async getProducts(limit){
        return await productModel.find().limit(Number(limit))
    }
    async getProductsById(filter) {
        return await productModel.findOne(filter)
    }
    async updateProducts(pid, updateObjects) {
        return await productModel.findByIdAndUpdate(pid, updateObjects, { returnDocument:"after ", runValidators: true })
    }
    async deletProduct(id) {
        return await productModel.deleteOne({_id:id})
    }
}



export default Productmanager