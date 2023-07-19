import { clientServicesProductos } from "../services/productos.js";
import { clientServicesCategorias } from "../services/categorias.js";

let name = getCookie('user');
if(name === undefined ||name === null || name === ""){   
  eraseCookie('user'); 
  location.href='login.html';
}


function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


clientServicesCategorias.listaCategorias().then(cat => {
  cat.forEach(({ desc }) => {
    const categoria = document.createElement("option");
    categoria.value = desc;
    categoria.className = "categoriaOption"
    categoria.innerHTML = desc;
    document.getElementById("categoria").appendChild(categoria);
  });
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

if (id !== null) {
  const producto = await clientServicesProductos.detalleProducto(id);
  const categorias = document.getElementById("categoria");

  for (let i = 0; i < categorias.options.length; i++) {
    const option = categorias.options[i];
    if (option.value === producto.category) {
      // Set the desired option as selected
      option.selected = true;
      break; // Exit the loop once the option is found
    }
  }

  document.getElementById("nombre").value = producto.name;
  document.getElementById("precio").value = producto.price;
  document.getElementById("descripcion").value = producto.description;
  document.getElementById("imageUrl").value = producto.imageUrl;
  document.getElementById("Preview__Image").src = producto.imageUrl;
  document.getElementById("Preview__Image").style.display = "block";

  document.getElementById("categoria").closest(".Formulario__Input").classList.add("Formulario__Input__Valid");
  document.getElementById("nombre").closest(".Formulario__Input").classList.add("Formulario__Input__Valid");
  document.getElementById("precio").closest(".Formulario__Input").classList.add("Formulario__Input__Valid");
  document.getElementById("descripcion").closest(".Formulario__Input").classList.add("Formulario__Input__Valid");
  document.getElementById("imageUrl").closest(".Formulario__Input").classList.add("Formulario__Input__Valid");

  document.getElementById("Aceptar").value = "Guardar";
  document.querySelector("[data]").firstChild.innerHTML = "Actualizar producto..."
  document.querySelector("[data]").addEventListener("submit", (event) => {
    event.preventDefault();
    update();
  });
}
else{
  document.querySelector("[data]").addEventListener("submit", (event) => {
    event.preventDefault();
    insert();
  });
}


function update() {
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagen = document.getElementById("imageUrl").value;
  const categoria = document.getElementById("categoria").value;
  /* id, name, price, imageUrl, imageDescription, description, category */
  clientServicesProductos.actualizarProducto(id, nombre, precio, imagen, nombre, descripcion, categoria).then(() => {
    Swal.fire({
      icon: 'success',
      title: 'Producto modificado correctamente...',
      showConfirmButton: true,
      timer: 3000
    }).then((result) => {
      window.location.href = "../administrador.html";
    });
  }).catch((err) => console.log(err));
}

function insert() {
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagen = document.getElementById("imageUrl").value;
  const categoria = document.getElementById("categoria").value;
  /* name, price, imageUrl, imageDescription, description, category */
  clientServicesProductos.crearProducto(nombre, precio, imagen, nombre, descripcion, categoria).then(() => {
    Swal.fire({
      icon: 'success',
      title: 'Producto modificado correctamente...',
      showConfirmButton: false,
      timer: 3000
    }).then((result) => {
      window.location.href = "../administrador.html";
    });
  }).catch((err) => console.log(err));
}