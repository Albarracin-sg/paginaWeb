const bcrypt = require('bcrypt');

const saltRounds = 10; // numero de rondas para el salting (un valor entre 10 y 12)

// Función para hashear una contraseña
exports.hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hasheando contraseña:', error);
    throw error; // Relanza el error para que sea manejado por el controlador 
  }
};

// Función para comparar una contraseña plana con una hasheada
exports.comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error('Error comparando contraseñas:', error);
    throw error; // Relanza el error
  }
};
// resumen: lo que hace esta función es hashear una contraseña y compararla con una hasheada.
// bcrypt es una librería de Node.js que permite hashear contraseñas de forma segura.
// El proceso de hashing es irreversible, lo que significa que no puedes obtener la contraseña original a partir del hash.