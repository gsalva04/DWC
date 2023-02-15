function validarNombre(){
    let patron = /^[A-Za-záéíóúàèìòùÁÉÍÓÚÀÈÌÒÙÖÜöüñÑçÇ]{2,}$/;
}

window.addEventListener("load", function(){
    let nombre = document.getElementById("nombre");

    nombre.addEventListener("keyup", validarNombre);
});

