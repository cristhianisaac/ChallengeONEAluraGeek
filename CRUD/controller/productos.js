
import { clientServicesProductos } from "../services/productos.js";
import { MostrarProductos } from "./tarjetas.js";

CargaProductos();

function CargaProductos() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productos = document.querySelector("[data]");
    const Contenedor = document.createElement("div");
    Contenedor.className = "Productos__Lista__Productos";

    const button = document.createElement("a");
    button.className = "Azul";
    button.classList.add("verTodo");
    button.innerHTML = "Todos los productos <i class='fa-solid fa-arrow-right'></i>";

    const categoryParam = urlParams.get("category");
    if (categoryParam === undefined || categoryParam === null || categoryParam == "") {
        const findParam = urlParams.get("find");
        if (findParam === undefined || findParam === null || findParam === "") {
            clientServicesProductos.listaProductos().then(data => {
                data.forEach(({ name, price, imageUrl, category, imageDescription, description, id }) => {
                    const nuevoProducto = MostrarProductos(name, price, imageUrl, category, imageDescription, description, id);
                    Contenedor.appendChild(nuevoProducto);

                });
            });
        }
        else {
            productos.firstChild.firstChild.innerHTML = "Resultados...";            
            productos.firstChild.appendChild(button);

            clientServicesProductos.listaProductos().then(data => {
                data.forEach(({ name, price, imageUrl, category, imageDescription, description, id }) => {
                    if (
                        name.toLowerCase().indexOf(findParam.toLowerCase()) != -1 ||
                        category.toLowerCase().indexOf(findParam.toLowerCase()) != -1 ||
                        description.toLowerCase().indexOf(findParam.toLowerCase()) != -1
                    ) {
                        const nuevoProducto = MostrarProductos(name, price, imageUrl, category, imageDescription, description, id);
                        Contenedor.appendChild(nuevoProducto);
                    }
                });
            });
        }
    }
    else {
        productos.firstChild.firstChild.innerHTML = categoryParam;        
        productos.firstChild.appendChild(button)
        clientServicesProductos.listaProductosCategoria(categoryParam).then(data => {
            data.forEach(({ name, price, imageUrl, category, imageDescription, description, id }) => {
                const nuevoProducto = MostrarProductos(name, price, imageUrl, category, imageDescription, description, id);
                Contenedor.appendChild(nuevoProducto);
            });
        });
    }
    productos.appendChild(Contenedor);    
    button.addEventListener('click', () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        urlParams.delete('category');
        removeParam('category');
        const productoElement = button.parentElement.firstChild;
        if (productoElement) {
            productoElement.innerHTML = 'Todos los productos';
        }
        reCargaProductos();
        button.remove();
    });
}

function reCargaProductos() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const categoryParam = urlParams.get("category");

    const productos = document.querySelector("[data]");
    productos.removeChild(productos.lastChild);
    const Contenedor = document.createElement("div");
    Contenedor.className = "Productos__Lista__Productos";

    clientServicesProductos.listaProductos().then(data => {
        data.forEach(({ name, price, imageUrl, category, imageDescription, description, id }) => {
            const nuevoProducto = MostrarProductos(name, price, imageUrl, category, imageDescription, description, id);
            Contenedor.appendChild(nuevoProducto);
        });
    });
    productos.appendChild(Contenedor);
}

function removeParam(parameter) {
    var url = document.location.href;
    var urlparts = url.split('?');
    url = urlparts[0];
    window.history.pushState('', document.title, url);
}