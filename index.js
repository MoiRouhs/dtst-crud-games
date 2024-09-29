import connection from './database/connection.js';
import  express, { json, urlencoded } from 'express';
import cors from "cors";
import GamesRoutes from './routes/games.js';

console.log('Inicia el app')

//Abre conexión a la DB
let conexion = await connection();
  await conexion.iniciar();

// Inicia express
const app = express()
const port = process.env.PORT
app.use(json());
app.use(urlencoded({extended: true}));
app.use(cors());

// Endpoint de test
app.get('/', (req, res) => {
  res.send('App en ejecución') 
})
app.get('/api/test', (req, res) => {
  return res.status(200).send({
	  message: "Esto es un test"
  });  
})

// Endpoint de games
app.use('/api/game', GamesRoutes );


app.listen(port, () => {
  console.log(`App running in port ${port}`)
})
