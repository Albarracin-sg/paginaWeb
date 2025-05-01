// Cargar variables de entorno del archivo .env
require('dotenv').config();

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db.config'); // Importar la configuración de la base de datos

const app = express();
const port = process.env.PORT || 5000;

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Middleware para permitir peticiones desde tu frontend (CORS)
const cors = require('cors');
app.use(cors());

// Montar las rutas de autenticación bajo el prefijo /api/auth
app.use('/api/auth', authRoutes);

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

// Iniciar el servidor DESPUÉS de verificar/crear la tabla de usuarios
async function startServer() {
  try {
    // Verificar/crear la tabla de usuarios
    await db.createUsersTable();

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor backend escuchando en http://localhost:${port}`);
    });

  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    // El error al crear la tabla ya se maneja en db.config.js, pero este catch es para otros errores
    process.exit(1);
  }
}

startServer(); // Llama a la función para iniciar el servidor