import express from 'express';
import bcrypt from 'bcrypt';
import { connectDB } from '../db.js';

const router = express.Router();

router.post('/api/registro', async (req, res) => {
  const { username, password, rol, nombre, apellido, email, telefono } = req.body;

  try {
    const conn = await connectDB();
    // Comprobamos si ya existe el usuario
    const consultaExistencia = 'SELECT * FROM USUARIOS WHERE usuario = ?';
    const [existingUser] = await conn.query(consultaExistencia, [username]);

    if (existingUser.length > 0) {
      //si devuelve algo es pq el usuario estás
      await conn.end();
      return res.status(400).json({ error: 'El nombre de usuario ya existe' });
    }

    // Encriptar la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insertar datos en la tabla PERSONAS
    const consultaInsercionPersona = 'INSERT INTO PERSONAS (nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)';
    const [resultPersona] = await conn.query(consultaInsercionPersona, [nombre, apellido, email, telefono]);

    // Obtener el ID de la persona recién insertada
    const codPersona = resultPersona.insertId;

    // Insertar datos en la tabla USUARIOS
    const consultaInsercionUsuario = 'INSERT INTO USUARIOS (cod_rol, cod_persona, usuario, clave) VALUES (?, ?, ?, ?)';
    await conn.query(consultaInsercionUsuario, [rol, codPersona, username, hashedPassword]);

    await conn.end();
    return res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default router;
