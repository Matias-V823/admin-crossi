import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
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
    secret: 'mi-secreto-seguro', // Cambia esto por una cadena secreta más segura en un entorno de producción
    resave: false,
    saveUninitialized: true
}));

// Configuración de CORS (Asegúrate de que las opciones de CORS estén definidas)
// const corsOptions = {
//     origin: "http://localhost:4000", // Reemplaza con la URL de tu cliente
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// };
// app.use(cors(corsOptions));

// Configuración de Helmet para mejorar la seguridad
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "cdn.example.com", "fonts.googleapis.com"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "cdn.example.com", "localhost:4000"],
        fontSrc: ["'self'", "fonts.gstatic.com"],
        // Otras directivas según sea necesario
    },
}));

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../cliente/index.html'));
});

app.post('/api/login', login);
app.post('/api/registro', registro);

// Iniciar servidor
app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});
