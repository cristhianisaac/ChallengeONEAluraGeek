function logOut() {
  deleteAllCookies();
  location.href = 'login.html';
}
function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

function showPreview(event) {
  if (event.target.files.length > 0) {

    var file = event.target.files[0];
    var fileSize = file.size; // size in bytes
    var maxSize = 500 * 1024; // 500 KB in bytes

    if (fileSize > maxSize) {
      Swal.fire({
        title: 'Error',
        html: "El archivo seleccionado es muy grande.<br><br> Tamaño máximo 500KB",
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        timer: 5000
      });
      return; // Abort further processing
    }

    var src = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("Preview__Image");
    preview.src = src;
    preview.style.opacity = "1"
    convertImageToBase64(src)
      .then(base64Data => {
        document.getElementById("imageUrl").value = base64Data;
      })
      .catch(error => {
        console.error(error);
      });

    preview.style.display = "block";
  }
}
function initialize() {
  document.body.onfocus = checkIt;
  console.log('initializing');
}
function checkIt() {
  if (!theFile.value.length){
    document.getElementById("Preview__Image").src = "IMG/Vector-imagen.svg";
    document.getElementById("Preview__Image").style.opacity = "1"
    document.getElementById("imageUrl").value = "";
  }
  document.body.onfocus = null;
  console.log('checked');
}  

function convertImageToBase64(imageUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const base64Data = canvas.toDataURL();
      resolve(base64Data);
    };

    image.onerror = () => {
      reject(new Error('Failed to load the image.'));
    };

    image.src = imageUrl;
  });
}

