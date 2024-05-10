import {Router} from 'express'
import { productModel } from '../dao/models/products.js'

const router = Router()

router.get('/',async (req, res) => {
    
    const products = await productModel.find().lean()
    return res.render('home', {products})
})

router.get('/realtimeproducts', (req, res) => {
    
    return res.render('realTimeProducts')
})
router.get('/chat', (req,res) => {
    res.status (200).render('chat')
})
export default router