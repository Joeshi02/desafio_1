// import fs from 'fs'

// class Productmanager {
//     #products
//     #path;
//     static ids = 0
//     constructor() {
//         this.#path ='../src/data/products.json'
//         this.#products = this.#readProducts();
//     }
//     #assignId() {
//         let id = 1
//         if (this.#products.length != 0)
//             id = this.#products[this.#products.length - 1].id + 1;
//         return id
//     }
//     #readProducts() {
//         try {
//             if (fs.existsSync(this.#path)) {
//                 return JSON.parse(fs.readFileSync(this.#path, {encoding:'utf-8'}))
//             }
//             return [];
//         } catch (error) {
//             console.log(`ocurrio un error al leer el archivo, ${error}`);
//         }
//     }

//     #saveFile() {
//         try {
//             fs.writeFileSync(this.#path, JSON.stringify(this.#products, null, 3))
//         } catch (error) {
//             console.log(`ocurrio un error al gurdar el archivo ${error}`);
//         }
//     }
//     addProduct({title, description, price, thumbnails=[], code, stock, category, status = true}) {
//         if (!title || !description || !price || !code || !stock || !category)
//             return 'Todos los datos son necesarios (title, description, price, code, stock, category)'
//         const codeRepeat = this.#products.some(p => p.code == code)
//         if (codeRepeat)
//             return `El codigo ${code} ya esta ocupado, intente nuevamente`

//         Productmanager.ids = Productmanager.ids + 1
//         const id = this.#assignId()
//         const newProduct = {
//             id,
//             title,
//             description,
//             price,
//             thumbnails,
//             code,
//             stock,
//             category,
//             status
//         };
//         this.#products.push(newProduct);
//         this.#saveFile()

//         return 'Producto añaido con exito'
//     }
//     getProducts(limit = 0) {
//         limit = Number(limit)
//         if (limit > 0)
//         return this.#products.slice(0,limit)
//         return this.#products
//     }
//     getProductsById(id) {
//         let status= false
//         let msg = `El producto con id ${id} no existe`
//         const product = this.#products.find(p => p.id == id)
//         if (product){
//             status= true
//             msg = product            
//         }
//         return {status,msg}
//     }
//     updateProducts(id, updateObjects) {
//         let message = `EL producto ${id} no existe`

//         const index = this.#products.findIndex(p => p.id === id)
//         if (index !== 1) {
//             const { id, ...rest } = updateObjects;
//             const allowedPropieties =['title', 'description', 'price', 'code', 'thumbnails', 'stock', 'category', 'status']
//             const updatePropeties = Object.keys(rest)
//             .filter(propieties => allowedPropieties.includes(propieties))
//             .reduce((obj,key) => {
//                 obj[key]=rest[key]
//                 return obj
//             },{})
//             this.#products[index] = { ...this.#products[index], ...updatePropeties }
//             this.#saveFile()
//             message = 'Producto actualizado con exito!'
//         }
//         return message
//     }
//     deletProduct(id) {
//         let message = `EL producto ${id} no existe`
//         const index = this.#products.findIndex(p => p.id == id)
//         if (index !== -1) {
//             this.#products = this.#products.filter(p => p.id !== id)
//             this.#saveFile()
//             message = 'Producto eliminado con exito!'
        
//         }
//         return message
//     }
// }



// export default Productmanager