//Creando la card del producto
export const MostrarProductos = (name, price, imageUrl, category, imageDescription, description, id) => {
    //Creando el div que guarda todo el card
    const cardProducto = document.createElement('div');
    cardProducto.className = 'Producto';
    const contenido = `      
      <img src='${imageUrl}' alt='${imageDescription}' /><label
                class='titulo'>${name}</label><label class='subtitulo'>$${price}</label><div class='modificaciones'><button onclick="location.href='../../restock.html?id=${id}'" class='Modificar'>Modificar</button><button class='Eliminar' id='${id}' name ='${name}'>Eliminar</button></div>
    `
    cardProducto.innerHTML = contenido;
    cardProducto.dataset.id = id;
    return cardProducto;
  }