const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});

function valida(input){
	const tipoDeInput = input.dataset.tipo;
	if(validadores[tipoDeInput]){
		validadores[tipoDeInput](input);
	}

  if(input.validity.valid){
    input.parentElement.classList.remove("Formulario__Input__Invalid");
  }else{
    input.parentElement.classList.add("Formulario__Input__Invalid");
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError"
]

const validadores = {

};