var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Usuario from '../modelo/Usuario.js';
import { ConectarMongodb } from './ConectarMongodb.js';
class UsuarioMongodb {
    constructor() {
        this.conectarMongodb = new ConectarMongodb();
    }
    add(Element) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('usuarios');
            let idX = (yield collection.estimatedDocumentCount()) + 1;
            let usuario = {
                id: idX,
                nombre: Element.nombre,
                mail: Element.mail,
                telefono: Element.telefono
            };
            yield collection.insertOne(usuario);
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(Element);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const eventos = [];
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('usuarios');
            const findResult = yield collection.find({}).toArray();
            findResult.forEach(e => { eventos.push(new Usuario(e.id, e.nombre, e.mail, e.telefono)); });
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(eventos);
        });
    }
    get(clave) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('usuarios');
            const findResult = yield collection.findOne({ id: clave });
            yield this.conectarMongodb.desconectar();
            const evento = new Usuario(0, '', '', '');
            if (findResult !== null) {
                evento.id = findResult.id;
                evento.nombre = findResult.nombre;
                evento.mail = findResult.mail;
                evento.telefono = findResult.telefono;
            }
            return Promise.resolve(evento);
        });
    }
    delete(Clave) {
        return __awaiter(this, void 0, void 0, function* () {
            let ok = false;
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('usuarios');
            const findResult = yield collection.deleteOne({ id: Clave });
            yield this.conectarMongodb.desconectar();
            if (findResult.deletedCount != 0)
                ok = true;
            return Promise.resolve(ok);
        });
    }
    ;
}
export { UsuarioMongodb };
