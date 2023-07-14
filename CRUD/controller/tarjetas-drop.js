//Creando la card del producto
export const MostrarProductos = (name, price, imageUrl, category, imageDescription, description, id) => {
    //Creando el div que guarda todo el card
    const cardProducto = document.createElement("div");
    cardProducto.className = "Producto";
    const contenido = `      
      <img src="${imageUrl}" alt="${imageDescription}" /><label
                class="subtitulo">${name}</label><label class="titulo">$${price}</label><a href="../../producto.html?id=${id}" class="Rojo">Eliminar
                producto</a>
    `
    cardProducto.innerHTML = contenido;
    cardProducto.dataset.id = id;
    return cardProducto;
  }