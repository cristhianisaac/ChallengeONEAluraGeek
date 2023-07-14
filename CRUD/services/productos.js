//Conexion
const listaProductos = () => fetch('http://localhost:3000/products').then(respuesta => respuesta.json()).catch(error => console.log(error));

const crearProducto = (name, price, imageUrl, category, imageDescription, description) => {
  return fetch('http://localhost:3000/products', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name, price, imageUrl,  id:uuid.v4(), category, imageDescription, description})
  });
};

const eliminarProducto = (id) => {
  return fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE"
  });
};

//Detalles del producto por ID
const detalleProducto = async (id) => {
  return fetch(`http://localhost:3000/products/${id}`).then( respuesta => respuesta.json());
};

const actualizarProducto = (name, price, imageUrl, id, category, imageDescription, description) => {
  return fetch(`http://localhost:3000/products/${id}`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name, price, imageUrl, category, imageDescription, description})
  }).then(respuesta => respuesta).catch(error => console.log(error));
};

export const clientServicesProductos = {
  listaProductos,
  detalleProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};



