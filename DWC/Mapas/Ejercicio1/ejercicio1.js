const registroPacientes = new Map([
    [`AAA024`, `Fernández M. (321790059) -> C/Recoletos, 50`],  
    [`BCD827`, `Ruíz P. (100973253) -> C/Esquerdo izquierdo, 103`],
    [`YUN835`,`Benítez E. (154811767) -> Av.Argentina, 5`]
]);

registroPacientes.forEach(function(valor, clave){
    let numeroRegistro = clave; //obtenemos el numero del registro
    let direccion = valor.split(") -> ")[1]; //Si no ponemos la posicion 0 del array nos devuelve un array del valor sin la flecha.
    let nombreCompleto = valor.split(") -> ")[0].split(" (")[0];
    let nombreSS = valor.split(") -> ")[0].split(" (")[1];

    console.log(clave);
    console.log(valor);
    console.log("--------------");
    console.log(direccion)
    console.log("*************************************");

    let valorCompleto = `numeroRegistro: ${numeroRegistro}`

    let mapaNuevo = new Map();
    mapaNuevo.set("Paciente ${i}", valorCompleto)


    }
);

/*const pacientes = new Map([]);

let i=0;

for (var [key, value] of registroPacientes) {
    pacientes.set("Paciente "+i, key + ""+ value)
    
    console.log(value.split(" "))
    i++;
}

console.log(pacientes);*/


