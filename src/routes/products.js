const express = require('express');
const router = express.Router();
const authorization = require('../middleware/authorization');

router.post('/', authorization('admin'), async (req, res) => {
  // Lógica para crear un producto...
});

router.put('/:id', authorization('admin'), async (req, res) => {
  // Lógica para actualizar un producto...
});

router.delete('/:id', authorization('admin'), async (req, res) => {
  // Lógica para eliminar un producto...
});

module.exports = router;