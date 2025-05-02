const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Importa el controlador

// Ruta registro de usuarios (POST /api/auth/register)
router.post('/register', authController.register);

// Ruta inicio de sesión de usuarios (POST /api/auth/login)
router.post('/login', authController.login);

module.exports = router; // Exporta el router para usarlo en server.js