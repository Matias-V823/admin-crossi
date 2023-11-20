// registroController.js - Controlador para el manejo de registro
import express from 'express';
import bcrypt from 'bcrypt';
import { connectDB } from '../db.js';

const router = express.Router();


router.post('/api/registro', async (req, res) => {
  const { username, password, rol } = req.body;

  try {
    const conn = await connectDB();

    // Comprobar si el usuario ya existe
    const consultaExistencia = 'SELECT * FROM USUARIOS WHERE  = ?';
    const [existingUser] = await conn.query(consultaExistencia, [username]);

    if (existingUser.length > 0) {
      await conn.end();
      return res.status(400).json({error: 'El nombre de usuario ya existe'});
    }

    // Encriptar la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Guardar el nuevo usuario en la base de datos
    const consultaInsercion = 'INSERT INTO USUARIOS (cod_usuario,usuario, clave, cod_rol) VALUES (NULL, ?, ?, ?)';
    await conn.query(consultaInsercion, [username, hashedPassword, rol]);

    await conn.end();
    return res.status(201).json({error : 'Usuario creado exitosamente'});
  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).json({erorr: 'Error en el servidor'});
  }
});

export default router;
