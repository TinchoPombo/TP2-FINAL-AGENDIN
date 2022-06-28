var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Evento from '../modelo/Evento.js';
import { ConectarMongodb } from './ConectarMongodb.js';
class EventoMongodb {
    constructor() {
        this.conectarMongodb = new ConectarMongodb();
    }
    add(Element) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('eventos');
            /* let idX = await collection.estimatedDocumentCount() + 1 */
            let objId = yield collection.find().sort({ id: -1 }).limit(1).toArray();
            let idX;
            objId.length == 0 ? idX = 1 : idX = objId[0].id + 1;
            let evento = {
                id: idX,
                fecha: Element.fecha,
                descripcion: Element.descripcion,
                idUsuario: Element.idUsuario,
                idTipoEvento: Element.idTipoEvento
            };
            yield collection.insertOne(evento);
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(Element);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const eventos = [];
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('eventos');
            const findResult = yield collection.find({}).toArray();
            findResult.forEach(e => { eventos.push(new Evento(e.id, e.fecha, e.descripcion, e.idUsuario, e.idTipoEvento)); });
            // Element: {
            // id: number; 
            // fecha: Date; 
            // descripcion: string; 
            // idUsuario: number; 
            // idTipoEvento: number;
            //  }
            //findResult.forEach(() => {eventos.push(new Evento())})
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(eventos);
        });
    }
    get(clave) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('eventos');
            const findResult = yield collection.findOne({ id: clave });
            yield this.conectarMongodb.desconectar();
            const evento = new Evento(0, new Date(), '', 0, 0);
            if (findResult !== null) {
                evento.id = findResult.id;
                evento.fecha = findResult.fecha;
                evento.descripcion = findResult.descripcion;
                evento.idUsuario = findResult.idUsuario;
                evento.idTipoEvento = findResult.idTipoEvento;
            }
            return Promise.resolve(evento);
        });
    }
    delete(Clave) {
        return __awaiter(this, void 0, void 0, function* () {
            let ok = false;
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('eventos');
            const findResult = yield collection.deleteOne({ id: Clave });
            yield this.conectarMongodb.desconectar();
            if (findResult.deletedCount != 0)
                ok = true;
            return Promise.resolve(ok);
        });
    }
    ;
    getXIdUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventos = [];
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('eventos');
            const findResult = yield collection.find({ idUsuario: id }).toArray();
            findResult.forEach(e => { eventos.push(new Evento(e.id, e.fecha, e.descripcion, e.idUsuario, e.idTipoEvento)); });
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(eventos);
        });
    }
    edit(element, idEditar) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            console.log(element);
            console.log(idEditar);
            const collection = db.collection('eventos');
            console.log(yield collection.replaceOne({ "id": idEditar }, {
                id: idEditar,
                fecha: element.fecha,
                descripcion: element.descripcion,
                idUsuario: element.idUsuario,
                idTipoEvento: element.idTipoEvento
            }));
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(element);
        });
    }
}
export { EventoMongodb };
