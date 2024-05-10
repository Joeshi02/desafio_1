import { Router } from "express";
import Productmanager from "../dao/productManager.js";

const router = Router();

router.get("/", (req, res) =>{
    const {limit} = req.query
    const p = new Productmanager()
    return res.json({productos: p.getProducts(limit)})
})
router.get("/:pid", (req, res) =>{
   const {pid} = req.params
   const p = new Productmanager()
    return res.json({producto: p.getProductsById(Number(pid))})
})
router.post('/', (req,res) =>{
    const {
        title, 
        description,
        price,
        thumbnails,
        code,
        stock,
        category,
        status
    } = req.body
    const p = new Productmanager()
    const result = p.addProduct({title, description,price,thumbnails,code,stock,category,status})
    return res.json({result})
})
router.put("/:pid", (req, res)=> {
    const {pid} = req.params
    const p = new Productmanager()
    const result = p.updateProducts(Number(pid), req.body)
    return res.json({result})
})
router.delete("/:pid", (req, res)=> {
    const {pid} = req.params
    const p = new Productmanager()
    const result = p.deletProduct(Number(pid))
    return res.json({result})
})
export default router;