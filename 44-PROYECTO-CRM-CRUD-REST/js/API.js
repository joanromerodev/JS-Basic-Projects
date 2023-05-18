const url = "http://localhost:4000/clientes";

//POST - CREATE
export const nuevoCliente = async (cliente) => {
  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(cliente),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
};

//GET - READ
export const obtenerClientes = async () => {
  try {
    const resultado = await fetch(url);
    const data = await resultado.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//PUT - UPDATE
export const actualizarCliente = async (cliente) => {
  try {
    await fetch(`${url}/${cliente.id}`, {
      method: "PUT",
      body: JSON.stringify(cliente),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
};

//DELETE - DELETE

export const eliminarCliente = async (id) => {
  try {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};

//ADITIONALS

//Obtener cliente por ID
export const obtenerCliente = async (id) => {
  try {
    const resultado = await fetch(`${url}/${id}`);
    const data = await resultado.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
