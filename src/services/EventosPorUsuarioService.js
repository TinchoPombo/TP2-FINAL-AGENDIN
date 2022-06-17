var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Email } from '../shared/Email.js';
import { Pdf } from '../shared/Pdf.js';
class EventosPorUsuarioService {
    proceso() {
        return __awaiter(this, void 0, void 0, function* () {
            const archivo = `./output/prueba3.pdf`;
            const pdf = new Pdf();
            yield pdf.crear("Información importante", archivo);
            const email = new Email();
            yield email.enviar("adriancaceres980@gmail.com", "Asunto", "Cuerpo mensaje", archivo);
        });
    }
}
export default EventosPorUsuarioService;
