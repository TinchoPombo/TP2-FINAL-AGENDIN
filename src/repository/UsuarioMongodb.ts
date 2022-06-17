import Usuario from '../modelo/Usuario.js'
import Dao from './Dao.js'
import { ConectarMongodb } from './ConectarMongodb.js'

class UsuarioMongodb implements Dao<Usuario,number>{
    

    private conectarMongodb : ConectarMongodb = new ConectarMongodb();

    async add (Element: Usuario) : Promise<Usuario> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('usuarios');
        await collection.insertOne(Element);
        await this.conectarMongodb.desconectar();
        return Promise.resolve(Element);
    }

    async getAll () : Promise<Usuario[]> {
        const eventos: Array<Usuario> = [];        
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('usuarios');
        const findResult = await collection.find({}).toArray();        
        findResult.forEach(e =>  {eventos.push(new Usuario(e.id, e.nombre, e.mail, e.telefono))} );

        await this.conectarMongodb.desconectar();
        return Promise.resolve(eventos);
    }

    async get (clave: number) : Promise<Usuario> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('usuarios');
        const findResult = await collection.findOne({id:clave});        
        await this.conectarMongodb.desconectar();
        const evento = new Usuario(0, '', '', '');
        if(findResult !== null) {
            evento.id = findResult.id;
            evento.nombre = findResult.nombre;
            evento.mail = findResult.mail;
            evento.telefono = findResult.telefono;
        }
        return Promise.resolve(evento);
    }

    async delete(Clave: number) : Promise<boolean>{
        let ok = false;
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('usuarios');
        const findResult = await collection.deleteOne({id:Clave})
        await this.conectarMongodb.desconectar();
        if(findResult.deletedCount != 0)
            ok = true
        return Promise.resolve(ok);
    };
     

}

export {UsuarioMongodb}