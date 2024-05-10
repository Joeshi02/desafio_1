import { Router } from "express";
import Cartmanager from "../dao/cartManager.js";
const router = Router();

router.get ('/:cid', (req,res) =>{
    const {cid} = req.params
    const c = new Cartmanager()
    const result = c.getCartById(cid)
    return res.json({result})
})

router.post ('/', (req,res) =>{
    const c = new Cartmanager()
    const result = c.createCart()
    return res.json({result})
})
router.post ('/:cid/product/:pid', (req,res) =>{
    const {cid, pid} = req.params
    const c = new Cartmanager()
    const result = c.addProductsInCart(Number(cid),Number(pid))
    return res.json({result})
})
export default router;