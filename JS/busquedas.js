function ClearSearch() {
    $("#search").val('');
    setTimeout(function () {
      $("#search").focus();
    }, 10);
  }

  function buscar(){
    location.href=`productos.html?find=${document.getElementById('search').value}`
  }
  function preguntar(){
    Swal.fire({
        title: '¿Qué desea buscar?',
        icon: 'question',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Buscar',
        cancelButtonText: 'Cancelar',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        }
      }).then((result) => {
        if (result.isConfirmed) {
            location.href=`productos.html?find=${result.value}`
            
        }
      })
  }

  document.querySelector("[search]").addEventListener("submit", (event) => {
    event.preventDefault();
    buscar()
  });