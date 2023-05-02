//Variables
const year = document.querySelector("#year");
const formulario = document.querySelector("#cotizar-seguro");

//Constructores
function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

function UI() {}

//Prototypes

UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear(),
    min = max - 20;

  for (let i = max; i > min; i--) {
    let option = document.createElement("OPTION");
    option.value = i;
    option.textContent = i;
    year.appendChild(option);
  }
};

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
  const div = document.createElement("DIV");
  if (tipo === "error") {
    div.classList.add("mensaje", "error");
  } else {
    div.classList.add("mensaje", "correcto");
  }

  div.classList.add("mensaje", "mt-10");

  div.textContent = mensaje;
  formulario.insertBefore(div, document.querySelector("#resultado"));

  setTimeout(() => {
    div.remove();
  }, 2000);
};

UI.prototype.mostrarResultado = (seguro, total) => {
  const div = document.createElement("DIV");
  div.classList.add("mt-10");

  const { marca, year, tipo } = seguro;

  let textoMarca;

  switch (marca) {
    case "1":
      textoMarca = "Americano";
      break;
    case "2":
      textoMarca = "Asiatico";
      break;
    case "3":
      textoMarca = "Europeo";
      break;
    default:
      break;
  }

  div.innerHTML = `
    <p class="header">Tu resumen</p>
    <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca} </span></p>
    <p class="font-bold">Año: <span class="font-normal"> ${year} </span></p>
    <p class="font-bold">Tipo: <span class="font-normal capitalize"> ${tipo} </span></p>
    <p class="font-bold">Total: <span class="font-normal"> $ ${total} </span></p>
    `;
  const resultadoDiv = document.querySelector("#resultado");

  const spinner = document.querySelector("#cargando");
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    resultadoDiv.appendChild(div);
  }, 2000);
};

Seguro.prototype.cotizarSeguro = function () {
  let cantidad;
  const base = 2000;
  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;
    default:
      break;
  }

  const diferencia = new Date().getFullYear() - this.year;

  cantidad -= (diferencia * 3 * cantidad) / 100;

  if (this.tipo === "basico") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }

  return cantidad.toFixed(2);
};

//Eventos
const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones();
});

eventListeners();

function eventListeners() {
  formulario.addEventListener("submit", cotizarSeguro);
}

//Funciones

function cotizarSeguro(e) {
  e.preventDefault();
  const marca = document.querySelector("#marca").value;
  const yearValue = document.querySelector("#year").value;
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (marca === "" || yearValue === "" || tipo === "") {
    ui.mostrarMensaje("Todos los campos son obligatorios", "error");
    return;
  }
  ui.mostrarMensaje("Cotizando...", "exito");

  const resultados = document.querySelector("#resultado div");
  if (resultados != null) {
    resultados.remove();
  }
  const seguro = new Seguro(marca, yearValue, tipo);
  const total = seguro.cotizarSeguro();
  ui.mostrarResultado(seguro, total);
}
