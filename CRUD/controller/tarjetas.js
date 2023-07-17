//Creando la card del producto
export const MostrarProductos = (name, price, imageUrl, category, imageDescription, description, id) => {
    //Creando el div que guarda todo el card
    const cardProducto = document.createElement("div");
    cardProducto.className = "Producto";
    const contenido = `      
      <img src="${imageUrl}" alt="${imageDescription}" /><label
                class="titulo">${name}</label><label class="subtitulo">$${price}</label><a href="../../producto.html?id=${id}" class="Azul">Ver producto <i class="fa-solid fa-arrow-right"></i></a>
    `
    cardProducto.innerHTML = contenido;
    cardProducto.dataset.id = id;
    return cardProducto;
  }