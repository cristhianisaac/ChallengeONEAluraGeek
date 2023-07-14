import { clientService } from "../services/usuarios.js";

export const iniciaSesion = (user, password) => {
    clientService.buscaUsuario(user).then(data => {
        if(data === undefined || data.password == password){
            return data.name;
        }
        else{
            return "";
        }
    }).catch;
}
