import mongoose from "mongoose"

const nameCollection = 'products'
const ProductSchema = new mongoose.Schema({

    title: { type: String, require: [true, 'El titulo es obligatorio'] },
    description: { type: String, require: [true, 'La descripcion es obligatoria'] },
    price: { type: Number, require: [true, 'El precio del producto es obligatorio'] },
    thumbnails: [{ type: String }],
    code: { type: String, require: [true, 'El codigo del producto es obligatorio e unico'], unique: true },
    stock: { type: Number, require: [true, 'El stock del producto es obligatorio'] },
    category: { type: String, require: [true, 'La categoria del producto es obligatoria'] },
    status: { type: Boolean, default: true },
})

export const productModel = mongoose.model(nameCollection, ProductSchema)