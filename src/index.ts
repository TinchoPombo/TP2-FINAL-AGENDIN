import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import EventoRouter from './routers/EventoRouter.js'
import TipoEventoRouter from './routers/TipoEventoRouter.js'
import UsuarioRouter from './routers/UsuarioRouter.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())

new EventoRouter(app, "/eventos")
new TipoEventoRouter(app, "/tipoeventos")
new UsuarioRouter(app, '/usuarios')

const port = 3000
console.log("a");

app.listen(port, () => {
    console.log('Escuchando en port: ' + port);
})
