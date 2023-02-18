<?php
header("access-control-allow-origin: *");
header("Content-type:aplication/json");
ini_set('display_errors', 1);
ini_set('html_errors', 1);
$q = $_REQUEST["q"];

//Acesso a BBDD
$conexion = mysqli_connect('127.0.0.1','root','12345678');

if (mysqli_connect_errno())
{
        echo "Error al conectar a MySQL: ". mysqli_connect_error();
}

mysqli_select_db($conexion, 'world');

//Consulta SQL
$consulta = mysqli_prepare($conexion, "SELECT Name FROM city");
$consulta->execute();
$result = $consulta->get_result();

//Array para almacenar la consulta
$ciudades =  array();

//Bucle para añadir las ciudades de la BBDD al array $ciudades
while ($myrow = $result->fetch_assoc()){
	array_push($ciudades,$myrow);
}

$hint = "";
//Si tiene valor la request
if ($q !== "") {
  $q = strtolower($q);
  $len=strlen($q);
  //Bucle para filtrar la letra escrita por el usuario
  foreach($ciudades as $name) {
    if (stristr($q, substr($name["Name"], 0, $len))) {
      if ($hint === "") {
        $hint = $name["Name"];
      } else {
        $hint .= ", ".$name["Name"];
      }
    }
  }
}
echo $hint === "" ? "sin resultados" : $hint;
?>