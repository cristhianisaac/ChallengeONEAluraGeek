
showName();

function showName(){    
  let name = getCookie('user');
  if(name === undefined ||name === null || name === ""){   
    eraseCookie('user'); 
    location.href='login.html';
  }
  const container = document.querySelector("[data]");
  const theName = document.createElement("div");
  theName.className = 'Productos__Lista__Titulo';
  theName.style ="margin-top: 80rem; margin-bottom:40rem;"
  theName.innerHTML = `<h1 style='font-size:28rem;'>Hola ${name}!</h1>`;
  const theTitle = document.createElement("div");
  theTitle.className = 'Productos__Lista__Titulo';
  theTitle.innerHTML = `<h1>Administrador de productos</h1><button class="Demo" onclick="location.href='restock.html';">Agregar Producto</button>`;

  container.appendChild(theName);
  container.appendChild(theTitle);
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
