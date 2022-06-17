import express from 'express'
import {UsuarioMongodb} from '../repository/UsuarioMongodb.js'
import EventoController from '../controller/EventoController.js'
import TipoEventoController from '../controller/TipoEventoController.js'

class UsuarioController{

    async getAll(req:express.Request, res: express.Response){
        const usuarioMongodb : UsuarioMongodb = new UsuarioMongodb()
        res.status(200).send(await usuarioMongodb.getAll())
    }

    async add(req: express.Request, res: express.Response){
        const usuarioMongodb : UsuarioMongodb = new UsuarioMongodb()
        res.status(200).send(await usuarioMongodb.add(req.body))
    }

    async get(req: express.Request, res: express.Response){
        const usuarioMongodb : UsuarioMongodb = new UsuarioMongodb()
        const rta = await usuarioMongodb.get(parseInt(req.params.id))
        if(rta.id != 0){
            res.status(200).send(rta)
        }else{
            res.status(404).send( {mensaje : "No se encontraron registraron con esta clave"} )
        }
    }

    async delete(req: express.Request, res: express.Response){
        const usuarioMongodb : UsuarioMongodb = new UsuarioMongodb()
        if(await usuarioMongodb.delete(parseInt(req.params.id))){
            res.status(200).send( {mensaje: "Registro borrado correctamente"})
        }else{
            res.status(400).send( {mensaje: "No se encontro el registro"} )
        }
    }

    async getEventosPorUsuario(req: express.Request, res: express.Response){
        const usuarioMongodb : UsuarioMongodb = new UsuarioMongodb()
        const rta = await usuarioMongodb.get(parseInt(req.params.id))
        if(rta.id != 0){
            const listaTipoEventos = TipoEventoController.getAll(req, res);
            // const listaEventos = EventoController.getEventosById(rta.id)
            
            res.status(200).send({mensaje: "Informacion enviada por E-mail, revise su casilla de correo electronico"})
        }else{
            res.status(404).send( {mensaje : "No se encontraron registron con esta clave"} )
        }
    }

}

export default new UsuarioController()