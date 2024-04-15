import express from "express"
import productRouter from './routers/productsRouter.js'
import cartRouter from './routers/cartRouter.js'
import views from './routers/views.js' 
import { Server } from "socket.io"
import { engine } from "express-handlebars"
import __dirname from "./utils.js"
import Productmanager from "./dao/productManager.js"

const PORT = 8080

const app = express()
const p = new Productmanager()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use('/',views)
app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)


 const serverExpress = app.listen(PORT, ()=> console.log(`Server online en puerto ${PORT}`))
 const socketServer = new Server (serverExpress)

 socketServer.on('connection' , socket => {
    
    const product = p.getProducts()
    socket.emit('products',product )
    console.log('Conexion exitosa al server');
    
    socket.on('addProduct', products => {
      
      const result = p.addProduct({...products})
      if (result.products)
      socket.emit('products', result.products)
      
    })
 })