const listaCategorias = () => fetch('https://crud-data.onrender.com/categories').then(respuesta => respuesta.json()).catch(error => console.log(error));


export const clientServicesCategorias = {
    listaCategorias
  };
  
  