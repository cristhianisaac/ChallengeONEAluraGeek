
import { productosRelacionados } from "../controller/categoria-relacion.js";
import { clientServicesProductos } from "../services/productos.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

try {
    if (id === null) {
        console.log("Hubo error al momento de buscar el producto")
    }


    const producto = await clientServicesProductos.detalleProducto(id);

    const productData = document.querySelector("[data]");
    const Info = document.createElement("div");
    Info.className = "Contenedor";
    Info.innerHTML = `
        <div class="Info__Content" >
        <div class="Info__Content__Imagen">
            <img src="${producto.imageUrl}" alt="The Child"/>
        </div>
        <div class="Info__Content__Data">
            <h2>${producto.name}</h2>
            <h3 class="Azul">$${producto.price}</h3>
            <h4 class="Rojo">${producto.category}</h4>
            <p>${producto.description}"</p>
        </div>
        </div>
  `;

    productData.appendChild(Info);

    const relacionados = document.querySelector("[relacionados]");
    const Contenedor = document.createElement("div");
    Contenedor.className = "Contenedor";
    const Categoria = document.createElement("div");
    Categoria.className = "Categoria";
    let contenido = `
                <div class="Categoria__Titulo">
                    <h1>Productos Relacionados</h1><a href="productos.html?category=${producto.category}" class="Azul">Ver Todo <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                `;
                Categoria.innerHTML = contenido;
    const productosrelacionados = productosRelacionados(producto.category, id);

    Categoria.appendChild(productosrelacionados);
    Contenedor.appendChild(Categoria);
    relacionados.appendChild(Contenedor);
} catch (error) {
    console.log("catch error", error);
}

