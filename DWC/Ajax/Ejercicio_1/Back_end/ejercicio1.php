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
$consulta = mysqli_prepare($conexion, "SELECT Name FROM city");
$consulta->execute();
$result = $consulta->get_result();

$ciudades =  array();

while ($myrow = $result->fetch_assoc()){
	array_push($ciudades,$myrow);
}

$hint = "";
if ($q !== "") {
  $q = strtolower($q);
  $len=strlen($q);

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