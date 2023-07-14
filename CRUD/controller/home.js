
import { MostrarCategorias } from "./categorias.js";


const productos = document.querySelector("[data]");


const cats = MostrarCategorias();;
productos.appendChild(cats);