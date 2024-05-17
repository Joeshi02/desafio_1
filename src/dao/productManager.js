import {productModel} from './models/products.js';

class Productmanager {
   
    async addProduct(title, description, price, thumbnails, code, stock, category, status) {
        return await productModel.create({ title, description, price, thumbnails, code, stock, category, status });
    }
    
    async getProducts(limit){
        return await productModel.find().limit(Number(limit))
    }
    async getProductsPaginate(filtro, opciones) {
        console.log(opciones)
        let resultado = await productModel.paginate(filtro, opciones)
        console.log(resultado)

        //Agrego validaciones para el sort
        let sortOrder = opciones.sort
        if (sortOrder == "asc") {
            return resultado = resultado.docs.sort(function (a, b) { return a.price - b.price })
            
        } else if (sortOrder == "desc") {
            return resultado = resultado.docs.sort(function (a, b) { return b.price - a.price })

        } else {
            return resultado = {
                status: "success",
                payload: resultado.docs,
                totalPages: resultado.totalPages,
                prevPage: resultado.prevPage,
                nextPage: resultado.nextPage,
                page: resultado.page,
                hasPrevPage: resultado.hasPrevPage,
                hasNextPage: resultado.hasNextPage,
                prevLink: "En construccion",
                nextLink: "En construccion"
            }
           
        }        
    }
    async getProductsById(filter) {
        return await productModel.findOne(filter)
    }
    async updateProducts(pid, updateObjects) {
        return await productModel.findByIdAndUpdate(pid, updateObjects, { returnDocument:"after", runValidators: true })
    }
    async deletProduct(id) {
        return await productModel.deleteOne({_id:id})
    }
}



export default Productmanager