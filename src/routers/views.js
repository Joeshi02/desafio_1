import {Router} from 'express'
import Productmanager from '../dao/productManager.js'
import Cartmanager from '../dao/cartManager.js'
import { auth } from '../middleware/auth.js'


const router = Router()
const p = new Productmanager()
const c = new Cartmanager()

router.get('/',async (req, res) => {
    const products = await p.getProducts()
    return res.render('home', {products})
})

router.get('/realtimeproducts', auth, (req, res) => {
    
    return res.render('realTimeProducts')
})
router.get('/chat', (req,res) => {
    res.status (200).render('chat')
})

router.get('/products',auth, async (req, res) => {
    let carrito = {
        _id: req.session.user.carrito
    }
    let products;
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
router.get('/singUp', (req,res) => {
    res.status (200).render('singUp')
})
router.get('/login', (req,res) => {
    res.status (200).render('login')
})
router.get('/perfil',auth, (req,res) => {
    res.status (200).render('perfil', {
        user: req.session.user
    })
})
router.get("/carrito/:cid", async(req, res)=>{
    let {cid}=req.params

    let carrito=await c.getOneByPopulate({_id:cid})

    res.setHeader('Content-Type','text/html');
    return res.status(200).render("carrito", {carrito});
})
export default router