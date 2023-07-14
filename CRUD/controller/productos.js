
import { clientServicesProductos } from "../services/productos.js";
import { MostrarProductos } from "./tarjetas.js";


const Contenedor = document.createElement("div");
Contenedor.className = "Productos__Lista__Productos";

clientServicesProductos.listaProductos().then(data => {
    data.forEach(({ name, price, imageUrl, category, imageDescription, description, id }) => {

        const nuevoProducto = MostrarProductos(name, price, imageUrl, category, imageDescription, description, id);
        Contenedor.appendChild(nuevoProducto);

    });
});

const productos = document.querySelector("[data]");

productos.appendChild(Contenedor);