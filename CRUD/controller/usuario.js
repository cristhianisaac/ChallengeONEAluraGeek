import { clientService } from "../services/usuarios.js";

export const iniciaSesion = (user, password) => {
    clientService.buscaUsuario(user).then(data => {
        if(data !== undefined && data[0].password == password){
            setCookie('user',data[0].name,1);
        }
        else{    
            eraseCookie('user');
        }
    }).catch({});
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }