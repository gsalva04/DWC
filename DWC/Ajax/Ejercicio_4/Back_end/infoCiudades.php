<?php
ini_set('display_errors', 1);
ini_set('html_errors', 1);
header("access-control-allow-origin: *");
header("Content-type:aplication/json");

//Variable que recoje la petición del usuario
$q = $_GET['q'];

//Conexión a la BBDD
$conexion = mysqli_connect('127.0.0.1', 'root', '12345678');

if (mysqli_connect_errno())
{
        echo "Error al conectar a MySQL: ". mysqli_connect_error();
}

mysqli_select_db($conexion, 'world');

//Consulta a la BBDD
$consulta = mysqli_prepare($conexion, 'SELECT city.Name, city.district, city.population FROM city 
INNER JOIN country ON countryCode=country.Code WHERE city.Name = "' . $q . '" AND city.CountryCode LIKE country.Code;');

$consulta->execute();
$result = $consulta->get_result();

//Array que contiene la consulta a la BBDD
$infoCiudades = array();
while ($myrow = $result->fetch_assoc()) {
  array_push($infoCiudades, $myrow);
}

echo json_encode($infoCiudades);

?>