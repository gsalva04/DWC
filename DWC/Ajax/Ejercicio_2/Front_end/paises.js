function mostrarPaises(str) {
    str = this.value;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let tabla = document.getElementById('tabla');
            let header = document.createElement('th');
            tabla.innerHTML = '';
            header.textContent = "PAÏSOS";

            tabla.appendChild(header);

            let paises = this.responseText.split(', ');

            for (let i = 0; i < paises.length; i++) {
                let tr = document.createElement('tr');
                tabla.appendChild(tr)

                let td = document.createElement('td');
                tr.appendChild(td);

                td.innerHTML = paises[i];
            }
        }
    }
    xmlhttp.open("GET", "../Back_end/paises.php?q=" + str);
    xmlhttp.send();
}

window.onload = (event) => {
    let pais=document.getElementById('dropdwnPaises');
    pais.addEventListener('change',mostrarPaises);
};