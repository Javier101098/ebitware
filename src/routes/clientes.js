const router = require('express').Router();

const clientes = require('../controllers/clientes');

// 
router.post('/POST/NutriNET/Cliente',clientes.new);
router.get('/GET/NutriNET/Cliente/:id?',clientes.list);
router.put('/PUT/NutriNET/Cliente/:id',clientes.update);

module.exports = router;

