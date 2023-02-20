<?php
ini_set('display_errors', 1);
ini_set('html_errors', 1);
header("access-control-allow-origin: *");
header("Content-type:aplication/json");

$q = $_GET['q'];

//Conexion BBDD
$conexion = mysqli_connect('127.0.0.1', 'root', '12345678');

if (mysqli_connect_errno()) {
  echo "Error al conectar a MySQL: " . mysqli_connect_error();
}

mysqli_select_db($conexion, 'world');

//Consulta BBDD
$consulta = mysqli_prepare($conexion, 'SELECT city.Name, city.countryCode FROM city 
INNER JOIN country ON countryCode=country.Code WHERE country.Name = "' . $q . '";');

$consulta->execute();
$result = $consulta->get_result();

//Array que contiene la consulta a la BBDD
$arrayPaisesCiudades = array();
while ($myrow = $result->fetch_assoc()) {
  array_push($arrayPaisesCiudades, $myrow);
}

$ciudades = "";
foreach ($arrayPaisesCiudades as $ciudad) {
  if ($ciudades === "") {
    $ciudades = $ciudad['Name'];
  } else {
    $ciudades .= ", " . $ciudad['Name'];
  }
}
echo $ciudades;
?>