
import { clientServicesProductos } from "../services/productos.js";
import { MostrarProductos } from "./tarjetas.js";

CargaProductos();

function CargaProductos() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const categoryParam = urlParams.get("category");

    const productos = document.querySelector("[data]");

    const Contenedor = document.createElement("div");
    Contenedor.className = "Productos__Lista__Productos";

    clientServicesProductos.listaProductos().then(data => {
        if (categoryParam === undefined || categoryParam === null || categoryParam == "") {
            data.forEach(({ name, price, imageUrl, category, imageDescription, description, id }) => {
                const nuevoProducto = MostrarProductos(name, price, imageUrl, category, imageDescription, description, id);
                Contenedor.appendChild(nuevoProducto);

            });
        }
        else {
            productos.firstChild.firstChild.innerHTML = categoryParam;
            const button = document.createElement("a");
            button.className = "Azul";
            button.id = "verTodo";
            button.innerHTML = "Ver Todo <i class='fa-solid fa-arrow-right'></i>";
            productos.firstChild.appendChild(button)
            clientServicesProductos.listaProductosCategoria(categoryParam).then(data => {
                data.forEach(({ name, price, imageUrl, category, imageDescription, description, id }) => {
                    const nuevoProducto = MostrarProductos(name, price, imageUrl, category, imageDescription, description, id);
                    Contenedor.appendChild(nuevoProducto);

                });
            });
        }
    });
    productos.appendChild(Contenedor);
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

const handleElementAdded = (mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const addedNodes = Array.from(mutation.addedNodes);
            const targetElement = addedNodes.find(node => node.id === 'verTodo');
            if (targetElement) {
                targetElement.addEventListener("click", (event) => {
                    reCargaProductos();

                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);
                    urlParams.delete("category");
                    removeParam("category");
                    const productoElement = targetElement.parentElement.firstChild;
                    if (productoElement) {
                        productoElement.innerHTML = "Todos los productos";
                    }
                    targetElement.remove();
                });
                observer.disconnect();
            }
        }
    }
};
const observer = new MutationObserver(handleElementAdded);
observer.observe(document.body, { childList: true, subtree: true });

function removeParam(parameter) {
    var url = document.location.href;
    var urlparts = url.split('?');

    if (urlparts.length >= 2) {
        var urlBase = urlparts.shift();
        var queryString = urlparts.join("?");

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = queryString.split(/[&;]/g);
        for (var i = pars.length; i-- > 0;)
            if (pars[i].lastIndexOf(prefix, 0) !== -1)
                pars.splice(i, 1);
        url = urlBase + '?' + pars.join('&');
        window.history.pushState('', document.title, url); // added this line to push the new url directly to url bar .

    }
}