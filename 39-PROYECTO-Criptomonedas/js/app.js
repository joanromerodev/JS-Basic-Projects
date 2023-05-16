const criptoSelect = document.querySelector("#criptomonedas");
const monedaSelect = document.querySelector("#moneda");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

const objBusqueda = {
  moneda: "",
  cripto: "",
};

const obtenerCriptos = (criptomonedas) =>
  new Promise((resolve) => {
    resolve(criptomonedas);
  });

document.addEventListener("DOMContentLoaded", () => {
  consultarCriptos();
  formulario.addEventListener("submit", submitFormulario);
  criptoSelect.addEventListener("change", leerValor);
  monedaSelect.addEventListener("change", leerValor);
});

async function consultarCriptos() {
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

  try {
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    const criptos = await obtenerCriptos(data.Data);
    selectCriptos(criptos);
  } catch (error) {
    console.log(error);
  }
}

function selectCriptos(criptomonedas) {
  criptomonedas.forEach((cripto) => {
    const { FullName, Name } = cripto.CoinInfo;
    const option = document.createElement("option");
    option.value = Name;
    option.textContent = FullName;
    criptoSelect.appendChild(option);
  });
}

function leerValor(e) {
  objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e) {
  e.preventDefault();
  const { moneda, cripto } = objBusqueda;
  if (moneda === "" || cripto === "") {
    mostrarAlerta("Ambos campos son obligatorios");
    return;
  }
  consultarAPI();
}

async function consultarAPI() {
  const { moneda, cripto } = objBusqueda;
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
  mostrarSpinner();

  try {
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    mostrarCotizacionHTML(data.DISPLAY[cripto][moneda]);
  } catch (error) {
    console.log(error);
  }
}

function mostrarCotizacionHTML(cotizacion) {
  limpiarHTML();
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;
  const precio = document.createElement("p");
  precio.classList.add("precio");
  precio.innerHTML = `El precio es: <span>${PRICE}</span>`;

  const precioAlto = document.createElement("p");
  precioAlto.innerHTML = `Precio más alto del día: <span>${HIGHDAY}</span>`;

  const precioBajo = document.createElement("p");
  precioBajo.innerHTML = `Precio más bajo del día: <span>${LOWDAY}</span>`;

  const ultimasHoras = document.createElement("p");
  ultimasHoras.innerHTML = `Variación ultimas 24 horas: <span>${CHANGEPCT24HOUR}%</span>`;

  const ultimoUpdate = document.createElement("p");
  ultimoUpdate.innerHTML = `Última actualización: <span>${LASTUPDATE}</span>`;

  resultado.appendChild(precio);
  resultado.appendChild(precioAlto);
  resultado.appendChild(precioBajo);
  resultado.appendChild(ultimasHoras);
  resultado.appendChild(ultimoUpdate);
}

function mostrarSpinner() {
  limpiarHTML();

  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="bounce1"></div>
  <div class="bounce2"></div>
  <div class="bounce3"></div>
    `;
  resultado.appendChild(spinner);
}

function mostrarAlerta(mensaje) {
  const alertaExists = document.querySelector(".error");
  if (!alertaExists) {
    const alerta = document.createElement("div");
    alerta.classList.add("error");
    alerta.textContent = mensaje;
    resultado.appendChild(alerta);
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
