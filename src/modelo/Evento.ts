
class Evento{ 

    id : number;
    descripcion : string;
    fecha : Date;
    idUsuario : number;
    idTipoEvento : number;

    constructor(id : number, fecha : Date,  descripcion : string, idUsuario : number, idTipoEvento : number){
            this.id = id;
            this.fecha = fecha;
            this.descripcion = descripcion;
            this.idUsuario = idUsuario;
            this.idTipoEvento = idTipoEvento;
    }

}

export default Evento