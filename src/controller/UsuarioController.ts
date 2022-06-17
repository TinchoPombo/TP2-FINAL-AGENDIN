import express from 'express'
import {UsuarioMongodb} from '../repository/UsuarioMongodb.js'
import EventoController from '../controller/EventoController.js'
import TipoEventoController from '../controller/TipoEventoController.js'
import Evento from '../modelo/Evento.js'
import { json } from 'body-parser'


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
            const listaTipoEventos = TipoEventoController.getAllTipoEventos(req, res);
            const listaEventos = EventoController.getEventosById(rta.id);
            let listaFormateada = new Array<string>();
            (await listaEventos).forEach( async e =>
                {
                    
                    var i = 0;
                    var encontre = false;
                    var s : string = ""

                    while( (i < (await listaTipoEventos).length) && !encontre){
                        if( (await listaTipoEventos)[i].id == e.idTipoEvento ){                            
                            s = (await listaTipoEventos)[i].descripcion
                            encontre = true
                        }else{
                            i++
                        }


                    }
                    console.log("prueba 1");
                    console.log(e);
                    console.log(s);
                    
                    var ret = this.mapEventos(e,s)

                    console.log(ret);

                    listaFormateada.push(ret)

                    console.log("lista: " + listaFormateada);
                    
                })
        
            
            res.status(200).send({mensaje: "Informacion enviada por E-mail, revise su casilla de correo electronico" + listaFormateada})
        }else{
            res.status(404).send( {mensaje : "No se encontraron registron con esta clave"} )
        }
    }

    mapEventos(e : Evento, nombre : string){
        console.log("entre");
        
        return '{"Fecha": ' + e.fecha + ', "descripcion": ' + e.descripcion + ', "tipo": ' + nombre + '}'        
    }

    

}

export default new UsuarioController()