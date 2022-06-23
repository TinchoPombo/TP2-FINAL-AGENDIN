import TipoEvento from '../modelo/TipoEvento.js'
import Dao from './Dao.js'
import { ConectarMongodb } from './ConectarMongodb.js'

class TipoEventoMongodb implements Dao<TipoEvento,number>{
    

    private conectarMongodb : ConectarMongodb = new ConectarMongodb();

    async add (Element: TipoEvento) : Promise<TipoEvento> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('tipoEventos');

        let objId = await collection.find().sort({ id: -1 }).limit(1).toArray()
        let idX 
        objId.length == 0 ? idX = 1 : idX = objId[0].id + 1

        let tipoEvento = {
            id : idX,
            descripcion : Element.descripcion
        }


        await collection.insertOne(tipoEvento);
        await this.conectarMongodb.desconectar();
        return Promise.resolve(Element);
    }

    async getAll () : Promise<TipoEvento[]> {
        const eventos: Array<TipoEvento> = [];        
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('tipoEventos');
        const findResult = await collection.find({}).toArray();        
        findResult.forEach(e =>  {eventos.push(new TipoEvento(e.id, e.descripcion))} );

        await this.conectarMongodb.desconectar();
        return Promise.resolve(eventos);
    }

    async get (clave: number) : Promise<TipoEvento> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('tipoEventos');
        const findResult = await collection.findOne({id:clave});        
        await this.conectarMongodb.desconectar();
        const evento = new TipoEvento(0, '');
        if(findResult !== null) {
            evento.id = findResult.id;
            evento.descripcion = findResult.descripcion;
        }
        return Promise.resolve(evento);
    }

    async delete(Clave: number) : Promise<boolean>{
        let ok = false;
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('tipoEventos');
        const findResult = await collection.deleteOne({id:Clave})
        await this.conectarMongodb.desconectar();
        if(findResult.deletedCount != 0)
            ok = true
        return Promise.resolve(ok);
    };
     

}

export {TipoEventoMongodb}