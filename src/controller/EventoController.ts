import express from 'express'
import {EventoMongodb} from '../repository/EventoMongodb.js'

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
        const rta = await eventoMongodb.get(req.body.id)
        if(rta.id != null){
            res.status(200).send(rta)
        }else{
            res.status(404).send( {mensaje : "No se encontraron registron con esta clave"} )
        }
    }

    async delete(req: express.Request, res: express.Response){
        const eventoMongodb : EventoMongodb = new EventoMongodb()
        if(await eventoMongodb.delete(req.body.id)){
            res.status(200).send( {mensaje: "Registro borrado correctamente"})
        }else{
            res.status(400).send( {mensaje: "No se encontro el registro"} )
        }
    }

}

export default new EventoController()