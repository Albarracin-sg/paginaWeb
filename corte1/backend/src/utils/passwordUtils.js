const bcrypt = require('bcrypt');

const saltRounds = 10; // Número de rondas para el salting (un valor entre 10 y 12 es común)

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