function mostrarCiudad(str) {
    if (str.length == 0) {
        document.getElementById("txtHint").innerHTML = "";
        return;
    } else {
        let str = this.value;
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function(){
            if(this.readyState == 4 && this.status == 200){
                document.getElementById("txtHint").innerHTML = this.responseText;
            }
        }
        xmlhttp.open("GET", "../Back_end/ciudades.php?q=" + str, true);
        xmlhttp.send();
    }
}

window.onload = (event) => {
    let ciudad=document.getElementById("ciudad");
    ciudad.addEventListener('keyup',mostrarCiudad);
};