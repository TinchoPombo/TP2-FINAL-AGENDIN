import express from 'express'
import UsuarioController from '../controller/UsuarioController.js'

class UsuarioRouter{
    app : express.Application
    nombre : string

    constructor(app: express.Application, nombre: string){
        this.app = app
        this.nombre = nombre
        this.configurarRutas()
    }

    configurarRutas(){
        this.app.route(this.nombre)
        .get(UsuarioController.getAll)
        .post(UsuarioController.add)

        this.app.route(this.nombre + "/:id")
        .get(UsuarioController.get)
        .delete(UsuarioController.delete)

        return this.app
    }

}

export default UsuarioRouter