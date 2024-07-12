import { Router } from "express";
import UsuariosManager from "../dao/usuariosManager.js";
import Cartmanager from "../dao/cartManager.js";
import passport from "passport";

const router = Router()
const usuariosManager = new UsuariosManager()
const cartmanager= new Cartmanager()

router.get("/error", (req, res) => {
    res.setHeader('Content-Type','application/json');
    return res.status(500).json(
        {
            error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            detalle:`Fallo al autenticar`
        }
    )
    
})
router.get('/github',passport.authenticate("github",{}), (req,res) => {})
router.get('/callbackGithub',passport.authenticate("github",{failureRedirect:"/api/sessions/error"}), (req,res) => {

    req.session.user = req.user

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:req.user});
})

router.post('/singUp', passport.authenticate("registro", {failureRedirect: "/api/sessions/error"}), async (req, res) => {
    
    // let { nombre, email, password } = req.body
    // if (!nombre || !email || !password) {
    //     res.setHeader('Content-Type', 'application/json');
    //     return res.status(400).json({ error: `complete nombre, email y password` })
    // }
    // let existe = await usuariosManager.getUserBy({ email })
    // if (existe) {
    //     res.setHeader('Content-Type', 'application/json');
    //     return res.status(400).json({ error: `Ya existe un usuario con ese ${email}` })
    // }
    // password = generaHash(password)
    // try {
    //     let carritoNuevo = await cartmanager.create()
    //     let nuevoUser= await usuariosManager.create({nombre, email, password, rol: "user", carrito: carritoNuevo._id})
    //     res.setHeader('Content-Type', 'application/json');
    //     return res.status(200).json({
    //         message: "registro correcto", nuevoUser
    //     });
    // } catch (error) {
    //     console.log(error);
    //     res.setHeader('Content-Type','application/json');
    //     return res.status(500).json(
    //         {
    //             error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
    //             detalle:`${error.message}`
    //         }
    //     )
        
    // }

    res.setHeader('Content-Type','application/json');
    return res.status(201).json({mensaje:"registo ok", nuevoUsuario:req.user});

})
router.post('/login',passport.authenticate("login", {failureRedirect: "/api/sessions/error"}), async (req,res) => {
    // let { email, password } = req.body
    // if (!email || !password) {
    //     res.setHeader('Content-Type', 'application/json');
    //     return res.status(400).json({ error: `complete email y password` })
    // }
//    let user = await usuariosManager.getUserBy({ email, password:generaHash(password) })
    // let user = await usuariosManager.getUserBy({ email})

    // if (!user) {
    //     res.setHeader('Content-Type', 'application/json');
    //     return res.status(400).json({ error: `Credenciales invalidas}` })
    // } 
    // if(!validaPassword(password, user.password)){
    //     res.setHeader('Content-Type', 'application/json');
    //     return res.status(400).json({ error: `Credenciales invalidas}` })
    // }


    let user = {...req.user}
    delete user.password
    req.session.user= user
    
    
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:'Login correcto', user});
})
router.get('/logOut', (req,res) => {
    req.session.destroy(e=> {
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${error.message}`
                }
            )
            
        }
    })
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:'Logout exitoso'});
})
export default router