var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TipoEventoMongodb } from '../repository/TipoEventoMongodb.js';
class TipoEventoController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoEventoMongodb = new TipoEventoMongodb();
            res.status(200).send(yield tipoEventoMongodb.getAll());
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoEventoMongodb = new TipoEventoMongodb();
            res.status(200).send(yield tipoEventoMongodb.add(req.body));
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoeventoMongodb = new TipoEventoMongodb();
            const rta = yield tipoeventoMongodb.get(parseInt(req.params.id));
            if (rta.id != 0) {
                res.status(200).send(rta);
            }
            else {
                res.status(404).send({ mensaje: "No se encontraron registron con esta clave" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoeventoMongodb = new TipoEventoMongodb();
            if (yield tipoeventoMongodb.delete(parseInt(req.params.id))) {
                res.status(200).send({ mensaje: "Registro borrado correctamente" });
            }
            else {
                res.status(400).send({ mensaje: "No se encontro el registro" });
            }
        });
    }
    getAllTipoEventos(req, res) {
        const tipoEventoMongodb = new TipoEventoMongodb();
        return tipoEventoMongodb.getAll();
    }
}
export default new TipoEventoController();
