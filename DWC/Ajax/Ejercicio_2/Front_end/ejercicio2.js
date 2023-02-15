
function mostrarPaises(letra){
    console.log(letra);

    if (letra.length == 0) {
        document.getElementById("tablaPaises").innerHTML = "";
        return;
    } else {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function(){
            if(this.readyState == 4 && this.status == 200){
                document.getElementById("tablaPaises").innerHTML = this.responseText;
            }
        }
        xmlhttp.open("GET", "../Back_end/ejercicio2.php?q=" + letra);
        xmlhttp.send();
    }
}