import mongoose from "mongoose"

const usuariosCollection = "usuarios"
const usuariosSchema = new mongoose.Schema({
    nombre : String,
    email:{
        type: String, unique:true
    },
    password: String,
    rol : {
        type: String, default : "user"
    },
    carrito: {
        type: mongoose.Types.ObjectId, ref: "carts"
    }
},
{
    strict:false
})

export const usuariosModel = mongoose.model(usuariosCollection, usuariosSchema)