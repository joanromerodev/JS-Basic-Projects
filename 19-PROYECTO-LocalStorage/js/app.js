//Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
const contenido = document.querySelector("#contenido");
let tweets = [];

//Eventos
eventListeners();

function eventListeners() {
  formulario.addEventListener("submit", agregarTweet);
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];

    console.log(tweets);

    crearHTML();
  });
}

//Funciones
function agregarTweet(e) {
  e.preventDefault();
  const tweet = document.querySelector("#tweet").value;
  if (tweet === "") {
    mostrarError("Un mensaje no puede ir vacio");
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };
  tweets = [...tweets, tweetObj];
  //   localStorage.setItem("tweets", JSON.stringify(tweets));
  crearHTML();

  formulario.reset();
}

function mostrarError(error) {
  const mensajeError = document.createElement("P");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");
  contenido.appendChild(mensajeError);
  limpiarError(mensajeError);
}

function limpiarError(error) {
  setTimeout(() => {
    error.remove();
  }, 2000);
}

function crearHTML() {
  limpiarHTML();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      const btnEliminar = document.createElement("A");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";

      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      const li = document.createElement("LI");
      li.innerText = tweet.tweet;
      li.appendChild(btnEliminar);
      listaTweets.appendChild(li);
    });
  }
  sincronizarStorage();
}

function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearHTML();
}
