require('dotenv').config();

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db.config'); //configuración de la base de datos

const app = express();
const port = process.env.PORT || 5000;

// parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// permite peticiones desde tu frontend (CORS)
const cors = require('cors');
app.use(cors());

// Montar las rutas de autenticación bajo el prefijo /api/auth
app.use('/api/auth', authRoutes);

// Ruta básica de prueba
app.get('/', (res) => {
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
    process.exit(1);
  }
}

startServer();