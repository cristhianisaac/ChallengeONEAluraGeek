const listaUsuarios = () => fetch('http://localhost:3000/users').then(respuesta => respuesta.json()).catch(error => console.log(error));

const buscaUsuario = (user) => {
    return fetch(`http://localhost:3000/users?user=${user}`).then(respuesta => respuesta.json()).catch(error => console.log(error));
}

export const clientService = {
    listaUsuarios,
    buscaUsuario
  };