function mostrarPaises() {

  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let select = document.getElementById("dropdwnPaises");
      let paises =this.responseText.split(", ");

      let opcionDefecto = document.createElement("option");
      opcionDefecto.value="-";
      opcionDefecto.innerHTML="-";
      select.appendChild(opcionDefecto);

      for (let i = 0; i < paises.length; i++) {
        let option = document.createElement("option");
        option.value = paises[i];
        option.innerHTML = paises[i];
        select.appendChild(option);
      }
    }
  };
  xmlhttp.open("GET", "../Back_end/paises.php");
  xmlhttp.send();
}

function mostrarCiudades(pais) {
  pais = this.value;
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let select = document.getElementById("dropdwnCiudades");
      select.innerHTML = null;//NULL
      let ciudades = this.responseText.split(", ");

      let opcionDefecto = document.createElement("option");
      opcionDefecto.value="-";
      opcionDefecto.innerHTML="-";
      select.appendChild(opcionDefecto);

      for (let i = 0; i < ciudades.length; i++) {
        let option = document.createElement("option");
        option.value = ciudades[i];
        option.innerHTML = ciudades[i];
        select.append(option);
      }
    }
  };
  xmlhttp.open("GET", "../Back_end/paisesCiudades.php?q=" + pais);
  xmlhttp.send();
}

function mostrarInfoCiudades(ciudad) {
  ciudad = this.value;
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let div = document.getElementById("tablaInfoCiudades");
      div.innerHTML = null;
      let infoCiudades = this.responseText.split(", ");

      let ciudad = document.createElement("h3");
      let distrito = document.createElement("p");
      let poblacion = document.createElement("p");

      ciudad.innerHTML = infoCiudades[0];
      distrito.innerHTML = "Distrito: " + infoCiudades[1];
      poblacion.innerHTML = "Población: " + infoCiudades[2];

      div.appendChild(ciudad);
      div.appendChild(distrito);
      div.appendChild(poblacion);
    }
  };
  xmlhttp.open("GET", "../Back_end/infoCiudades.php?q=" + ciudad);
  xmlhttp.send();
}

window.onload = function () {
  mostrarPaises();
  
  let paises = document.getElementById("dropdwnPaises");
  let ciudades = document.getElementById("dropdwnCiudades");

  paises.addEventListener("change", mostrarCiudades);
  ciudades.addEventListener("change", mostrarInfoCiudades)
}