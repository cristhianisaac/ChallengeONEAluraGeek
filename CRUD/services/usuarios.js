const listaUsuarios = () => fetch('https://crud-data.onrender.com/users').then(respuesta => respuesta.json()).catch(error => console.log(error));

const buscaUsuario = (user) => {
    return fetch(`https://crud-data.onrender.com/users?user=${user}`)
    .then(
        respuesta => respuesta.json()
        )
        .catch(
            error => console.log(error)
            );
}

export const clientService = {
    listaUsuarios,
    buscaUsuario
  };