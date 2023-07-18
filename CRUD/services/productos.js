
const listaProductos = () => fetch('https://crud-data.onrender.com/products').then(respuesta => respuesta.json()).catch(error => console.log(error));

const listaProductosCategoria = (caegory) =>fetch(`https://crud-data.onrender.com/products?category=${caegory}`).then(respuesta => respuesta.json()).catch(error => console.log(error));

const crearProducto = (name, price, imageUrl, imageDescription, description, category) => {
  
  return fetch('https://crud-data.onrender.com/products', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id: uuidv4(), name, price, imageUrl, imageDescription, description, category})
  });
};

const eliminarProducto = (id) => {
  return fetch(`https://crud-data.onrender.com/products/${id}`, {
    method: "DELETE"
  });
};

//Detalles del producto por ID
const detalleProducto = async (id) => {
  return fetch(`https://crud-data.onrender.com/products/${id}`).then( respuesta => respuesta.json());
};

const actualizarProducto = (id, name, price, imageUrl, imageDescription, description, category) => {
  return fetch(`https://crud-data.onrender.com/products/${id}`,{
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



