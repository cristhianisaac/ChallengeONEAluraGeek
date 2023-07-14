import { clientServicesCategorias } from "../services/categorias.js";
import { clientServicesProductos } from "../services/productos.js";
import { MostrarProductos } from "./tarjetas.js";

//Creando la card del producto
export const MostrarCategorias = () => {


    const Contenedor = document.createElement("div");
    Contenedor.className = "Contenedor";

    clientServicesCategorias.listaCategorias().then(cat => {
        cat.forEach(({ desc }) => {
            const categoria = document.createElement("div");
            categoria.className = "Categoria";
            let contenido = `
                <div class="Categoria__Titulo">
                    <h1>${desc}</h1><a href="productos.html" class="Azul">Ver Todo <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div class="Categoria__Productos"> </div>`;
            categoria.innerHTML = contenido;

            clientServicesProductos.listaProductos().then(data => {
                data.forEach(({ name, price, imageUrl, category, imageDescription, description, id }) => {
                    if (category === desc) {
                        const nuevoProducto = MostrarProductos(name, price, imageUrl, category, imageDescription, description, id);
                        categoria.lastChild.appendChild(nuevoProducto);
                    }
                });
            });
            
            categoria.id = desc;
            Contenedor.appendChild(categoria);
        });
    });

    return Contenedor;
}