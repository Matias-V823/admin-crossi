import express from "express";
import verificarToken from "../middlewares/verificacionToken.js";
import { connectDB } from "../db.js";

const router = express.Router();

// Middleware para conectar a la base de datos antes de cada consulta
router.use(async (req, res, next) => {
  try {
    req.conn = await connectDB();
    next();
  } catch (error) {
    return res
      .status(500)
      .send("Error al conectar con la base de datos: " + error.message);
  }
});

router.get("/auth/maquinas", async (req, res) => {
  try {
    const sql = "SELECT * FROM MAQUINAS";
    const [results] = await req.conn.query(sql);
    res.json(results);
  } catch (error) {
    res.status(500).send("Error al obtener las máquinas: " + error.message);
  } finally {
    req.conn.end();
  }
});

router.post("/auth/maquinas", async (req, res) => {
  const { cod_empresa, cod_tipo_maquina, nombre, descripcion, precio } =
    req.body;
  const sql =
    "INSERT INTO MAQUINAS (cod_empresa, cod_tipo_maquina, nombre, descripcion, precio) VALUES (?, ?, ?, ?, ?)";

  try {
    await req.conn.query(sql, [
      cod_empresa,
      cod_tipo_maquina,
      nombre,
      descripcion,
      precio,
    ]);
    res.status(201).send("Máquina creada con éxito");
  } catch (error) {
    res.status(500).send("Error al insertar la máquina: " + error.message);
  } finally {
    req.conn.end();
  }
});

router.put("/auth/maquinas", async (req, res) => {
  const {
    cod_maquina,
    cod_empresa,
    cod_tipo_maquina,
    nombre,
    descripcion,
    precio,
  } = req.body;
  const sql =
    "UPDATE MAQUINAS SET cod_empresa = ?, cod_tipo_maquina = ?, nombre = ?, descripcion = ?, precio = ? WHERE cod_maquina = ?";

  try {
    await req.conn.query(sql, [
      cod_empresa,
      cod_tipo_maquina,
      nombre,
      descripcion,
      precio,
      cod_maquina,
    ]);
    res.send("Máquina actualizada con éxito");
  } catch (error) {
    res.status(500).send("Error al actualizar la máquina: " + error.message);
  } finally {
    req.conn.end();
  }
});

router.delete("/auth/maquinas", async (req, res) => {
  const { cod_maquina } = req.body;
  const sql = "DELETE FROM MAQUINAS WHERE cod_maquina = ?";

  try {
    await req.conn.query(sql, [cod_maquina]);
    res.send("Máquina eliminada con éxito");
  } catch (error) {
    res.status(500).send("Error al eliminar la máquina: " + error.message);
  } finally {
    req.conn.end();
  }
});

export default router;
