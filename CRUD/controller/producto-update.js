import { clientServicesProductos } from "../services/productos.js";


import { clientServicesCategorias } from "../services/categorias.js";

clientServicesCategorias.listaCategorias().then(cat => {
    cat.forEach(({ desc }) => {
        const categoria = document.createElement("option");
        categoria.value =desc;
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
}
