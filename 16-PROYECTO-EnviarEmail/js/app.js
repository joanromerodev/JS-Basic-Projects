document.addEventListener("DOMContentLoaded", function () {
  //Seleccionar los elementos de la interfaz
  const email = {
    email: "",
    CC: "",
    asunto: "",
    mensaje: "",
  };
  const inputEmail = document.querySelector("#email");
  const inputEmailCC = document.querySelector("#CC");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  //Asignar eventos

  inputEmail.addEventListener("input", validar);

  inputAsunto.addEventListener("input", validar);

  inputMensaje.addEventListener("input", validar);

  inputEmailCC.addEventListener("input", validar);

  btnSubmit.addEventListener("click", antesDeEnviar);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();
    resetFormulario();
  });

  formulario.addEventListener("submit", enviarEmail);

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");
      resetFormulario();

      //Crear una alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaExito.textContent = "Mensaje enviado correctamente";

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  function validar(e) {
    if (e.target.id !== "CC" && e.target.value.trim() === "") {
      mostrarAlerta(
        `El campo ${e.target.id} es obligatorio`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    if (e.target.id === "CC" && e.target.value === "") {
      limpiarAlerta(e.target.parentElement);
    } else {
      if (e.target.id === "CC" && !validarEmail(e.target.value)) {
        mostrarAlerta("El email no es valido", e.target.parentElement);
        email[e.target.name] = "";
        comprobarEmail();
        return;
      }
    }

    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es valido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    //   Asignar valores al objeto
    email[e.target.name] = e.target.value.trim().toLowerCase();

    // Comprobar el objeto email
    comprobarEmail();
    console.log(email);
  }

  function mostrarAlerta(mensaje, referencia) {
    //Limpiar Alerta
    limpiarAlerta(referencia);
    //   Generar alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add(
      "bg-red-600",
      "text-white",
      "p-2",
      "text-center",
      "rounded-lg"
    );

    //   Inyectar el error al formulario
    const input = referencia.querySelector(".border-gray-300");
    referencia.appendChild(error);
    input.classList.remove("border-gray-300");
    input.classList.add("border-red-300");
  }

  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600");
    const input = referencia.querySelector(".border-red-300");
    if (alerta) {
      alerta.remove();
      if (input.classList.contains("border-red-300")) {
        input.classList.remove("border-red-300");
        input.classList.add("border-gray-300");
      }
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }

  function antesDeEnviar(e) {
    if (Object.values(email).includes("")) {
      e.preventDefault();
      return;
    }
  }

  function resetFormulario() {
    //Reiniciar el objeto
    email.email = "";
    email.asunto = "";
    email.mensaje = "";

    formulario.reset();
    comprobarEmail();
  }
});
