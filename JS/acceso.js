
import { iniciaSesion } from "../CRUD/controller/usuario.js";

var button = document.getElementById('login');
button.addEventListener("click", login);

function login(){
  let user = document.getElementById('user');
  let password = document.getElementById('password');
  iniciaSesion(user.value, password.value);
  let name = getCookie('user');
  if(name === undefined || name === null || name === ""){
    eraseCookie('user');
    Swal.fire({
      title: 'Error',
      text: "Credenciales invadas",
      icon: 'error',
      confirmButtonText: 'Aceptar',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      }
    });
  }
  else{
    location.href='administrador.html';
  }
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
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}