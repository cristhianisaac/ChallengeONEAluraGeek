
import { clientServicesProductos } from "../services/productos.js";
import { MostrarProductos } from "./tarjetas-drop.js";


cargaPRoductos();

function cargaPRoductos() {
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
}

const targetClassName = 'Producto';

const handleElementAdded = (mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const addedNodes = Array.from(mutation.addedNodes);
            const targetElement = addedNodes.find(node => node.classList && node.classList.contains(targetClassName));

            if (targetElement) {
                // Find the "Eliminar" buttons within the target element
                const eliminarButtons = targetElement.querySelectorAll('.Eliminar');

                // Iterate over the "Eliminar" buttons and attach the event listener
                eliminarButtons.forEach(button => {
                    button.addEventListener("click", (event) => {
                        Swal.fire({
                            title: `¿Confirma el borrado del producto ${button.name}?`,
                            icon: 'question',
                            showDenyButton: true,
                            confirmButtonText: 'Confirmar',
                            denyButtonText: 'Cancelar',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                try {
                                    clientServicesProductos.eliminarProducto(button.id);
                                    const productoElement = button.closest('.Producto');
                                    if (productoElement) {
                                        productoElement.remove();
                                    }
                                    Swal.fire('Producto eliminado correctamente!', '', 'success');
                                }
                                catch {

                                }
                            }
                        });
                    });
                });

                // Stop observing once the target element is found
                observer.disconnect();
            }
        }
    }
};


const observer = new MutationObserver(handleElementAdded);
observer.observe(document.body, { childList: true, subtree: true });
