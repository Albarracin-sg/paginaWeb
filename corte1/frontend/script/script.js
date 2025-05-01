// Obtener referencias a los elementos HTML
const signUpButton = document.getElementById('signUp'); // Botón "Register" en el overlay derecho
const signInButton = document.getElementById('signIn'); // Botón "Login" en el overlay izquierdo
const container = document.getElementById('container'); // Contenedor principal

// Referencias a los formularios y sus campos
const signUpForm = document.querySelector('.sign-up-container form');
const signInForm = document.querySelector('.sign-in-container form');

// Obtener referencias a los campos de entrada específicos (opcional pero útil para capturar valores)
// const nameInput = signUpForm.querySelector('input[placeholder="Name"]');
// const emailInputSignUp = signUpForm.querySelector('input[placeholder="Email"]');
// const passwordInputSignUp = signUpForm.querySelector('input[placeholder="Password"]');

// const emailInputSignIn = signInForm.querySelector('input[placeholder="Email"]');
// const passwordInputSignIn = signInForm.querySelector('input[placeholder="Password"]');


// --- Lógica para el deslizamiento de paneles (ya la teníamos) ---

// Añadir un "event listener" al botón de Registrarse (en el overlay)
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

// Añadir un "event listener" al botón de Iniciar Sesión (en el overlay)
signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// --- Lógica para enviar datos al Backend ---

// Función genérica para manejar la respuesta de las peticiones Fetch
async function handleResponse(response) {
    const data = await response.json(); // Intentar parsear la respuesta como JSON
    if (!response.ok) {
        // Si la respuesta no es exitosa (código de estado 4xx o 5xx)
        console.error('Error del backend:', data.message || 'Error desconocido');
        // Muestra un mensaje de error al usuario (puedes añadir un elemento para mensajes en el HTML)
        alert('Error: ' + (data.message || 'Ocurrió un error al procesar tu solicitud.')); // Ejemplo simple con alert
        throw new Error(data.message || response.statusText); // Lanza un error para el catch
    }
    // Si la respuesta es exitosa (código de estado 2xx)
    console.log('Respuesta exitosa del backend:', data);
    // Muestra un mensaje de éxito
     alert('Éxito: ' + (data.message || 'Operación completada exitosamente.')); // Ejemplo simple con alert
    return data; // Retorna los datos de la respuesta
}


// Event Listener para el envío del formulario de REGISTRO
signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Previene el envío del formulario por defecto (evita la recarga de la página)

    // Captura los datos del formulario
    const name = signUpForm.querySelector('input[placeholder="Name"]').value;
    const email = signUpForm.querySelector('input[placeholder="Email"]').value;
    const password = signUpForm.querySelector('input[placeholder="Password"]').value;

    // URL del endpoint de registro en tu backend
    const registerEndpoint = 'http://localhost:3000/api/auth/register'; // Asegúrate que el puerto y la ruta coincidan

    try {
        const response = await fetch(registerEndpoint, {
            method: 'POST', // Método HTTP POST para enviar datos
            headers: {
                'Content-Type': 'application/json' // Indica que el cuerpo de la petición es JSON
            },
            body: JSON.stringify({ name, email, password }) // Convierte el objeto de datos a una cadena JSON
        });

        const result = await handleResponse(response);

        // Si el registro es exitoso, puedes redirigir al usuario, mostrar un mensaje, o
        // automáticamente cambiar al panel de login.
        if (result) {
             // Por ejemplo, cambiar al panel de login después de un registro exitoso
             container.classList.remove('right-panel-active');
             // O limpiar el formulario
             signUpForm.reset();
        }

    } catch (error) {
        console.error('Error al enviar el formulario de registro:', error);
        // handleResponse ya muestra un alert, pero puedes añadir lógica adicional aquí si es necesario
    }
});

// Event Listener para el envío del formulario de LOGIN
signInForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Previene el envío del formulario por defecto

    // Captura los datos del formulario
    const email = signInForm.querySelector('input[placeholder="Email"]').value;
    const password = signInForm.querySelector('input[placeholder="Password"]').value;

    // URL del endpoint de login en tu backend
    const loginEndpoint = 'http://localhost:3000/api/auth/login'; // Asegúrate que el puerto y la ruta coincidan

     try {
        const response = await fetch(loginEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await handleResponse(response);

        // Si el login es exitoso, normalmente redirigirías al usuario a otra página
        if (result) {
             console.log('Inicio de sesión exitoso. Redirigiendo...');
             //window.location.href = '/dashboard'; // Ejemplo de redirección
             // O muestra un mensaje y limpia el formulario
             signInForm.reset();
        }

    } catch (error) {
        console.error('Error al enviar el formulario de login:', error);
        // handleResponse ya muestra un alert
    }
});