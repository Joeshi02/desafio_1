import passport from "passport";
import local from "passport-local"
import github from "passport-github2"
import UsuariosManager from "../dao/usuariosManager.js";
import { generaHash, validaPassword } from "../utils.js";
import Cartmanager from "../dao/cartManager.js";

const usuariosManager = new UsuariosManager()
const cartmanager = new Cartmanager()

export const initPassport = () => {
    //paso 1 

    passport.use(
        "registro",
        new local.Strategy(
            {
                usernameField: "email",
                passReqToCallback: true
            },
            async (req, username, password, done) => {
                try {
                    let { nombre } = req.body
                    if (!nombre) {
                        // res.setHeader('Content-Type', 'application/json');
                        // return res.status(400).json({ error: `complete nombre, email y password` })
                        return done(null, false)
                    }
                    let existe = await usuariosManager.getUserBy({ email: username })
                    if (existe) {
                        // res.setHeader('Content-Type', 'application/json');
                        // return res.status(400).json({ error: `Ya existe un usuario con ese ${email}` })

                        return done(null, false)
                    }
                    password = generaHash(password)
                    let carritoNuevo = await cartmanager.create()
                    let nuevoUser = await usuariosManager.create({ nombre, email: username, password, rol: "user", carrito: carritoNuevo._id })
                    // res.setHeader('Content-Type', 'application/json');
                    // return res.status(200).json({
                    //     message: "registro correcto", nuevoUser
                    // });
                    return done(null, nuevoUser)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField: "email",

            },
            async (username, password, done) => {
                try {
                    let user = await usuariosManager.getUserBy({ email:username })

                    if (!user) {
                        // res.setHeader('Content-Type', 'application/json');
                        // return res.status(400).json({ error: `Credenciales invalidas}` })
                        return done (null, false)
                    }
                    if (!validaPassword(password, user.password)) {
//                         res.setHeader('Content-Type', 'application/json');
                        // return res.status(400).json({ error: `Credenciales invalidas}` })
                        return done (null, false)
                    }

                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        "github",
        new github.Strategy(
            {
                clientID:"Iv23lihPgM8xiyc5Cb0u",
                clientSecret:"35e9853d890b8e39251761ef643bc2f11769ae99",
                callbackURL:"http://localhost:8080/api/sessions/callbackGithub"
            },
            async(tokenAcceso, tokenRefresh, profile, done) => {
                try {
                    console.log(profile)
                    let email= profile._json.email
                    let nombre= profile._json.name
                    let usuario = await usuariosManager.getUserBy({email})
                    if (!usuario) {
                        let carritoNuevo = await cartmanager.create()
                        usuario = await usuariosManager.create({
                            nombre, email, profile, carrito: carritoNuevo._id
                        })
                    }
                    return done (null, usuario)
                } catch (error) {
                   return done( error) 
                }
            }
        )
    )
    //paso 1bis (solo si usamos session)

    passport.serializeUser((usuario, done) => {
        return done(null, usuario._id)
    })
    passport.deserializeUser(async (id, done) => {
        let usuario = await usuariosManager.getUserBy({ _id: id })
        return done(null, usuario)
    })
}