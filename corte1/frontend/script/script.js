// Referencias a los elementos de la página
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Referencias a los formularios
const signUpForm = document.querySelector('.sign-up-container form');
const signInForm = document.querySelector('.sign-in-container form');

// Referencias a los elementos del Modal
const modalBackdrop = document.getElementById("modalBackdrop");
const customModal = document.getElementById("customModal");
const modalMessage = document.getElementById("modalMessage");
const closeModalButton = document.getElementById("closeModalButton");
const modalIcon = document.getElementById("modalIcon");

// Función para mostrar el Modal
function showModal(message, isSuccess) {
    modalMessage.textContent = message;

    // Establece el tipo de modal (éxito o error)
    customModal.classList.remove("success", "error");
    if (isSuccess) {
        customModal.classList.add("success");
        if (modalIcon) {
            modalIcon.innerHTML = '<i class="fas fa-check"></i>'; 
            modalIcon.style.backgroundColor = "#2ecc71"; 
        }
    } else {
        customModal.classList.add("error");
        if (modalIcon) {
            modalIcon.innerHTML = '<i class="fas fa-times"></i>'; 
            modalIcon.style.backgroundColor = "#e74c3c"; 
        }
    }

    // Mostrar el modal con animación
    modalBackdrop.classList.add("visible");
    setTimeout(() => {
        customModal.classList.add("visible");
    }, 50);
}

// Función para ocultar el Modal
function hideModal() {
    modalBackdrop.classList.remove("visible");
    customModal.classList.remove("visible");
    
    // Limpiar contenido
    modalMessage.textContent = "";
    if (modalIcon) {
        modalIcon.innerHTML = "";
        modalIcon.style.backgroundColor = "transparent";
    }
    customModal.classList.remove("success", "error");
}

// Event Listeners para cerrar el Modal
closeModalButton.addEventListener("click", hideModal);
modalBackdrop.addEventListener("click", hideModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && customModal.classList.contains("visible")) {
    hideModal();
  }
});

// Función para manejar respuestas del servidor
async function handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
        const errorMessage = data.message || "Ocurrió un error al procesar tu solicitud.";
        console.error("Error:", errorMessage);
        showModal(errorMessage, false);
        return null;
    }

    const successMessage = data.message || "Operación completada exitosamente.";
    console.log("Respuesta exitosa:", data);
    showModal(successMessage, true);
    return data;
}

// Event Listener para el formulario de REGISTRO
signUpForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = signUpForm.querySelector('input[placeholder="Name"]').value;
    const email = signUpForm.querySelector('input[placeholder="Email"]').value;
    const password = signUpForm.querySelector('input[placeholder="Password"]').value;

    const registerEndpoint = "https://paginaweb-wemw.onrender.com/api/auth/register";

    try {
        const response = await fetch(registerEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const result = await handleResponse(response);

        // Si el registro fue exitoso
        if (result) {
            setTimeout(() => {
                container.classList.remove('right-panel-active'); // Cambiar al panel de login
                signUpForm.reset(); // Limpiar el formulario
            }, 1500);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        showModal('Error de conexión. Asegúrate de que el servidor esté funcionando.', false);
    }
});

// Event Listener para el formulario de LOGIN
signInForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = signInForm.querySelector('input[placeholder="Email"]').value;
    const password = signInForm.querySelector('input[placeholder="Password"]').value;

    const loginEndpoint = "https://paginaweb-wemw.onrender.com/api/auth/login";

    try {
        const response = await fetch(loginEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await handleResponse(response);

        // Si el login fue exitoso
        if (result) {
            setTimeout(() => {
                hideModal();
                //window.location.href = '/dashboard.html';
            }, 1500);
            
            signInForm.reset(); // Limpiar el formulario
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        showModal('Error de conexión. Asegúrate de que el servidor esté funcionando.', false);
    }
});

// Lógica para el deslizamiento de paneles
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});