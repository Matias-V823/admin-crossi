//index.js
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import login from './routes/login.js';
import registro from './routes/registro.js'

// Configurar dotenv para manejar variables de entorno
dotenv.config();

// Crear instancia de Express
const app = express();
const port = 3000;
const __dirname = path.resolve();

// Configuraciones de Express
app.set('case sensitive routing', false);
app.set('appName', 'Express course');

// Middlewares
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'test', // Cambia esto por una cadena secreta más segura en un entorno de producción
    resave: false,
    saveUninitialized: true
}));

// Configuración de CORS
const corsOptions = {
    //Aceptar solicitudes del cliente
    origin: "http://localhost:4000", 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../cliente/index.html'));
});

app.post('/api/login', login);
app.post('/api/registro', registro); //Proximanete cambiarlas al archivo ./routes/home.js


app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});
