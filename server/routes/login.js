import express from 'express';
import { connectDB } from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const conn = await connectDB();
    const [rows] = await conn.query('SELECT * FROM USUARIOS WHERE usuario = ?', [username]);
    if (rows.length === 0 || !bcrypt.compareSync(password, rows[0].clave)) {
      // Si las credenciales son incorrectas, envía una respuesta de error
      res.status(401).json({ message: 'Credenciales incorrectas' });
      return;
    }

    // Aquí puedes establecer la sesión del usuario o generar un token de autenticación
    // Luego, envía una respuesta exitosa

    res.json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error en la consulta SQL:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

export default router;
