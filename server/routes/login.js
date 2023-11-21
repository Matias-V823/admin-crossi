import express from 'express';
import { connectDB } from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const conn = await connectDB();
    const [rows] = await conn.query('SELECT * FROM USUARIOS WHERE usuario = ?', [username]);
    conn.end()
    if (rows.length === 0 || !bcrypt.compareSync(password, rows[0].clave)) {
      // Compara las credenciales que ingresa con las de la base de datos
      res.status(401).json({ message: 'Credenciales incorrectas' });
      return;
    }

    res.json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error en la consulta SQL:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

export default router;
