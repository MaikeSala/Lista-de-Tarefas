import express from 'express';
import dotenv from 'dotenv';
import mustache from 'mustache-express';
import path from 'path';
import mainRoutes from './routes/index';
import cors from 'cors';

dotenv.config();

const server = express();

server.use(express.json());

server.use(cors());

//Consgigurar tamplate engine(mustache)

server.set('view engine','mustache');
server.set('views', path.join(__dirname,'views'));
server.engine('mustache', mustache());

//Configurar Pasta publica 
server.use(express.static(path.join(__dirname,'../public')));

// Rotas
server.use(mainRoutes);

server.use((req, res) => {
    res.send('Página não encontrada');
});


server.listen(process.env.PORT);