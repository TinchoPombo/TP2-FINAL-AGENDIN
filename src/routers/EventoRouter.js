import EventoController from '../controller/EventoController.js';
class EventoRouter {
    constructor(app, nombre) {
        this.app = app;
        this.nombre = nombre;
        this.configurarRutas();
    }
    configurarRutas() {
        this.app.route(this.nombre)
            .get(EventoController.getAll)
            .post(EventoController.add);
        this.app.route(this.nombre + "/:id")
            .get(EventoController.get)
            .delete(EventoController.delete)
            .put(EventoController.edit);
        return this.app;
    }
}
export default EventoRouter;
