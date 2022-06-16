import express from 'express'
import EventoController from '../controller/EventoController.js'

class EventoRouter{
    app : express.Application
    nombre : string

    constructor(app: express.Application, nombre: string){
        this.app = app
        this.nombre = nombre
        this.configurarRutas()
    }

    configurarRutas(){
        this.app.route(this.nombre)
        .get(EventoController.getAll)
        .post(EventoController.add)

        this.app.route(this.nombre + "/:id")
        .get(EventoController.get)
        .delete(EventoController.delete)

        return this.app
    }

}

export default EventoRouter