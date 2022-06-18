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
            const listaTipoEventos = await TipoEventoController.getAllTipoEventos(req, res).then();
            const listaEventos = await EventoController.getEventosById(rta.id).then();
            let listaFormateada = new Array<string>();

            
            listaEventos.forEach(e => {
                if(e.idUsuario == rta.id){
                    let idTipoEven = e.idTipoEvento
                    let nombre = listaTipoEventos[idTipoEven-1].descripcion
                    listaFormateada.push(
                        '{"Fecha": ' + e.fecha + ', "descripcion": ' + e.descripcion + ', "tipo": ' + nombre + '}'
                        )
                }
            });

            console.log(listaFormateada);
            



            /* (await listaEventos).forEach( async e =>
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
                      
                    var ret = fun(e,s)
                    console.log("ret:" + ret);
                    
                    console.log(listaFormateada[0] = ret )  
                    console.log(listaFormateada);
                    
                    
                })
                
                console.log("lista: " + listaFormateada);
                console.log("listaLength: " + listaFormateada.length); */


            res.status(200).send(listaFormateada)
        }else{
            res.status(404).send( {mensaje : "No se encontraron registros con esta clave"} )
        }


        
    }     

}

export default new UsuarioController()