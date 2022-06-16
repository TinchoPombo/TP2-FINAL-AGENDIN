import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import EventoRouter from './routers/EventoRouter.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())

new EventoRouter(app, "/eventos")

const port = 3000
console.log("a");

app.listen(port, () => {
    console.log('Escuchando en port: ' + port);
})
