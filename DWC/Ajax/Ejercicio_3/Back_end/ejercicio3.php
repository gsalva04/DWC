<?php
header("access-control-allow-origin: *");
header("Content-type:aplication/json");
ini_set('display_errors', 1);
ini_set('html_errors', 1);
$q = $_REQUEST["q"];

$conexion = mysqli_connect('127.0.0.1','root','12345678');

if (mysqli_connect_errno())
{
        echo "Error al conectar a MySQL: ". mysqli_connect_error();
}

mysqli_select_db($conexion, 'world');
$consulta = mysqli_prepare($conexion, "SELECT Name FROM country");
$consulta->execute();
$result = $consulta->get_result();

$ciudades =  array();

while ($myrow = $result->fetch_assoc()){
	array_push($ciudades,$myrow);
}

?>