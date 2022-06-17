import TipoEventoController from '../controller/TipoEventoController.js';
class TipoEventoRouter {
    constructor(app, nombre) {
        this.app = app;
        this.nombre = nombre;
        this.configurarRutas();
    }
    configurarRutas() {
        this.app.route(this.nombre)
            .get(TipoEventoController.getAll)
            .post(TipoEventoController.add);
        this.app.route(this.nombre + "/:id")
            .get(TipoEventoController.get)
            .delete(TipoEventoController.delete);
        return this.app;
    }
}
export default TipoEventoRouter;
