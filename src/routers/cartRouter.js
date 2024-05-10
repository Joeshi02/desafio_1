import { Router } from "express";
import Cartmanager from "../dao/cartManager.js";
import { isValidObjectId } from "mongoose";
const router = Router();
const c = new Cartmanager()

router.get('/:cid',async (req, res) => {
    const {cid} = req.params
   if (!isValidObjectId(cid)){
    res.setHeader('Content-Type','application/json');
    return res.status(400).json({error:`ingrese in id valido de mongoDB para la busqueda`})
   }
   
   try {
    let result = await c.getCartById({_id:cid})
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({result});
    
   } catch (error) {
    res.setHeader('Content-Type','application/json');
    return res.status(500).json(
        {
            error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            detalle:`${error.message}`
        }
    )
    
   }
})
router.get('/', async (req, res) => {
    try {
        return res.json({carrito: await c.getCart()})
    } catch (error) {
        console.log('No se pudo obtener el carrito', error.message);
    }
})

router.post ('/', (req,res) =>{
    const result = c.createCart()
    return res.json({result})
})
router.post("/:cid/product/:pid", async (req, res) => {
    let { cid, pid } = req.params;
    if (!isValidObjectId(cid, pid)) {
      return res.status(400).json({
        error: `Enter a valid MongoDB id`,
      });
    }
  
    try {
      await c.addProducts(cid, pid);
      let cartUpdated = await c.getCartById(cid);
      res.json({ payload: cartUpdated });
    } catch (error) {
      res
        .status(300)
        .json({ error: `error when adding product ${pid} to cart ${cid}` });
    }
  })
export default router;