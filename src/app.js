import express from "express"
import productRouter from './routers/productsRouter.js'
import cartRouter from './routers/cartRouter.js'

const PORT = 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.get("/", (req,res) => {
    res.send("server basico con express")
})

app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)


app.listen(PORT, ()=> console.log(`Server online en puerto ${PORT}`))