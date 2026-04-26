const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET - obtener todas las transacciones
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transacciones ORDER BY fecha DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - crear una transacción
router.post('/', async (req, res) => {
  const { monto, descripcion, tipo, categoria_id, usuario_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO transacciones (monto, descripcion, tipo, categoria_id, usuario_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [monto, descripcion, tipo, categoria_id, usuario_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// PUT - editar transacción
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { monto, descripcion, tipo } = req.body;
  try {
    const result = await pool.query(
      'UPDATE transacciones SET monto=$1, descripcion=$2, tipo=$3 WHERE id=$4 RETURNING *',
      [monto, descripcion, tipo, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - eliminar transacción
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM transacciones WHERE id=$1', [id]);
    res.json({ mensaje: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;