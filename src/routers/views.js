import {Router} from 'express'
import Productmanager from '../dao/productManager.js'
import Cartmanager from '../dao/cartManager.js'


const router = Router()
const p = new Productmanager()
const c = new Cartmanager()

router.get('/',async (req, res) => {
    const products = await p.getProducts()
    return res.render('home', {products})
})

router.get('/realtimeproducts', (req, res) => {
    
    return res.render('realTimeProducts')
})
router.get('/chat', (req,res) => {
    res.status (200).render('chat')
})

router.get('/products', async (req, res) => {
    let products;
    let carrito = await c.getCartById()
    if (!carrito){
        carrito = await c.createCart()
    }
    try {
        const limit = req.query.limit || 10;
        products = await p.getProducts(limit);
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({
            error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            detalle: `${error.message}`
        });
    }
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).render("products", { products, carrito });
});

export default router