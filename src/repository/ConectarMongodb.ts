const { MongoClient } = require('mongodb');
class ConectarMongodb {

    private url = 'mongodb://localhost:27017';
    private client = new MongoClient(this.url);
    private dbName = 'Agendin';
    async conectar() {
        await this.client.connect();
        console.log('Conectado a base de datos ' + this.dbName);      
        const db = this.client.db(this.dbName);
        return db;
    }
    async desconectar() {
        await this.client.close();
        console.log('Desconectado de la base de datos ' + this.dbName);
    }
}
export {ConectarMongodb}
