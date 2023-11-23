import express from "express";
import { connectDB } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const conn = await connectDB();
    const [rows] = await conn.query(
      "SELECT * FROM USUARIOS WHERE usuario = ?",
      [username]
    );
    conn.end();

    if (rows.length === 0 || !bcrypt.compareSync(password, rows[0].clave)) {
      // Si no hay coincidencia de usuario o la contraseña no coincide
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Si el usuario es válido, generar y enviar token
    const token = jwt.sign(
      { userId: rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "30s" } // Duración del token
    );
    res.json({ token });
  } catch (error) {
    console.error("Error en la consulta SQL:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

export default router;
