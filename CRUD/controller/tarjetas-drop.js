//Creando la card del producto
export const MostrarProductos = (name, price, imageUrl, category, imageDescription, description, id) => {
  //Creando el div que guarda todo el card
  const cardProducto = document.createElement('div');
  cardProducto.className = 'Producto';

  let mobileStyle = " ";
  if (isMobile()) {
    mobileStyle = " style='display:flex !Important;' ";
  }
  const contenido = `      
      <img src='${imageUrl}' alt='${imageDescription}' /><label
                class='titulo'>${name}</label><label class='subtitulo'>$${price}</label><div ${mobileStyle} class='modificaciones'><button onclick="location.href='../../producto.html?id=${id}'" class='Visitar'><i class="fa-solid fa-up-right-from-square"></i></button><button onclick="location.href='../../restock.html?id=${id}'" class='Modificar'><i class="fa-regular fa-pen-to-square"></i></button><button class='Eliminar' id='${id}' name ='${name}'><i class="fa-regular fa-trash-can"></i></button></div>
    `
  cardProducto.innerHTML = contenido;
  cardProducto.dataset.id = id;
  return cardProducto;
}


function isMobile() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}