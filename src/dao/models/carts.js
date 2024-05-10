import mongoose, { Schema } from "mongoose";

const nameCollection = "cart"
const CartSchema = new mongoose.Schema ({
    products : [
        {
            id: {
                type:Schema.Types.ObjectId,
                ref: 'Producto'
            },
            quantity:{
                type:Number,
                required:[true]
            }
        }
    ]
})

export const cartModel = mongoose.model(nameCollection,CartSchema)