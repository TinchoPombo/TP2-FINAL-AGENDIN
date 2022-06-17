import express from 'express'
import {EventoMongodb} from '../repository/EventoMongodb.js'
// import {UsuarioController} from '../controller/UsuarioController.js'
// import {TipoEventoController} from '../controller/TipoEventoController.js'


class EventoController{

    async getAll(req:express.Request, res: express.Response){
        const eventoMongodb : EventoMongodb = new EventoMongodb()
        res.status(200).send(await eventoMongodb.getAll())
    }

    async add(req: express.Request, res: express.Response){
        const eventoMongodb : EventoMongodb = new EventoMongodb()
        res.status(200).send(await eventoMongodb.add(req.body))
    }

    async get(req: express.Request, res: express.Response){
        const eventoMongodb : EventoMongodb = new EventoMongodb()
        const rta = await eventoMongodb.get(parseInt(req.params.id))
        if(rta.id != 0){
            res.status(200).send(rta)
        }else{
            res.status(404).send( {mensaje : "No se encontraron registron con esta clave"} )
        }
    }

    async delete(req: express.Request, res: express.Response){
        const eventoMongodb : EventoMongodb = new EventoMongodb()
        if(await eventoMongodb.delete(parseInt(req.params.id))){
            res.status(200).send( {mensaje: "Registro borrado correctamente"})
        }else{
            res.status(400).send( {mensaje: "No se encontro el registro"} )
        }
    }

    // async getEventosPorUsuario(req: express.Request, res: express.Response){
    //     const eventoMongodb : EventoMongodb = new EventoMongodb()
    //     const rta = await eventoMongodb.get(parseInt(req.params.id))
    //     // const rta2 = await eventoMongodb.get(parseInt(req.params.id))
    //     // const rta3 = await eventoMongodb.get(parseInt(req.params.id))
    //     if(rta.id != 0){

    //         res.status(200).send(rta)
    //     }else{
    //         res.status(404).send( {mensaje : "No se encontraron registron con esta clave"} )
    //     }
    // }

}

export default new EventoController()