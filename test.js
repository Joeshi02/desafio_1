const Productmanager = require("./ProductManager");

const producto = new Productmanager()

// console.log(producto.getProductsById(1));
console.log(producto.addProduct('laptop','dell 16.5"', '100000','www.google.com','19734', '2'));
console.log(producto.addProduct('laptop','dell 16.5"', '100000','www.google.com','19735', '2'));

console.log(producto.getProducts());
console.log(producto.getProductsById(3));