import Evento from '../modelo/Evento.js'
import Dao from './Dao.js'
import { ConectarMongodb } from './ConectarMongodb.js'

class EventoMongodb implements Dao<Evento,number>{
    

    private conectarMongodb : ConectarMongodb = new ConectarMongodb();

    async add (Element: Evento) : Promise<Evento> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('eventos');
        /* let idX = await collection.estimatedDocumentCount() + 1 */
        let objId = await collection.find().sort({ id: -1 }).limit(1).toArray()
        let idX = objId[0].id + 1
        
        let evento = {
            id : idX,
            fecha : Element.fecha,
            descripcion : Element.descripcion,
            idUsuario : Element.idUsuario,
            idTipoEvento : Element.idTipoEvento
        }
        await collection.insertOne(evento);
        await this.conectarMongodb.desconectar();
        return Promise.resolve(Element);
    }

    async getAll () : Promise<Evento[]> {
        const eventos: Array<Evento> = [];        
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('eventos');
        const findResult = await collection.find({}).toArray();        
        findResult.forEach(e =>  {eventos.push(new Evento(e.id, e.fecha, e.descripcion, e.idUsuario, e.idTipoEvento))} );
            
            // Element: {
            // id: number; 
            // fecha: Date; 
            // descripcion: string; 
            // idUsuario: number; 
            // idTipoEvento: number;
            //  }
        //findResult.forEach(() => {eventos.push(new Evento())})


        await this.conectarMongodb.desconectar();
        return Promise.resolve(eventos);
    }

    async get (clave: number) : Promise<Evento> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('eventos');
        const findResult = await collection.findOne({id:clave});        
        await this.conectarMongodb.desconectar();
        const evento = new Evento(0, new Date(),'', 0, 0);
        if(findResult !== null) {
            evento.id = findResult.id;
            evento.fecha = findResult.fecha;
            evento.descripcion = findResult.descripcion;
            evento.idUsuario = findResult.idUsuario;
            evento.idTipoEvento = findResult.idTipoEvento;
        }
        return Promise.resolve(evento);
    }

    async delete(Clave: number) : Promise<boolean>{
        let ok = false;
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('eventos');
        const findResult = await collection.deleteOne({id:Clave})
        await this.conectarMongodb.desconectar();
        if(findResult.deletedCount != 0)
            ok = true
        return Promise.resolve(ok);
    };

    async getXIdUsuario(id : number) : Promise<Evento[]>{
        const eventos: Array<Evento> = [];        
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('eventos');
        const findResult = await collection.find({ idUsuario: id }).toArray();        
        findResult.forEach(e =>  {eventos.push(new Evento(e.id, e.fecha, e.descripcion, e.idUsuario, e.idTipoEvento))} );
        await this.conectarMongodb.desconectar();
        return Promise.resolve(eventos);

    }     

}

export {EventoMongodb}