class Usuario{

    id : number;
    nombre : string;
    mail : string;
    telefono : string;

    constructor(id : number, nombre : string, mail : string, telefono : string){

        this.id = id;
        this.nombre = nombre;
        this.mail = mail;
        this.telefono = telefono;

    }

}

export default Usuario