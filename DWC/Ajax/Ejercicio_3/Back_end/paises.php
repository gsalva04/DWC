<?php
ini_set('display_errors', 1);
ini_set('html_errors', 1);
header("access-control-allow-origin: *");
header("Content-type:aplication/json");

//Conexion a la BBDD
$conexion = mysqli_connect('127.0.0.1', 'root', '12345678');

if (mysqli_connect_errno())
{
        echo "Error al conectar a MySQL: ". mysqli_connect_error();
}

mysqli_select_db($conexion, 'world');

//Consulta BBDD
$consulta = mysqli_prepare($conexion, 'SELECT Name FROM country;');
$consulta->execute();
$result = $consulta->get_result();

//Array que contiene la consulta a la BBDD
$arrayPaises = array();
while ($myrow = $result->fetch_assoc()) {
  array_push($arrayPaises, $myrow);
}

$paises="";
foreach($arrayPaises as $pais){
  if ($paises === "") {
    $paises = $pais['Name'];
  } else {
    $paises .= ", " . $pais['Name'];
  }
}
echo $paises;
?>