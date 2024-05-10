import express from "express"
import mongoose from "mongoose"
import productRouter from './routers/productsRouter.js'
import cartRouter from './routers/cartRouter.js'
import views from './routers/views.js' 
import { Server } from "socket.io"
import { engine } from "express-handlebars"
import __dirname from "./utils.js"
import Productmanager from "./dao/productManager.js"
import { productModel } from "./dao/models/products.js"
import { messagesModel } from "./dao/models/messages.js"

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

let usuarios=[]
let mensajes=[]
 const serverExpress = app.listen(PORT, ()=> console.log(`Server online en puerto ${PORT}`))
 const socketServer = new Server (serverExpress)

 socketServer.on('connection' ,async (socket) => {
    
    const product = await productModel.find()
    socket.emit('products',product )
    console.log('Conexion exitosa al server');
    
    socket.on('addProduct',async (products) => {
      
      const result =await productModel.create({...products})
      if (result)
      socket.emit('products', result.products)
      
    })
    socket.on ("id", async nombre=>{
      let mensajesMongo = await messagesModel.find()
      socket.emit("mensajesPrevios", mensajesMongo)
      socket.broadcast.emit("nuevoUsuario", nombre)
  })

  socket.on("mensaje", async (nombre, mensaje)=>{
    await messagesModel.create({user: nombre, message: mensaje})
    socket.emit("nuevoMensaje", nombre, mensaje)
  })

  socket.on("disconnect", ()=>{
      let usuario=usuarios.find(u=>u.id===socket.id)
      if(usuario){
          socketServer.emit("saleUsuario", usuario.nombre)
      }
  })
    
 })
const connDB = async() => {
  try {
    await mongoose.connect("mongodb+srv://joacoescobarh:Pruebacoder0205@cluster0.msamo3k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=ecomerce")
    console.log('DB online');
    
  } catch (error) {
    console.log('Error al ingresr a la db', error.message);
    
  }
}
connDB()