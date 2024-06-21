import { usuariosModel } from "./models/usuarios.js";

class UsuariosManager {
    async create (usuario){
        let nuevoUser = await usuariosModel.create(usuario)
        return nuevoUser.toJSON()
    }
    async getUserBy (filtro = {}){
        return await usuariosModel.findOne(filtro).lean()
    }
}

export default UsuariosManager