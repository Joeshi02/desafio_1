import {Router} from 'express'
import Productmanager from '../dao/productManager.js'

const router = Router()

router.get('/', (req, res) => {
    const p = new Productmanager()
    const products = p.getProducts()
    return res.render('home', {products})
})

router.get('/realtimeproducts', (req, res) => {
    
    return res.render('realTimeProducts')
})
export default router