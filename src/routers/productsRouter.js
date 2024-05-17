import { Router } from "express";
import Productmanager from "../dao/productManager.js";
import { isValidObjectId } from "mongoose";

const router = Router();
const p = new Productmanager()

router.get("/", async (req, res) => {
    try {
        
        let page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 10
        let propiedad = req.query.propiedad
        let valor = req.query.valor
        let sort = req.query.sort || undefined
        let stock = parseInt(req.query.stock) || undefined

        let filtro = {} 

        if (propiedad && valor) {
            filtro[propiedad] = valor
        }
         if (stock) {
            filtro.stock = {$gte: stock}
         }


        let opciones = {
            page: page,
            limit: limit,
            lean: true,
            sort: sort
        }


        const resultado = await p.getProductsPaginate(filtro, opciones)
            res.setHeader("Content-Type", "application/json")          
            res.json(resultado)
            
    

    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(500).json({ Error: "Error 500 - Error inesperado en el servidor" })
    }
});
router.get("/:pid",async (req, res) =>{
   const {pid} = req.params
   if (!isValidObjectId(pid)){
    res.setHeader('Content-Type','application/json');
    return res.status(400).json({error:`ingrese in id valido de mongoDB para la busqueda`})
   }
   
   try {
    let result = await p.getProductsById({_id:pid})
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
router.post('/',async (req,res) =>{
    let {title, description, price, thumbnails, code, stock, category} = req.body
    if (!title || !description || !price || !code || !stock || !category){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`todos los datos son obligatorios`})
    }
    try {
        const {title, description,price,thumbnails,code,stock,category,status} = req.body
        const result = await p.addProduct(title, description,price,thumbnails,code,stock,category,status)
       return res.json({result})
    } catch (error) {
       res.setHeader('Content-Type','application/json');
       return res.status(500).json(
        {
            error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            detalle:`${error.message}`
        }
       )
       ;
    }
    
})
router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    if (!isValidObjectId(pid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ingrese un ID válido de MongoDB para la búsqueda` });
    }

    const updateP = req.body;
    delete updateP._id; // Eliminamos _id si está presente en updateP

    try {
        const productUpdate = await p.updateProducts(pid, updateP);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ productUpdate });
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({
            error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            detalle: `${error.message}`
        });
    }
})
router.delete("/:pid",async (req, res)=> {
    const { pid } = req.params;
    if (!isValidObjectId(pid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ingrese un ID válido de MongoDB para la búsqueda` });
    }
    try {
        let resultado = await p.deletProduct(pid)
        if (resultado.deletedCount>0){
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:`usuario con id ${pid} eliminado`});
        }else res.setHeader('Content-Type','application/json');
        return res.status(404).json({error:`No existen productos con ese id ${pid}/ o error al eliminar`})
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
export default router;