import express from "express"
import Productmanager from "./productManager.js";

const PORT = 3000

const app = express()

app.get("/", (req,res) => {
    res.send("server basico con express")
})

app.get("/products", (req, res) =>{
    const {limit} = req.query
    const p = new Productmanager ();
    return res.json({productos: p.getProducts(limit)})
})
app.get("/products/:pid", (req, res) =>{
   const {pid} = req.params
   const p = new Productmanager()
    return res.json({producto: p.getProductsById(Number(pid))})
})


app.listen(PORT, ()=> console.log(`Server online en puerto ${PORT}`))