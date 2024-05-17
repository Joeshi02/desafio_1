import { Router } from "express";
import Cartmanager from "../dao/cartManager.js";
import { isValidObjectId } from "mongoose";

const router = Router();
const c = new Cartmanager();

// Obtener un carrito por ID
router.get('/:cid', async (req, res) => {
  const id = req.params.cid;
  if (!isValidObjectId(id)) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({
      message: "Error, el id requerido no tiene un formato válido de MongoDB"
    });
  }

  try {
    const resultado = await c.getCartById(id);
    if (resultado) {
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(resultado);
    } else {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({ message: "El id proporcionado no existe en ningún carrito" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    return res.status(500).json({ message: "Error inesperado en el servidor al buscar el carrito" });
  }
});

// Obtener todos los carritos
router.get('/', async (req, res) => {
  try {
    const carritos = await c.getCart();
    res.setHeader("Content-Type", "application/json");
    return res.json({ carritos });
  } catch (error) {
    console.log('No se pudo obtener el carrito', error.message);
    res.setHeader("Content-Type", "application/json");
    return res.status(500).json({ message: "Error inesperado en el servidor al obtener los carritos" });
  }
});

// Crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const result = await c.createCart();
    res.setHeader("Content-Type", "application/json");
    return res.status(201).json({ result });
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    return res.status(500).json({ message: "Error inesperado en el servidor al crear el carrito" });
  }
});

// Añadir producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({
      message: "Error, el id del carrito o producto no tiene un formato válido de MongoDB"
    });
  }
  try {
    await c.addProducts(cid, pid);
    const cartUpdated = await c.getCartById(cid);
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ payload: cartUpdated });
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    return res.status(500).json({ message: `Error inesperado en el servidor al agregar el producto ${pid} al carrito ${cid}` });
  }
});

// Eliminar producto de un carrito
router.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({
      message: "Error, el id del carrito o producto no tiene un formato válido de MongoDB"
    });
  }

  let carrito;

  try {
    carrito = await c.getCartById(cid);
    if (!carrito) {
      res.setHeader("Content-Type", "application/json");
      return res.status(404).json({ message: "El id proporcionado no existe en ningún carrito" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    return res.status(500).json({ message: "Error inesperado en el servidor al buscar carrito por id" });
  }

  // Verificar que la propiedad 'productos' exista y sea un array
  const productos = carrito.products;
  if (!Array.isArray(productos)) {
    res.setHeader("Content-Type", "application/json");
    return res.status(500).json({ message: "Estructura del carrito inválida, 'productos' no es un array" });
  }

  const productoABuscar = productos.find(elem => elem.product._id.toString() === pid);

  if (!productoABuscar) {
    res.setHeader("Content-Type", "application/json");
    return res.status(404).json({ message: "No existe el producto que se desea eliminar" });
  } else {
  }

  try {
    const resultado = await c.deleteProductInCart(cid, pid);
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(resultado);
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    return res.status(500).json({ message: "Error inesperado en el servidor al realizar deleteProductInCart()" });
  }
});
// Eliminar  carrito 
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;

  if (!isValidObjectId(cid)) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({
          message: "Error, el id del carrito no tiene un formato válido de MongoDB"
      });
  }
  try {
      const resultado = await c.deleteCart(cid);
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({ message: "Se eliminó el carrito correctamente" });

  } catch (error) {
      res.setHeader("Content-Type", "application/json");
      return res.status(500).json({ message: "Error inesperado en el servidor al eliminar el carrito" });
  }
});




export default router;
