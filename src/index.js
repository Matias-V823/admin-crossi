//index.js
import process from 'process';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const __dirname = path.resolve();

// Configura la ruta estática para los archivos de tu aplicación React (construidos)
app.use(express.static(path.join(__dirname, 'cliente/build')));

// Ruta para la página de inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'cliente/build', 'index.html'));
});

// Otras rutas para las demás páginas

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});
