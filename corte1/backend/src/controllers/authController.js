const userService = require('../models/User'); // Importa el "modelo" o servicio de usuario
const passwordUtils = require('../utils/passwordUtils'); // Importa utilidades de contraseña

// Controlador para el registro de usuarios
exports.register = async (req, res) => {
  const { name, email, password } = req.body; // Obtiene los datos del cuerpo de la petición

  try {
    // 1. Validar datos (aquí iría tu lógica de validación más detallada)
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // 2. Verificar si el usuario ya existe
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }

    // 3. Hashear la contraseña
    const hashedPassword = await passwordUtils.hashPassword(password);

    // 4. Crear el nuevo usuario en la base de datos
    const newUser = await userService.createUser({
      name,
      email,
      password: hashedPassword // Guarda la contraseña hasheada
    });

    // 5. Respuesta exitosa
    // En un caso real, podrías generar un token JWT aquí para iniciar sesión automáticamente
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: { id: newUser.id, email: newUser.email } });

  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Controlador para el inicio de sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Validar datos
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }

    // 2. Buscar el usuario por email
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' }); // Usar 401 para credenciales incorrectas
    }

    // 3. Comparar la contraseña proporcionada con la hasheada en la base de datos
    const isMatch = await passwordUtils.comparePassword(password, user.password);
    if (!isMatch) {
       return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // 4. Inicio de sesión exitoso
    // Aquí es donde normalmente generarías un token JWT o establecerías una sesión
    res.status(200).json({ message: 'Inicio de sesión exitoso', user: { id: user.id, email: user.email } });

  } catch (error) {
     console.error('Error en el login:', error);
     res.status(500).json({ message: 'Error interno del servidor' });
  }
};