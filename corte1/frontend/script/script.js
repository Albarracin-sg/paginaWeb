// referencias a los elementos HTML
const signUpButton = document.getElementById('signUp'); 
const signInButton = document.getElementById('signIn'); 
const container = document.getElementById('container'); 

// referencias a los formularios y sus campos
const signUpForm = document.querySelector('.sign-up-container form');
const signInForm = document.querySelector('.sign-in-container form');

// "event listener" al botón de Registro (en el overlay)
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

// "event listener" al botón de Iniciar Sesion (en el overlay)
signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// --- Logica para enviar datos al Backend ---

// Función para manejar la respuesta de las peticiones
async function handleResponse(response) {
    const data = await response.json(); // Intentar parsear la respuesta como JSON
    if (!response.ok) {
        // respuesta no exitosa 
        console.error('Error del backend:', data.message || 'Error desconocido');

        // mensaje al usuario 
        alert('Error: ' + (data.message || 'Ocurrió un error al procesar tu solicitud.')); // Ejemplo simple con alert
        throw new Error(data.message || response.statusText); // error para el catch
    }
    // Si la respuesta es exitosa
    console.log('Respuesta exitosa del backend:', data);
    
    // Muestra un mensaje de éxito
     alert('Éxito: ' + (data.message || 'Operación completada exitosamente.')); 
    return data; 
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