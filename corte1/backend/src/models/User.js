const db = require('../config/db.config'); // Importar el pool de conexiones

// Función para encontrar un usuario por email en la base de datos MySQL
exports.findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
  try {
    // pool.query retorna un array [rows, fields]
    const [rows, fields] = await db.pool.query(query, [email]);
    return rows[0]; // Retorna la primera fila encontrada (el usuario) o undefined si no hay
  } catch (error) {
    console.error('Error al buscar usuario por email:', error);
    throw error; // Relanza el error para que sea manejado por el controlador
  }
};

// Función para crear un nuevo usuario en la base de datos MySQL
exports.createUser = async (userData) => {
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  const values = [userData.name, userData.email, userData.password]; // user.password ya debe estar hasheada

  try {
    // Ejecuta la consulta de inserción
    const [result] = await db.pool.query(query, values);

    // El objeto result contiene información sobre la inserción, incluyendo insertId
    console.log('Resultado de inserción:', result);

    // Retorna el nuevo usuario con el ID generado por la base de datos
    return { id: result.insertId, ...userData };

  } catch (error) {
     // Captura errores específicos de MySQL, como emails duplicados (UNIQUE constraint)
    if (error.code === 'ER_DUP_ENTRY') {
        const duplicateEntryError = new Error('El email ya está registrado');
        duplicateEntryError.status = 409; // Código de conflicto
        throw duplicateEntryError; // Lanza un error específico de duplicado
    }
    console.error('Error al crear usuario en la DB:', error);
    throw error; // Relanza otros errores
  }
};

// Aquí podrías añadir otras funciones relacionadas con usuarios (ej: findUserById, updateUser, deleteUser)