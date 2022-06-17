import express from 'express'
import {TipoEventoMongodb} from '../repository/TipoEventoMongodb.js'

class TipoEventoController{

    async getAll(req:express.Request, res: express.Response){
        const tipoEventoMongodb : TipoEventoMongodb = new TipoEventoMongodb()
        res.status(200).send(await tipoEventoMongodb.getAll())
    }

    async add(req: express.Request, res: express.Response){
        const tipoEventoMongodb : TipoEventoMongodb = new TipoEventoMongodb()
        res.status(200).send(await tipoEventoMongodb.add(req.body))
    }

    async get(req: express.Request, res: express.Response){
        const tipoeventoMongodb : TipoEventoMongodb = new TipoEventoMongodb()
        const rta = await tipoeventoMongodb.get(parseInt(req.params.id))
        if(rta.id != 0){
            res.status(200).send(rta)
        }else{
            res.status(404).send( {mensaje : "No se encontraron registron con esta clave"} )
        }
    }

    async delete(req: express.Request, res: express.Response){
        const tipoeventoMongodb : TipoEventoMongodb = new TipoEventoMongodb()
        if(await tipoeventoMongodb.delete(parseInt(req.params.id))){
            res.status(200).send( {mensaje: "Registro borrado correctamente"})
        }else{
            res.status(400).send( {mensaje: "No se encontro el registro"} )
        }
    }

}

export default new TipoEventoController()