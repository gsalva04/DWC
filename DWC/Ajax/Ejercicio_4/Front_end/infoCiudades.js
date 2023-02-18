//Metodo que obtiene los Paises de la BBDD gracias al back
function mostrarPaises() {

  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let select = document.getElementById("dropdwnPaises");
      let paises =JSON.parse(this.responseText);
      //console.log(paises);
      let opcionDefecto = document.createElement("option");
      opcionDefecto.value="-";
      opcionDefecto.innerHTML="-";
      select.appendChild(opcionDefecto);

      for (let i = 0; i < paises.length; i++) {
        //console.log(paises[i]['Name']);
        let option = document.createElement("option");
        option.value = paises[i]['Name'];
        option.innerHTML = paises[i]['Name'];
        select.appendChild(option);
      }
    }
  };
  xmlhttp.open("GET", "../Back_end/paises.php", true);
  xmlhttp.send();
}

//Metodo que obtiene las Ciudades filtrando por Pais de la BBDD gracias al back
function mostrarCiudades(pais) {
  pais = this.value;
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      
      let select = document.getElementById("dropdwnCiudades");
      select.innerHTML = null;//NULL
      //console.log(this.responseText);
      let ciudades = JSON.parse(this.responseText);
      //console.log(ciudades);
      let opcionDefecto = document.createElement("option");
      opcionDefecto.value="-";
      opcionDefecto.innerHTML="-";
      select.appendChild(opcionDefecto);

      for (let i = 0; i < ciudades.length; i++) {
        //console.log(ciudades[i]);
        let option = document.createElement("option");
        option.value = ciudades[i]['Name'];
        option.innerHTML = ciudades[i]['Name'];
        select.append(option);
      }
    }
  };
  xmlhttp.open("GET", "../Back_end/paisesCiudades.php?q=" + pais, true);
  xmlhttp.send();
}

//Metodo que obtiene la información de las ciudades filtrando por Ciudad y Pais en BBDD gracias al back
function mostrarInfoCiudades(ciudad) {
  ciudad = this.value;
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      let div = document.getElementById("tablaInfoCiudades");
      div.innerHTML = null;

      let infoCiudades = JSON.parse(this.responseText);

      let ciudad = document.createElement("h3");
      let distrito = document.createElement("p");
      let poblacion = document.createElement("p");

      ciudad.innerHTML = infoCiudades[0]['Name'];
      distrito.innerHTML = "Distrito: " + infoCiudades[0]['district'];
      poblacion.innerHTML = "Población: " + infoCiudades[0]['population'];

      div.appendChild(ciudad);
      div.appendChild(distrito);
      div.appendChild(poblacion);
    }
  };
  xmlhttp.open("GET", "../Back_end/infoCiudades.php?q=" + ciudad, true);
  xmlhttp.send();
}

window.onload = function () {
  mostrarPaises();
  
  let paises = document.getElementById("dropdwnPaises");
  let ciudades = document.getElementById("dropdwnCiudades");

  paises.addEventListener("change", mostrarCiudades);
  ciudades.addEventListener("change", mostrarInfoCiudades)
}