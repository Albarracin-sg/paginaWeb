// Parte 1: Eventos básicos y Manipulación del DOM

// load para mostrar un mensaje de bienvenida
window.addEventListener("load", () => {
  console.log("¡La página ha terminado de cargar! Bienvenido.");
  alert("¡Bienvenido a la página interactiva!");
});

// DOM esté completamente cargado para manipular los elementos
document.addEventListener("DOMContentLoaded", () => {
  // Seleccionar elementos del DOM
  const tituloPrincipal = document.getElementById("tituloPrincipal");
  const parrafoColor = document.querySelector("#parrafoColor");
  const botonCambiar = document.getElementById("botonCambiar");
  const contenedorMensajeBoton = document.getElementById(
    "contenedorMensajeBoton"
  );
  const campoTexto = document.getElementById("campoTexto");
  const mensajeInteraccionInput = document.getElementById(
    "mensajeInteraccionInput"
  );
  const mensajeOculto = document.getElementById("mensajeOculto");
  const relojDigital = document.getElementById("relojDigital");
  const botonModular = document.getElementById("botonModular");
  const mensajeModular = document.getElementById("mensajeModular");
  const body = document.body;

  // addEventListener para capturar un evento de clic en el botón de cambio
  if (botonCambiar) {
    botonCambiar.addEventListener("click", () => {
      // Cambiar el texto del h1
      if (tituloPrincipal) {
        tituloPrincipal.textContent =
          "¡El Título Principal Ha Sido Modificado!";
      }

      // Cambiar el fondo de la página a un color aleatorio hexadecimal
      const randomColor =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0");
      body.style.backgroundColor = randomColor;

      // nuevo párrafo con un mensaje debajo del título
      if (contenedorMensajeBoton) {
        const nuevoParrafo = document.createElement("p");
        nuevoParrafo.textContent = `¡Acción realizada! El fondo es ahora ${randomColor}.`;
        contenedorMensajeBoton.appendChild(nuevoParrafo);
      }
    });
  }

  // querySelector y eventos mouseover/mouseout para cambiar el color del párrafo
  if (parrafoColor) {
    parrafoColor.addEventListener("mouseover", () => {
      parrafoColor.style.color = "blue";
      parrafoColor.style.fontWeight = "bold";
    });

    parrafoColor.addEventListener("mouseout", () => {
      parrafoColor.style.color = "black"; 
      parrafoColor.style.fontWeight = "normal";
    });
  }

  // eventos focus, blur y keyup al campo de texto
  if (campoTexto && mensajeInteraccionInput) {
    campoTexto.addEventListener("focus", () => {
      mensajeInteraccionInput.textContent =
        "Campo de texto enfocado (listo para escribir).";
      mensajeInteraccionInput.style.color =
        "#007bff"; 
    });

    campoTexto.addEventListener("blur", () => {
      mensajeInteraccionInput.textContent = "Campo de texto perdió el foco.";
      mensajeInteraccionInput.style.color ="#dc3545"; //color rojo para blur
    });

    campoTexto.addEventListener("keyup", () => {
      // contenido actual del campo de texto
      mensajeInteraccionInput.textContent = `Escribiendo... Contenido actual: "${campoTexto.value}"`;
      mensajeInteraccionInput.style.color = "#28a745"; //verde al escribir 
    });
  }

  // --- Parte 2: Temporizadores ---

  if (mensajeOculto) {
    setTimeout(() => {
      mensajeOculto.style.display = "block"; // Cambiar display a block para mostrarlo
    }, 3000); 
  }

  //reloj digital con setInterval que se actualice cada segundo
  if (relojDigital) {
    function actualizarReloj() {
      const ahora = new Date(); //fecha y hora actuales
      // Formatear horas, minutos y segundos para que siempre tengan dos dígitos
      const horas = ahora.getHours().toString().padStart(2, "0");
      const minutos = ahora.getMinutes().toString().padStart(2, "0");
      const segundos = ahora.getSeconds().toString().padStart(2, "0");
      relojDigital.textContent = `Reloj Digital:\n ${horas}:${minutos}:${segundos}`;
    }

    // Actualizar el reloj cada 1000 ms (1 segundo)
    setInterval(actualizarReloj, 1000);
    actualizarReloj(); // Llamar a la función una vez inmediatamente para evitar un retraso inicial
  }



  // --- Parte 3: Interacción modular ---
  // función para manejar el evento de clic de un botón
  let contadorClicsModular = 0;
  const maxClicsModular = 5; // clics permitidos

  function manejarClicModular() {
    contadorClicsModular++; 
    if (mensajeModular) {
      // Verificar si el elemento existe
      mensajeModular.textContent = `¡Botón modular clicado! Este es el clic número: ${contadorClicsModular}.`;
    }

    // Usar removeEventListener para desactivar el botón después de un número determinado de clics
    if (contadorClicsModular >= maxClicsModular) {
      if (botonModular) {
        // Eliminar el 'click' event listener específico
        botonModular.removeEventListener("click", manejarClicModular);
        botonModular.textContent = `Botón Desactivado (>${maxClicsModular} clics)`;
        botonModular.disabled = true; // Deshabilitar visualmente el botón

        if (mensajeModular) {
          mensajeModular.textContent += ` El botón ha sido desactivado después de ${maxClicsModular} clics.`;
        }
      }
    }
  }

  // ddEventListener para adjuntar la función manejarClicModular al botón modular
  if (botonModular) {
    botonModular.addEventListener("click", manejarClicModular);
  }
}); 
