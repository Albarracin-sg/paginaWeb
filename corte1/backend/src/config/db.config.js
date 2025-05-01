const mysql = require('mysql2/promise'); // Usamos la versión con promesas de mysql2
require('dotenv').config(); // Cargar variables de entorno

// Configuración del pool de conexiones a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root', // Usuario por defecto de MySQL
  password: process.env.DB_PASSWORD || 'password', // Contraseña por defecto de MySQL
  database: process.env.DB_NAME || 'mydatabase', // Nombre de tu base de datos
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexiones en el pool
  queueLimit: 0 // Sin límite en la cola de conexiones
});

// Función para obtener una conexión del pool (aunque con promesas rara vez la necesitas explícitamente)
// exports.getConnection = () => {
//   return pool.getConnection();
// };

// Exportar el pool para usarlo directamente en los modelos
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
      -- Puedes añadir más campos si los necesitas (ej: updated_at)
  );
  `;
  try {
    await pool.query(createTableQuery);
    console.log('Tabla "users" verificada/creada exitosamente.');
  } catch (error) {
    console.error('Error al crear la tabla "users":', error);
    // Considera manejar este error adecuadamente, ya que la app no funcionará sin la tabla
    process.exit(1); // Salir de la aplicación si falla la creación de la tabla
  }
};