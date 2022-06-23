var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UsuarioMongodb } from '../repository/UsuarioMongodb.js';
import EventoController from '../controller/EventoController.js';
import TipoEventoController from '../controller/TipoEventoController.js';
import { Email } from '../shared/Email.js';
class UsuarioController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioMongodb = new UsuarioMongodb();
            res.status(200).send(yield usuarioMongodb.getAll());
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioMongodb = new UsuarioMongodb();
            res.status(200).send(yield usuarioMongodb.add(req.body));
            const email = new Email();
            email.enviar(req.body.mail, "Bienvenido!", "Bienvenido a Agendin, su agenda virtual.", "");
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioMongodb = new UsuarioMongodb();
            const rta = yield usuarioMongodb.get(parseInt(req.params.id));
            if (rta.id != 0) {
                res.status(200).send(rta);
            }
            else {
                res.status(404).send({ mensaje: "No se encontraron registraron con esta clave" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioMongodb = new UsuarioMongodb();
            if (yield usuarioMongodb.delete(parseInt(req.params.id))) {
                res.status(200).send({ mensaje: "Registro borrado correctamente" });
            }
            else {
                res.status(400).send({ mensaje: "No se encontro el registro" });
            }
        });
    }
    getEventosPorUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioMongodb = new UsuarioMongodb();
            const rta = yield usuarioMongodb.get(parseInt(req.params.id));
            if (rta.id != 0) {
                const listaTipoEventos = yield TipoEventoController.getAllTipoEventos(req, res).then();
                const listaEventos = yield EventoController.getEventosById(rta.id).then();
                let listaFormateada = new Array();
                listaEventos.forEach(e => {
                    if (e.idUsuario == rta.id) {
                        let idTipoEven = e.idTipoEvento;
                        let nombre = listaTipoEventos[idTipoEven - 1].descripcion;
                        /* let data = {
                             Fecha : e.fecha,
                             Descripcion : e.descripcion,
                             Tipo : nombre
                         } */
                        /* var jData = JSON.parse(data.toString()) */
                        listaFormateada.push(JSON.parse('{"Fecha": "' + e.fecha.toString() + '", "descripcion": "' + e.descripcion + '", "tipo": "' + nombre + '"}'));
                    }
                });
                console.log(listaFormateada);
                res.status(200).send(listaFormateada);
                const email = new Email();
                email.enviar(rta.mail, "Tus eventos", JSON.stringify(listaFormateada), "");
            }
            else {
                res.status(404).send({ mensaje: "No se encontraron registros con esta clave" });
            }
        });
    }
}
export default new UsuarioController();
