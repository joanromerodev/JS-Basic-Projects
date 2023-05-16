const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");
const paginacionDiv = document.querySelector("#paginacion");
const registrosPorPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;

window.onload = () => {
  formulario.addEventListener("submit", validarFormulario);

  function validarFormulario(e) {
    e.preventDefault();
    const terminoBusqueda = document.querySelector("#termino").value;
    if (terminoBusqueda === "") {
      mostrarMensaje("Agrega un termino de busqueda");
      return;
    }
    paginaActual = 1;
    buscarImagenes();
  }

  function mostrarMensaje(mensaje) {
    const existeAlerta = document.querySelector(".bg-red-100");
    if (!existeAlerta) {
      const alerta = document.createElement("p");
      alerta.classList.add(
        "bg-red-100",
        "border-red-400",
        "text-red-700",
        "px-4",
        "py-3",
        "rounded",
        "max-w-lg",
        "mt-6",
        "mx-auto",
        "text-center"
      );
      alerta.innerHTML = `
      <strong class="font-bold">¡Error!</strong>
      <span class="block sm:inline">${mensaje}</span>
      `;
      resultado.appendChild(alerta);
      setTimeout(() => {
        alerta.remove();
      }, 3000);
    }
  }

  function buscarImagenes() {
    const termino = document.querySelector("#termino").value;
    const key = "25380525-81427da647f565615ffa23229";
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registrosPorPagina}&page=${paginaActual}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.totalHits === 0) {
          limpiarHTML(resultado);
          limpiarHTML(paginacionDiv);
          mostrarMensaje(
            "¡Lo sentimos! No encontramos imagenes para tu criterio de busqueda. Por favor intenta con otro criterio"
          );
          return;
        }
        totalPaginas = calcularPaginas(data.totalHits);
        mostrarImagenes(data.hits);
      });
  }

  function* crearPaginador(total) {
    for (let i = 1; i <= total; i++) {
      yield i;
    }
  }

  function calcularPaginas(total) {
    return parseInt(Math.ceil(total / registrosPorPagina));
  }

  function mostrarImagenes(imagenes) {
    limpiarHTML(resultado);
    //Iterar sobre el arreglo de imagenes y construir el HTML
    imagenes.forEach((imagen) => {
      const { previewURL, likes, views, largeImageURL } = imagen;
      resultado.innerHTML += `
      <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
      <div class="bg-white">
        <img class="w-full" src="${previewURL}">
        <div class="pt-4 flex space-x-4 text-center justify-center">
        <p class="font-bold"> ${likes} <span class="font-light">Me gusta</span></p>
        <p class="font-bold"> ${views} <span class="font-light">Vistas</span></p>
        </div>
        <div class="p-4">
        <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
        href="${largeImageURL}" target="_blank" rel="noopener noreferrer">Ver imagen</a>
        </div>
        </div>
        </div>
        `;
    });
    limpiarHTML(paginacionDiv);
    imprimirPaginador();
  }

  function imprimirPaginador() {
    iterador = crearPaginador(totalPaginas);
    while (true) {
      const { value, done } = iterador.next();
      if (done) return;
      const button = document.createElement("a");
      button.href = "#";
      button.dataset.pagina = value;
      button.textContent = value;
      if (paginaActual === value) {
        button.classList.add(
          "siguiente",
          "bg-blue-600",
          "border-2",
          "border-white",
          "px-4",
          "py-1",
          "mr-2",
          "text-white",
          "mb-4",
          "rounded"
        );
      } else {
        button.classList.add(
          "siguiente",
          "bg-white",
          "border-2",
          "border-blue-500",
          "text-blue-500",
          "px-4",
          "py-1",
          "mr-2",
          "mb-4",
          "rounded"
        );
      }

      button.onclick = () => {
        paginaActual = value;
        buscarImagenes();
      };
      paginacionDiv.appendChild(button);
    }
  }

  function limpiarHTML(elemento) {
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    }
  }
};
