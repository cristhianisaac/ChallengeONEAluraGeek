const listaCategorias = () => fetch('http://localhost:3000/categories').then(respuesta => respuesta.json()).catch(error => console.log(error));


export const clientServicesCategorias = {
    listaCategorias
  };
  
  