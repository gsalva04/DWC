<?php
header("access-control-allow-origin: *");
header("Content-type:aplication/json");
ini_set('display_errors', 1);
ini_set('html_errors', 1);
$q = $_REQUEST["q"];

//Acesso a BBDD
$conexion = mysqli_connect('127.0.0.1', 'root', '12345678');

if (mysqli_connect_errno())
{
        echo "Error al conectar a MySQL: ". mysqli_connect_error();
}
mysqli_select_db($conexion, 'world');

//Consulta SQL
$consulta = mysqli_prepare($conexion, "SELECT Name FROM country where Name like '".$q."%' ");
$consulta->execute();
$result = $consulta->get_result();

//Array para almacenar la consulta
$arrayPaises = array();
//Bucle para añadir los paises de la BBDD al array $arrayPaises
while ($myrow = $result->fetch_assoc()) {
    array_push($arrayPaises, $myrow);
}

$paises = "";
foreach($arrayPaises as $pais){
    if($paises == ""){
        $paises .= $pais['Name'];
    }else{
        $paises .= ", ".$pais['Name'];
    }
}

echo $paises === "" ? "sin resultados" : $paises;