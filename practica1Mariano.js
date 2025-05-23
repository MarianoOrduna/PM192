let nombre = "Mariano";
const edad = 21;

nombre = "Cinthia Lizeth";

const saludo = "Hola" + nombre + ". Tienes " + edad + " años.";
console.log(saludo);

const cuadrado = (numero) => numero * numero;
console.log(cuadrado(2));

const saludoPersonalizado = (nombre, edad) => 'Hola, me llamo ${nombre} y tengo ${edad} años.';
console.log(saludoPersonalizado("Mariano", 21));