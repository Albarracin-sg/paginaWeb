const mysql = require('mysql2/promise'); 
require('dotenv').config(); 

// Configuración del pool de conexiones a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root', 
  password: process.env.DB_PASSWORD || 'password', 
  database: process.env.DB_NAME || 'mydatabase', 
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexiones en el pool
  queueLimit: 0 // Sin límite en la cola de conexiones
});

exports.pool = pool;

// Función para crear la tabla de usuarios si no existe
exports.createUsersTable = async () => {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE, -- UNIQUE asegura que no haya emails duplicados
      password VARCHAR(255) NOT NULL,     -- Aquí se almacenará el hash de la contraseña
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `;
  try {
    await pool.query(createTableQuery);
    console.log('Tabla "users" verificada/creada exitosamente.');
  } catch (error) {
    console.error('Error al crear la tabla "users":', error);
    process.exit(1); //si falla la creación de la tabla
  }
};