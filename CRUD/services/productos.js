
const listaProductos = () => fetch('http://localhost:3000/products').then(respuesta => respuesta.json()).catch(error => console.log(error));

const listaProductosCategoria = (caegory) =>fetch(`http://localhost:3000/products?category=${caegory}`).then(respuesta => respuesta.json()).catch(error => console.log(error));

const crearProducto = (name, price, imageUrl, imageDescription, description, category) => {
  
  return fetch('http://localhost:3000/products', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id: uuidv4(), name, price, imageUrl, imageDescription, description, category})
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

const actualizarProducto = (id, name, price, imageUrl, imageDescription, description, category) => {
  return fetch(`http://localhost:3000/products/${id}`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name, price, imageUrl, imageDescription, description, category})
  }).then(respuesta => respuesta).catch(error => console.log(error));
};

export const clientServicesProductos = {
  listaProductos,
  listaProductosCategoria,
  detalleProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};



