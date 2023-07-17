import { clientServicesProductos } from "../services/productos.js";
import { MostrarProductos } from "./tarjetas.js";

//Creando la card del producto
export const productosRelacionados= (categoryDesc, idProducto) => {
    const Contenedor = document.createElement("div");
    Contenedor.className = "Categoria__Productos";

    clientServicesProductos.listaProductosCategoria(categoryDesc).then(data => {
        data.forEach(({ name, price, imageUrl, category, imageDescription, description, id }) => {
            if(id != idProducto){
                const nuevoProducto = MostrarProductos(name, price, imageUrl, category, imageDescription, description, id);
                Contenedor.appendChild(nuevoProducto);
            }
        });
    });

    return Contenedor;
}