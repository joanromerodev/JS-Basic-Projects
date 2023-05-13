function iniciarApp() {
  const selectCategorias = document.querySelector("#categorias");
  const resultado = document.querySelector("#resultado");
  const modal = new bootstrap.Modal("#modal", {});
  selectCategorias.addEventListener("change", seleccionarCategoria);

  obtenerCategorias();

  function obtenerCategorias() {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
    fetch(url)
      .then((res) => res.json())
      .then((data) => mostrarCategorias(data.categories));
  }

  function mostrarCategorias(categorias = []) {
    categorias.forEach((categoria) => {
      const { strCategory } = categoria;
      const option = document.createElement("option");
      option.value = strCategory;
      option.textContent = strCategory;
      selectCategorias.appendChild(option);
    });
  }

  function seleccionarCategoria(e) {
    const selected = e.target.value;
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selected}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => mostrarRecetas(data.meals));
  }

  function mostrarRecetas(recetas = []) {
    limpiarHTML(resultado);

    const heading = document.createElement("h2");
    heading.classList.add("text-center", "text-black", "my-5");
    heading.textContent = recetas.length ? "Results" : "There are not results";
    resultado.appendChild(heading);

    recetas.forEach((receta) => {
      const { idMeal, strMeal, strMealThumb } = receta;
      const recetaContenedor = document.createElement("div");
      recetaContenedor.classList.add("col-md-4");

      const recetaCard = document.createElement("div");
      recetaCard.classList.add("card", "mb-4");

      const recetaImagen = document.createElement("img");
      recetaImagen.classList.add("card-img-top");
      recetaImagen.alt = `Receipe image ${strMeal}`;
      recetaImagen.src = strMealThumb;

      const recetaCardBody = document.createElement("div");
      recetaCardBody.classList.add("card-body");

      const recetaHeading = document.createElement("h4");
      recetaHeading.classList.add("card-title", "mb-3", "text-center");
      recetaHeading.textContent = strMeal;

      const recetaButton = document.createElement("button");
      recetaButton.classList.add("btn", "btn-danger", "w-100");
      recetaButton.textContent = "Check receipe";
      //   recetaButton.dataset.bsTarget = "#modal";
      //   recetaButton.dataset.bsToggle = "modal";
      recetaButton.onclick = () => {
        seleccionarReceta(idMeal);
      };

      // inyectar en el codigo html
      recetaCardBody.appendChild(recetaHeading);
      recetaCardBody.appendChild(recetaButton);
      recetaCard.appendChild(recetaImagen);
      recetaCard.appendChild(recetaCardBody);
      recetaContenedor.appendChild(recetaCard);
      resultado.appendChild(recetaContenedor);
    });
  }

  function seleccionarReceta(id) {
    const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => mostrarRecetaModal(data.meals[0]));
  }

  function mostrarRecetaModal(receta) {
    const { idMeal, strInstructions, strMeal, strMealThumb } = receta;
    const modalTitle = document.querySelector(".modal .modal-title");
    const modalBody = document.querySelector(".modal .modal-body");

    modalTitle.textContent = strMeal;
    modalBody.innerHTML = `
      <img class="img-fluid" src="${strMealThumb}" alt="receta ${strMeal}">
      <h4 class="my-3">Instructions</h4>
      <p>${strInstructions}</p>
      <h4 class="my-3">Ingredients and measures</h4>
      `;

    const listGroup = document.createElement("ul");
    listGroup.classList.add("list-group");

    for (let i = 1; i <= 20; i++) {
      if (receta[`strIngredient${i}`]) {
        const ingrediente = receta[`strIngredient${i}`];
        const cantidad = receta[`strMeasure${i}`];

        const ingredienteLi = document.createElement("li");
        ingredienteLi.classList.add("list-group-item");
        ingredienteLi.textContent = `${ingrediente} - ${cantidad}`;

        listGroup.appendChild(ingredienteLi);
      }
    }

    modalBody.appendChild(listGroup);

    const modalFooter = document.querySelector(".modal-footer");
    limpiarHTML(modalFooter);

    const btnFavorito = document.createElement("button");
    btnFavorito.classList.add("btn", "btn-danger", "col");
    btnFavorito.textContent = "Add to favorites";

    const btnCerrarModal = document.createElement("button");
    btnCerrarModal.classList.add("btn", "btn-secondary", "col");
    btnCerrarModal.textContent = "Close";
    btnCerrarModal.onclick = () => {
      modal.hide();
    };

    modalFooter.appendChild(btnFavorito);
    modalFooter.appendChild(btnCerrarModal);

    modal.show();
  }

  function limpiarHTML(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  }
}

document.addEventListener("DOMContentLoaded", iniciarApp);
