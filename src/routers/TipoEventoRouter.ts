import express from 'express'
import TipoEventoController from '../controller/TipoEventoController.js'

class TipoEventoRouter{
    app : express.Application
    nombre : string

    constructor(app: express.Application, nombre: string){
        this.app = app
        this.nombre = nombre
        this.configurarRutas()
    }

    configurarRutas(){
        this.app.route(this.nombre)
        .get(TipoEventoController.getAll)
        .post(TipoEventoController.add)

        this.app.route(this.nombre + "/:id")
        .get(TipoEventoController.get)
        .delete(TipoEventoController.delete)

        return this.app
    }

}

export default TipoEventoRouter