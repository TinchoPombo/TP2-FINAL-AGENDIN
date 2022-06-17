import {Email} from '../shared/Email.js'
import {Pdf} from '../shared/pdf.js'

class EventosPorUsuarioService {

    async proceso() {

        const archivo = `./output/prueba3.pdf`

        const pdf : Pdf = new Pdf();
        await pdf.crear("Información importante",archivo);
    
        const email : Email = new Email();
        await email.enviar("tomasberias@gmail.com","Asunto","Cuerpo mensaje",archivo);

    }

}

export default EventosPorUsuarioService